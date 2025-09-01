# 🎫 VibeIt - NFT Event Ticketing Platform

<div align="center">
  <h3>🌟 Decentralized Event Ticketing on XDC Network 🌟</h3>
  <p>Create events, sell NFT tickets, and explore events on an interactive map</p>
</div>

---

## 🚀 Overview

**VibeIt** is a revolutionary NFT-based event ticketing platform built on the XDC blockchain. It combines the power of decentralized technology with an intuitive user experience, featuring an interactive map for event discovery, pixel art NFT tickets, and seamless blockchain integration.

### ✨ Key Features

- 🗺️ **Interactive Event Map** - Explore events on OpenStreetMap with Leaflet.js
- 🎨 **Pixel Art NFT Tickets** - Unique, deterministic SVG avatars for each ticket
- 🏗️ **Smart Contract Integration** - Built on XDC blockchain with Scaffold-ETH 2
- 📍 **Location-Based Discovery** - Search events by city with quick location buttons
- 💳 **Seamless Payments** - Pay with XDC cryptocurrency
- 🎪 **Event Management** - Create and manage events with detailed information
- 🔐 **Wallet Integration** - Connect with MetaMask and other Web3 wallets

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling with gradients and animations
- **Leaflet.js** - Interactive maps with OpenStreetMap
- **Wagmi & Viem** - Ethereum interactions

### Blockchain
- **XDC Network** - Fast, low-cost blockchain
- **Solidity** - Smart contract development
- **Hardhat** - Development environment
- **OpenZeppelin** - Secure contract standards

