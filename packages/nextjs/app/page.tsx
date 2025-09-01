"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Leaflet types
declare global {
  interface Window {
    L: any;
  }
}

const Home: NextPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const { data: nextEventId } = useScaffoldReadContract({
    contractName: "EventManager",
    functionName: "nextEventId",
  });

  const eventIds = [];
  for (let i = 0; i < Number(nextEventId || 0); i++) {
    eventIds.push(i);
  }

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoadingLocation(false);
      },
      () => {
        setLocationError("Unable to get your location. Please try searching manually.");
        setIsLoadingLocation(false);
      },
    );
  };

  const searchNearbyEvents = async () => {
    if (!searchLocation.trim()) return;

    // Trigger a re-render by updating a state that affects the map
    setLocationError(""); // Clear any errors
    console.log("Searching for events near:", searchLocation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">VibeIt</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Discover amazing events and collect unique NFT tickets on the XDC blockchain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create-event"
                className="inline-flex items-center px-8 py-3 text-base font-medium text-purple-600 bg-white rounded-lg hover:bg-gray-50 transition-all shadow-lg"
              >
                Create Event
              </Link>
              <Link
                href="/my-tickets"
                className="inline-flex items-center px-8 py-3 text-base font-medium text-white bg-purple-700 rounded-lg hover:bg-purple-800 transition-all border border-purple-500"
              >
                My Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Map Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Discover Events on the Map</h2>
              <p className="text-gray-600">Find events happening around the world</p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by city, state, or country..."
                  value={searchLocation}
                  onChange={e => setSearchLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-all"
                  onKeyPress={e => e.key === "Enter" && searchNearbyEvents()}
                />
                <button
                  onClick={searchNearbyEvents}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Quick Location Actions */}
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <button
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all disabled:opacity-50"
              >
                {isLoadingLocation ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                    Getting location...
                  </>
                ) : (
                  <>📍 Use My Location</>
                )}
              </button>

              {userLocation && (
                <span className="inline-flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-xl">
                  ✓ Location found
                </span>
              )}

              {/* Quick City Buttons */}
              <button
                onClick={() => {
                  setSearchLocation("New York, NY");
                  setTimeout(() => searchNearbyEvents(), 100);
                }}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                New York
              </button>
              <button
                onClick={() => {
                  setSearchLocation("Los Angeles, CA");
                  setTimeout(() => searchNearbyEvents(), 100);
                }}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                Los Angeles
              </button>
              <button
                onClick={() => {
                  setSearchLocation("Chicago, IL");
                  setTimeout(() => searchNearbyEvents(), 100);
                }}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                Chicago
              </button>
            </div>

            {locationError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl max-w-2xl mx-auto">
                <p className="text-sm text-red-600 text-center">{locationError}</p>
              </div>
            )}
          </div>

          {/* Interactive Map */}
          <div className="relative">
            <InteractiveMap
              events={eventIds}
              searchLocation={searchLocation}
              userLocation={userLocation}
              selectedEvent={selectedEvent}
              onEventSelect={setSelectedEvent}
            />
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {userLocation || searchLocation ? "Events Near You" : "Upcoming Events"}
          </h2>
          <p className="text-lg text-gray-600">Find your next adventure</p>
        </div>

        {eventIds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventIds.map(i => (
              <EventCard key={i} eventId={i} userLocation={userLocation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-600 mb-6">Be the first to create an amazing event!</p>
            <Link
              href="/create-event"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Create First Event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const EventCard = ({
  eventId,
  userLocation,
}: {
  eventId: number;
  userLocation?: { lat: number; lng: number } | null;
}) => {
  const { data: event } = useScaffoldReadContract({
    contractName: "EventManager",
    functionName: "events",
    args: [BigInt(eventId)],
  });

  if (!event) return null;

  const [name, description, date, ticketPrice, maxTickets, ticketsSold] = event;

  // Mock location data for events (in a real app, this would be stored in the contract or database)
  const mockEventLocations = [
    { lat: 40.7128, lng: -74.006, address: "New York, NY" },
    { lat: 34.0522, lng: -118.2437, address: "Los Angeles, CA" },
    { lat: 41.8781, lng: -87.6298, address: "Chicago, IL" },
    { lat: 29.7604, lng: -95.3698, address: "Houston, TX" },
    { lat: 39.9526, lng: -75.1652, address: "Philadelphia, PA" },
  ];

  const eventLocation = mockEventLocations[eventId % mockEventLocations.length];

  // Calculate distance if user location is available
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const distance = userLocation
    ? calculateDistance(userLocation.lat, userLocation.lng, eventLocation.lat, eventLocation.lng)
    : null;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative bg-gradient-to-br from-purple-400 to-blue-500 h-48">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-sm opacity-90">{new Date(Number(date) * 1000).toLocaleDateString()}</p>
        </div>
        {distance && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-purple-600 text-xs font-medium">{distance.toFixed(1)} mi</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>📍 {eventLocation.address}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">{Number(ticketPrice) / 1e18} XDC</span>
          <span className="text-sm text-gray-500">
            {Math.min(Number(ticketsSold), 100000)}/{Math.min(Number(maxTickets), 100000)} sold
          </span>
        </div>

        <Link
          href={`/event/${eventId}`}
          className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          View Event
        </Link>
      </div>
    </div>
  );
};

const InteractiveMap = ({
  events,
  searchLocation,
  onEventSelect,
  selectedEvent,
  userLocation,
}: {
  events: number[];
  searchLocation: string;
  onEventSelect: (eventId: number | null) => void;
  selectedEvent: number | null;
  userLocation?: { lat: number; lng: number } | null;
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 }); // Default to NYC

  // Event locations are now defined in LeafletMap component to avoid duplication

  // Update map center when search location or user location changes
  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    } else if (searchLocation) {
      // In a real app, you'd geocode the search location
      // For now, we'll just center on NYC
      const cityMap: { [key: string]: { lat: number; lng: number } } = {
        "New York, NY": { lat: 40.7128, lng: -74.006 },
        "Los Angeles, CA": { lat: 34.0522, lng: -118.2437 },
        "Chicago, IL": { lat: 41.8781, lng: -87.6298 },
        "Houston, TX": { lat: 29.7604, lng: -95.3698 },
        "Philadelphia, PA": { lat: 39.9526, lng: -75.1652 },
      };

      const foundCity = Object.keys(cityMap).find(city =>
        searchLocation.toLowerCase().includes(city.toLowerCase().split(",")[0]),
      );

      if (foundCity) {
        setMapCenter(cityMap[foundCity]);
      }
    }
  }, [userLocation, searchLocation]);

  return (
    <div className="relative h-96 bg-white border border-gray-200 overflow-hidden">
      <LeafletMap
        center={mapCenter}
        events={events}
        userLocation={userLocation}
        selectedEvent={selectedEvent}
        onEventSelect={onEventSelect}
      />

      {/* Event Popup */}
      {selectedEvent !== null && <EventPopup eventId={selectedEvent} onClose={() => onEventSelect(null)} />}
    </div>
  );
};

