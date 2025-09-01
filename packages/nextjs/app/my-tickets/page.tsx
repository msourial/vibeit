"use client";

import { useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const MyTicketsPage: NextPage = () => {
  const { address } = useAccount();
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const { data: balance } = useScaffoldReadContract({
    contractName: "VibeTicket",
    functionName: "balanceOf",
    args: [address],
  });

  const ticketIds = [];
  for (let i = 0; i < Number(balance || 0); i++) {
    ticketIds.push(i);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            ← Back to Events
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My NFT Tickets</h1>
            <p className="text-lg text-gray-600">Your collection of event tickets as NFTs</p>
          </div>
        </div>

        {/* Tickets Grid */}
        {ticketIds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ticketIds.map((ticket, index) => (
              <TicketCard key={index} index={index} onClick={() => setSelectedTicket(index)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets yet</h3>
            <p className="text-gray-600 mb-6">Purchase event tickets to see your NFT collection here!</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Browse Events
            </Link>
          </div>
        )}
      </div>

      {/* NFT Detail Modal */}
      {selectedTicket !== null && (
        <NFTDetailModal tokenId={selectedTicket} ownerAddress={address} onClose={() => setSelectedTicket(null)} />
      )}
    </div>
  );
};

const generatePixelAvatar = (tokenId: number, eventName: string = "Vibe Event") => {
  // Generate deterministic colors based on tokenId and event name
  const seed = tokenId + eventName.length;
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",
  ];

  const primaryColor = colors[seed % colors.length];
  const secondaryColor = colors[(seed + 3) % colors.length];

  // Create pixel art pattern based on tokenId
  const pattern = [];
  for (let i = 0; i < 64; i++) {
    pattern.push((seed + i) % 3);
  }

  return (
    <svg width="120" height="120" viewBox="0 0 8 8" className="pixelated">
      <defs>
        <style>{`.pixelated { image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges; }`}</style>
      </defs>
      {pattern.map((value, index) => {
        const x = index % 8;
        const y = Math.floor(index / 8);
        const color = value === 0 ? "transparent" : value === 1 ? primaryColor : secondaryColor;
        return <rect key={index} x={x} y={y} width="1" height="1" fill={color} />;
      })}
    </svg>
  );
};

const TicketCard = ({ index, onClick }: { index: number; onClick: () => void }) => {
  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {/* NFT Avatar */}
      <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 h-48 flex items-center justify-center">
        {generatePixelAvatar(index, "Vibe Event")}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-purple-600 text-xs font-medium">#{index + 1}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Vibe Ticket #{index + 1}</h3>
        <p className="text-sm text-gray-600 mb-3">Unique NFT Event Ticket</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">XDC Network</span>
          <span className="text-xs text-gray-500">Click for details</span>
        </div>
      </div>
    </div>
  );
};

const NFTDetailModal = ({
  tokenId,
  ownerAddress,
  onClose,
}: {
  tokenId: number;
  ownerAddress?: string;
  onClose: () => void;
}) => {
  // Mock data - in a real app, you'd fetch this from the blockchain
  const mockTransactionHash = `0x${tokenId.toString(16).padStart(64, "0")}abc123def456`;
  const contractAddress = "0x8e87ef2d07Aeac605050B972BFbFb8F5682c7351";
  const mintDate = new Date(Date.now() - tokenId * 86400000); // Mock different mint dates

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">NFT Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
              ×
            </button>
          </div>
        </div>

        {/* NFT Image */}
        <div className="p-6 text-center border-b border-gray-200">
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-8 mb-4">
            {generatePixelAvatar(tokenId, "Vibe Event")}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Vibe Ticket #{tokenId + 1}</h3>
          <p className="text-gray-600">Unique NFT Event Ticket</p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Token ID</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded font-mono">{tokenId + 1}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contract Address</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded font-mono break-all">{contractAddress}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Address</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded font-mono break-all">
              {ownerAddress || "Not connected"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Hash</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded font-mono break-all">{mockTransactionHash}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mint Date</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{mintDate.toLocaleString()}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">Vibe Event #{tokenId + 1}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Network</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">XDC Apothem Testnet</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTicketsPage;
