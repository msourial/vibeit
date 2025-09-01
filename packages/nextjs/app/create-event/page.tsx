"use client";

import { NextPage } from "next";
import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { parseEther } from "viem";
import Link from "next/link";

const CreateEventPage: NextPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync: createEvent } = useScaffoldWriteContract({
    contractName: "EventManager",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      alert("Please enter an event name");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }
    if (!date) {
      alert("Please select a date");
      return;
    }
    if (!address.trim()) {
      alert("Please enter an event address");
      return;
    }
    if (!ticketPrice || parseFloat(ticketPrice) <= 0) {
      alert("Please enter a valid ticket price");
      return;
    }
    if (!totalTickets || parseInt(totalTickets) <= 0) {
      alert("Please enter a valid number of tickets");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Creating event with args:", {
        name: name.trim(),
        description: description.trim(),
        date: BigInt(Math.floor(new Date(date).getTime() / 1000)),
        ticketPrice: parseEther(ticketPrice),
        totalTickets: BigInt(totalTickets),
      });

      const result = await createEvent({
        functionName: "createEvent",
        args: [
          name.trim(),
          description.trim(),
          BigInt(Math.floor(new Date(date).getTime() / 1000)),
          parseEther(ticketPrice),
          BigInt(totalTickets),
        ],
      });

      console.log("Event creation result:", result);
      
      // Reset form on success
      setName("");
      setDescription("");
      setDate("");
      setAddress("");
      setTicketPrice("");
      setTotalTickets("");
      
      alert("Event created successfully!");
    } catch (error: any) {
      console.error("Error creating event:", error);
      
      // Better error handling
      let errorMessage = "Failed to create event. Please try again.";
      
      if (error?.message) {
        if (error.message.includes("User rejected")) {
          errorMessage = "Transaction was rejected by user.";
        } else if (error.message.includes("insufficient funds")) {
          errorMessage = "Insufficient funds to create event.";
        } else if (error.message.includes("network")) {
          errorMessage = "Network error. Please check your connection.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            ← Back to Events
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create New Event</h1>
          <p className="text-lg text-gray-600">Share your event with the world and sell NFT tickets</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Event Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900"
                placeholder="Enter your event name"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-gray-900"
                placeholder="Describe your event..."
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Event Date & Time *
              </label>
              <input
                type="datetime-local"
                id="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Event Address *
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900"
                placeholder="123 Main St, City, State"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Price (XDC) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="ticketPrice"
                    value={ticketPrice}
                    onChange={e => setTicketPrice(e.target.value)}
                    step="0.001"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900"
                    placeholder="0.00"
                    required
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">XDC</span>
                </div>
              </div>

              <div>
                <label htmlFor="totalTickets" className="block text-sm font-medium text-gray-700 mb-2">
                  Total Tickets *
                </label>
                <input
                  type="number"
                  id="totalTickets"
                  value={totalTickets}
                  onChange={e => setTotalTickets(e.target.value)}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900"
                  placeholder="100"
                  required
                />
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Event..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