// Removed unused EventPin component

const EventPopup = ({ eventId, onClose }: { eventId: number; onClose: () => void }) => {
  const { data: event } = useScaffoldReadContract({
    contractName: "EventManager",
    functionName: "events",
    args: [BigInt(eventId)],
  });

  // Use the same event locations from InteractiveMap component
  const eventLocationsForPopup = [
    {
      lat: 40.7128,
      lng: -74.006,
      address: "New York, NY",
      name: "XDC Vibe Coding - Free Bootcamp - Live Kick-off & AMA",
      description:
        "Join us for an exciting developer bootcamp featuring XDC blockchain development, live coding sessions, and exclusive AMA with industry experts.",
      date: "2025-01-15",
      price: "0.0",
    },
    { lat: 34.0522, lng: -118.2437, address: "Los Angeles, CA" },
    { lat: 41.8781, lng: -87.6298, address: "Chicago, IL" },
    { lat: 29.7604, lng: -95.3698, address: "Houston, TX" },
    { lat: 39.9526, lng: -75.1652, address: "Philadelphia, PA" },
  ];
  const location = eventLocationsForPopup[eventId % eventLocationsForPopup.length];

  // Use mock data for first event (NYC XDC event), contract data for others
  const displayName = eventId === 0 && location.name ? location.name : event ? event[0] : "Loading...";
  const displayDescription =
    eventId === 0 && location.description ? location.description : event ? event[1] : "Loading...";
  const displayDate =
    eventId === 0 && location.date
      ? location.date
      : event
        ? new Date(Number(event[2]) * 1000).toLocaleDateString()
        : "";
  const displayPrice =
    eventId === 0 && location.price ? location.price : event ? (Number(event[3]) / 1e18).toString() : "0";

  if (!event && eventId !== 0) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 pr-4">{displayName}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
            ×
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <span>📍 {location.address}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <span>📅 {displayDate}</span>
          </div>

          <p className="text-gray-700 text-sm line-clamp-2">{displayDescription}</p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-purple-600">{displayPrice} XDC</span>
            <span className="text-sm text-gray-500">
              {event
                ? `${Math.min(Number(event[5]), 100000)}/${Math.min(Number(event[4]), 100000)} sold`
                : "Free Event"}
            </span>
          </div>

          <Link
            href={`/event/${eventId}`}
            className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium"
          >
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
};