### Smart Contracts
- **EventManager.sol** - Event creation and ticket sales
- **VibeTicket.sol** - ERC-721 NFT tickets

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18.18+)
- [Yarn](https://yarnpkg.com/) (v1 or v2+)
- [Git](https://git-scm.com/)
- MetaMask or compatible Web3 wallet

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd vibeit
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Start the Development Server
```bash
cd packages/nextjs
yarn start
```

### 4. Access the Application
- **Local**: http://localhost:3000
- **Network**: Available on your local network

---

## 🌐 Deployed Contracts (XDC Testnet)

### Contract Addresses
- **VibeTicket (NFT)**: `0x8e87ef2d07Aeac605050B972BFbFb8F5682c7351`
- **EventManager**: `0xc70280C78faFA7613f3C8eAddCBF5c36501487bF`

### Network Details
- **Network**: XDC Apothem Testnet
- **Chain ID**: 51
- **RPC URL**: https://erpc.apothem.network
- **Explorer**: https://explorer.apothem.network

---

## 🎯 Core Features

### 🎪 Event Creation
Create events with comprehensive details:
- Event name and description
- Date and time
- Physical address/location
- Ticket pricing in XDC
- Total ticket supply

### 🗺️ Interactive Map
- **OpenStreetMap Integration** - Real street data and geographic features
- **Event Pins** - Clickable markers showing event locations
- **City Search** - Quick navigation to major cities
- **User Location** - Shows your current position with pulsing animation
- **Event Popups** - Detailed event information on pin click

### 🎨 NFT Tickets
- **Unique Pixel Art** - Deterministic SVG avatars based on token ID
- **ERC-721 Standard** - Full NFT ownership and transferability
- **Metadata Storage** - Event details stored on-chain
- **Transaction History** - Complete ownership and transfer records

### 💼 Ticket Management
- **My Tickets Page** - View all owned NFT tickets
- **Detailed Modals** - Transaction IDs, contract addresses, mint dates
- **Visual Avatars** - Beautiful pixel art representations
- **Event Information** - Linked event details and metadata

---

## 🏗️ Project Structure

```
vibeit/
├── packages/
│   ├── hardhat/                 # Smart contracts & deployment
│   │   ├── contracts/
│   │   │   ├── EventManager.sol # Event management contract
│   │   │   └── VibeTicket.sol   # NFT ticket contract
│   │   ├── deploy/              # Deployment scripts
│   │   └── deployments/         # Contract addresses & ABIs
│   │
│   └── nextjs/                  # Frontend application
│       ├── app/
│       │   ├── page.tsx         # Homepage with map
│       │   ├── create-event/    # Event creation page
│       │   └── my-tickets/      # Ticket management page
│       ├── components/          # Reusable UI components
│       └── hooks/               # Scaffold-ETH hooks
│
├── README.md
└── package.json
```

---

## 🔧 Development

### Smart Contract Development
```bash
# Compile contracts
cd packages/hardhat
yarn compile

# Run tests
yarn test

# Deploy to testnet
yarn deploy --network xdcTestnet
```

### Frontend Development
```bash
# Start development server
cd packages/nextjs
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

### Environment Configuration
Create `.env` files in respective packages:

**packages/hardhat/.env**
```env
DEPLOYER_PRIVATE_KEY=your_private_key_here
XDC_TESTNET_PRIVATE_KEY=your_testnet_key_here
```

**packages/nextjs/.env.local**
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

---

## 🎨 UI/UX Design

### Design Philosophy
- **Modern & Clean** - Inspired by Luma's design language
- **Gradient Aesthetics** - Purple to blue gradients throughout
- **Smooth Animations** - Hover effects and transitions
- **Responsive Design** - Works on all device sizes
- **Accessibility** - High contrast and keyboard navigation

### Color Palette
- **Primary**: Purple (`#7C3AED`) to Blue (`#2563EB`)
- **Background**: Light gradients (`purple-50` to `blue-50`)
- **Text**: Dark gray (`#1F2937`) for readability
- **Accents**: White cards with subtle shadows

---

## 🔐 Security Features

- **OpenZeppelin Standards** - Battle-tested contract libraries
- **Input Validation** - Comprehensive form and contract validation
- **Access Controls** - Proper ownership and permission management
- **Reentrancy Protection** - Secure payment handling
- **Type Safety** - TypeScript throughout the application

---

## 🌍 Network Configuration

### XDC Testnet Setup
Add XDC Apothem Testnet to MetaMask:
- **Network Name**: XDC Apothem Network
- **RPC URL**: https://erpc.apothem.network
- **Chain ID**: 51
- **Currency Symbol**: TXDC
- **Block Explorer**: https://explorer.apothem.network

### Getting Test Tokens
Visit the [XDC Faucet](https://faucet.apothem.network/) to get test TXDC tokens.

---

## 📱 Usage Guide

### For Event Organizers
1. **Connect Wallet** - Link your Web3 wallet
2. **Create Event** - Fill out the event creation form
3. **Set Pricing** - Define ticket price in XDC
4. **Manage Sales** - Monitor ticket sales and revenue

### For Event Attendees
1. **Browse Events** - Explore the interactive map
2. **Search Locations** - Use city buttons or search bar
3. **Purchase Tickets** - Buy NFT tickets with XDC
4. **Manage Collection** - View tickets in My Tickets page

---

## 🚀 Deployment

### Smart Contracts
Contracts are deployed on XDC Apothem Testnet. For mainnet deployment:

```bash
# Configure mainnet in scaffold.config.ts
# Deploy to mainnet
yarn deploy --network xdcMainnet
```

### Frontend Deployment
Deploy to Vercel, Netlify, or any static hosting:

```bash
yarn build
# Upload dist/ folder to hosting provider
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create Feature Branch** - `git checkout -b feature/amazing-feature`
3. **Commit Changes** - `git commit -m 'Add amazing feature'`
4. **Push to Branch** - `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write comprehensive tests
- Document new features
- Maintain code quality with ESLint

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Scaffold-ETH 2** - Development framework
- **XDC Network** - Blockchain infrastructure
- **OpenStreetMap** - Map data and tiles
- **Leaflet.js** - Interactive mapping library
- **OpenZeppelin** - Smart contract security standards

---

## 📞 Support

For questions, issues, or contributions:
- **GitHub Issues** - Report bugs and request features
- **Documentation** - Check inline code comments
- **Community** - Join XDC Network Discord

---

<div align="center">
  <p>Built with ❤️ for the XDC Network ecosystem</p>
  <p>🎫 <strong>VibeIt - Where Events Meet NFTs</strong> 🎫</p>
</div>