"use client";

import { use, useState } from "react";
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
    setIsLoading(true);
    try {
      await buyTicket({
        functionName: "buyTicket",
        args: [BigInt(id)],
        value: ticketPrice, // ticket price
      });
      alert("Ticket purchased successfully! NFT minted to your wallet.");
    } catch (error) {
      console.error("Error buying ticket:", error);
      alert("Failed to purchase ticket. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock event data for demo purposes since no events exist yet
  const mockEvent = [
    BigInt(Number(id)), // event ID
    `Demo Event ${id}`, // name
    "This is a demo event for the VibeIt platform. Experience blockchain-powered event ticketing with NFT tickets!", // description
    BigInt(Math.floor(Date.now() / 1000) + 86400), // date (tomorrow)
    BigInt("100000000000000000"), // price (0.1 XDC)
    BigInt(100), // total tickets
    BigInt(Math.floor(Math.random() * 30)), // sold tickets (random)
    "0x0000000000000000000000000000000000000000", // organizer
  ] as const;

  // Use mock data if no real event exists
  const displayEvent = event && event[1] ? event : mockEvent;

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
          {/* Event Image Placeholder */}
          <div className="h-64 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
            <div className="text-6xl">🎉</div>
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