const LeafletMap = ({
  center,
  events,
  userLocation,
  selectedEvent,
  onEventSelect,
}: {
  center: { lat: number; lng: number };
  events: number[];
  userLocation?: { lat: number; lng: number } | null;
  selectedEvent: number | null;
  onEventSelect: (eventId: number | null) => void;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const eventLocations = [
    {
      lat: 40.7128,
      lng: -74.006,
      address: "New York, NY",
      name: "XDC Vibe Coding - Free Bootcamp - Live Kick-off & AMA",
      description:
        "Join us for an exciting developer bootcamp featuring XDC blockchain development, live coding sessions, and exclusive AMA with industry experts.",
      date: "2025-01-15",
      price: "0.0",
    },
    { lat: 34.0522, lng: -118.2437, address: "Los Angeles, CA" },
    { lat: 41.8781, lng: -87.6298, address: "Chicago, IL" },
    { lat: 29.7604, lng: -95.3698, address: "Houston, TX" },
    { lat: 39.9526, lng: -75.1652, address: "Philadelphia, PA" },
  ];

  useEffect(() => {
    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      if (typeof window !== "undefined" && !window.L) {
        // Load Leaflet CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        // Load Leaflet JS
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else if (window.L && mapRef.current && !mapInstanceRef.current) {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Initialize map
      const map = window.L.map(mapRef.current).setView([center.lat, center.lng], 10);

      // Add OpenStreetMap tiles
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      mapInstanceRef.current = map;
      addEventMarkers();
    };

    const addEventMarkers = () => {
      if (!mapInstanceRef.current) return;

      // Clear existing markers
      markersRef.current.forEach(marker => {
        mapInstanceRef.current.removeLayer(marker);
      });
      markersRef.current = [];

      // Add event markers
      events.forEach(eventId => {
        const location = eventLocations[eventId % eventLocations.length];

        const customIcon = window.L.divIcon({
          html: `<div style="
            width: 32px; 
            height: 32px; 
            background: linear-gradient(45deg, #8b5cf6, #3b82f6); 
            border-radius: 50%; 
            border: 3px solid white; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-weight: bold; 
            font-size: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          ">${eventId + 1}</div>`,
          className: "custom-div-icon",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const popupContent =
          eventId === 0
            ? `<div style="max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">XDC Vibe Coding - Free Bootcamp</h3>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">📍 New York, NY</p>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">📅 January 15, 2025</p>
            <p style="margin: 0 0 12px 0; font-size: 13px; color: #374151;">Join us for an exciting developer bootcamp featuring XDC blockchain development, live coding sessions, and exclusive AMA with industry experts.</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-weight: bold; color: #8b5cf6;">FREE</span>
              <span style="font-size: 12px; color: #6b7280;">Limited Seats</span>
            </div>
            <a href="/event/${eventId}" style="display: block; text-align: center; background: linear-gradient(45deg, #8b5cf6, #3b82f6); color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;">View Event</a>
          </div>`
            : `<div style="max-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">Event #${eventId + 1}</h3>
            <p style="margin: 0 0 8px 0; font-size: 12px;">📍 ${location.address}</p>
            <a href="/event/${eventId}" style="display: block; text-align: center; background: linear-gradient(45deg, #8b5cf6, #3b82f6); color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 12px;">View Event</a>
          </div>`;

        const marker = window.L.marker([location.lat, location.lng], { icon: customIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(popupContent)
          .on("click", () => {
            onEventSelect(selectedEvent === eventId ? null : eventId);
          });

        markersRef.current.push(marker);
      });

      // Add user location marker if available
      if (userLocation) {
        const userIcon = window.L.divIcon({
          html: `<div style="
            width: 16px; 
            height: 16px; 
            background: #3b82f6; 
            border-radius: 50%; 
            border: 2px solid white; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            animation: pulse 2s infinite;
          "></div>`,
          className: "user-location-icon",
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const userMarker = window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(
          mapInstanceRef.current,
        );

        markersRef.current.push(userMarker);
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map center when center prop changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([center.lat, center.lng], 10);
    }
  }, [center]);

  // Update markers when events change
  useEffect(() => {
    if (mapInstanceRef.current) {
      const addEventMarkers = () => {
        // Clear existing markers
        markersRef.current.forEach(marker => {
          mapInstanceRef.current.removeLayer(marker);
        });
        markersRef.current = [];

        // Add event markers
        events.forEach(eventId => {
          const location = eventLocations[eventId % eventLocations.length];

          const customIcon = window.L.divIcon({
            html: `<div style="
              width: 32px; 
              height: 32px; 
              background: linear-gradient(45deg, #8b5cf6, #3b82f6); 
              border-radius: 50%; 
              border: 3px solid white; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: white; 
              font-weight: bold; 
              font-size: 12px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              ${selectedEvent === eventId ? "transform: scale(1.2); z-index: 1000;" : ""}
            ">${eventId + 1}</div>`,
            className: "custom-div-icon",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          // Add popup content for NYC XDC event
          const popupContent =
            eventId === 0
              ? `<div style="max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">XDC Vibe Coding - Free Bootcamp</h3>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">📍 New York, NY</p>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">📅 January 15, 2025</p>
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #374151;">Join us for an exciting developer bootcamp featuring XDC blockchain development, live coding sessions, and exclusive AMA with industry experts.</p>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-weight: bold; color: #8b5cf6;">FREE</span>
                <span style="font-size: 12px; color: #6b7280;">Limited Seats</span>
              </div>
              <a href="/event/${eventId}" style="display: block; text-align: center; background: linear-gradient(45deg, #8b5cf6, #3b82f6); color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;">View Event</a>
            </div>`
              : `<div style="max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold;">Event #${eventId + 1}</h3>
              <p style="margin: 0 0 8px 0; font-size: 12px;">📍 ${location.address}</p>
              <a href="/event/${eventId}" style="display: block; text-align: center; background: linear-gradient(45deg, #8b5cf6, #3b82f6); color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 12px;">View Event</a>
            </div>`;

          const marker = window.L.marker([location.lat, location.lng], { icon: customIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(popupContent)
            .on("click", () => {
              onEventSelect(selectedEvent === eventId ? null : eventId);
            });

          markersRef.current.push(marker);
        });

        // Add user location marker if available
        if (userLocation) {
          const userIcon = window.L.divIcon({
            html: `<div style="
              width: 16px; 
              height: 16px; 
              background: #3b82f6; 
              border-radius: 50%; 
              border: 2px solid white; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            "></div>
            <style>
              @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
                100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
              }
            </style>`,
            className: "user-location-icon",
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });

          const userMarker = window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(
            mapInstanceRef.current,
          );

          markersRef.current.push(userMarker);
        }
      };

      addEventMarkers();
    }
  }, [events, selectedEvent, userLocation, onEventSelect]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg z-[1000]">
        <div className="text-sm font-medium text-gray-900 mb-2">Legend</div>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          <span>Events</span>
        </div>
        {userLocation && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Your Location</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
