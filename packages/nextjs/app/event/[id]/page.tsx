"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatEther } from "viem";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function EventPage({ params }: Props) {
  const { id } = use(params);

  // Get actual contract data
  const { data: event } = useScaffoldReadContract({
    contractName: "EventManager",
    functionName: "events",
    args: [BigInt(id)],
  });

  const { writeContractAsync: buyTicket } = useScaffoldWriteContract({
    contractName: "EventManager",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleBuyTicket = async () => {
    if (!event) return;

    setIsLoading(true);
    try {
      await buyTicket({
        functionName: "buyTicket",
        args: [BigInt(id)],
        value: ticketPrice, // Use ticketPrice from destructured displayEvent
      });
      alert("Ticket purchased successfully! NFT minted to your wallet.");
    } catch (error) {
      console.error("Error buying ticket:", error);
      alert("Failed to purchase ticket. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock event data with updated names and descriptions to match homepage
  const mockEventData = [
    {
      name: "Tech Innovation Conference 2025",
      description:
        "Join industry leaders discussing AI, blockchain, and the future of technology in this premier conference.",
      date: "2025-01-10",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop&auto=format",
    },
    {
      name: "Summer Music Festival",
      description: "Three days of incredible live music featuring top artists across multiple genres and stages.",
      date: "2025-01-15",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop&auto=format",
    },
    {
      name: "Web Development Workshop",
      description: "Hands-on workshop covering modern web development with React, Node.js, and cloud deployment.",
      date: "2025-01-18",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop&auto=format",
    },
    {
      name: "Startup Networking Meetup",
      description: "Connect with entrepreneurs, investors, and innovators in Houston's thriving startup ecosystem.",
      date: "2025-01-22",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop&auto=format",
    },
    {
      name: "Jazz & Blues Concert",
      description:
        "An intimate evening of smooth jazz and soulful blues featuring renowned local and international artists.",
      date: "2025-01-25",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop&auto=format",
    },
    {
      name: "Digital Marketing Workshop",
      description: "Learn cutting-edge digital marketing strategies, SEO techniques, and social media best practices.",
      date: "2025-01-30",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop&auto=format",
    },
  ];

  const eventMockData = mockEventData[Number(id) % mockEventData.length];

  // Use contract data if available, otherwise fallback to mock data
  const displayEvent =
    event ||
    ([
      BigInt(Number(id)), // event ID
      eventMockData.name, // name
      eventMockData.description, // description
      BigInt(new Date(eventMockData.date).getTime() / 1000), // date
      BigInt("100000000000000000"), // price (0.1 XDC)
      BigInt(100), // total tickets
      BigInt(25 + Number(id) * 5), // sold tickets (varies by ID)
      "0x0000000000000000000000000000000000000000", // organizer
    ] as const);

  const [, name, description, date, ticketPrice, totalTickets, soldTickets] = displayEvent;
  const ticketsRemaining = Number(totalTickets) - Number(soldTickets);
  const isSoldOut = soldTickets >= totalTickets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            ← Back to Events
          </Link>
        </div>

        {/* Event Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Event Image */}
          <div className="h-64 overflow-hidden relative">
            <Image src={eventMockData.image} alt={eventMockData.name} fill style={{ objectFit: "cover" }} />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Details */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{description}</p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">
                    Tickets: {Number(soldTickets)}/{Number(totalTickets)}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <span className="text-2xl mr-3">📅</span>
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-gray-600">{new Date(Number(date) * 1000).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <span className="text-2xl mr-3">🎫</span>
                    <div>
                      <p className="font-medium">Tickets Available</p>
                      <p className="text-gray-600">
                        {ticketsRemaining} of {Number(totalTickets)} remaining
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Card */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-2">Ticket Price</p>
                    <p className="text-3xl font-bold text-purple-600">{formatEther(ticketPrice)} XDC</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Sold</span>
                      <span>
                        {Number(soldTickets)} / {Number(totalTickets)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(Number(soldTickets) / Number(totalTickets)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={handleBuyTicket}
                    disabled={isSoldOut || isLoading}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                      isSoldOut
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isLoading ? "Processing..." : isSoldOut ? "Sold Out" : "Buy Ticket"}
                  </button>

                  {!isSoldOut && (
                    <p className="text-xs text-gray-500 text-center mt-3">
                      🎨 Each ticket is a unique NFT minted to your wallet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
