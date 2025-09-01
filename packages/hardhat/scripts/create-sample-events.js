const { ethers } = require("hardhat");

async function main() {
  console.log("Creating sample events in EventManager contract...");

  // Get the contract factory and attach to deployed address
  const EventManager = await ethers.getContractFactory("EventManager");
  const eventManager = EventManager.attach("0xc70280C78faFA7613f3C8eAddCBF5c36501487bF");

  // Sample events matching the homepage
  const events = [
    {
      name: "Tech Innovation Conference 2025",
      description: "Join industry leaders discussing AI, blockchain, and the future of technology in this premier conference.",
      date: Math.floor(new Date("2025-01-10").getTime() / 1000),
      ticketPrice: ethers.parseEther("0.1"),
      totalTickets: 100
    },
    {
      name: "Summer Music Festival",
      description: "Three days of incredible live music featuring top artists across multiple genres and stages.",
      date: Math.floor(new Date("2025-01-15").getTime() / 1000),
      ticketPrice: ethers.parseEther("0.1"),
      totalTickets: 100
    },
    {
      name: "Web Development Workshop",
      description: "Hands-on workshop covering modern web development with React, Node.js, and cloud deployment.",
      date: Math.floor(new Date("2025-01-18").getTime() / 1000),
      ticketPrice: ethers.parseEther("0.1"),
      totalTickets: 100
    },
    {
      name: "Startup Networking Meetup",
      description: "Connect with entrepreneurs, investors, and innovators in Houston's thriving startup ecosystem.",
      date: Math.floor(new Date("2025-01-22").getTime() / 1000),
      ticketPrice: ethers.parseEther("0.1"),
      totalTickets: 100
    },
    {
      name: "Jazz & Blues Concert",
      description: "An intimate evening of smooth jazz and soulful blues featuring renowned local and international artists.",
      date: Math.floor(new Date("2025-01-25").getTime() / 1000),
      ticketPrice: ethers.parseEther("0.1"),
      totalTickets: 100
    },
    {
      name: "Digital Marketing Workshop",
      description: "Learn cutting-edge digital marketing strategies, SEO techniques, and social media best practices.",
      date: Math.floor(new Date("2025-01-30").getTime() / 1000),
      ticketPrice: ethers.parseEther("0.1"),
      totalTickets: 100
    }
  ];

  // Check current event count
  const currentEventCount = await eventManager.nextEventId();
  console.log(`Current events in contract: ${currentEventCount}`);

  // Create each event
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    console.log(`\nCreating event ${i}: ${event.name}`);
    console.log(`Price: ${ethers.formatEther(event.ticketPrice)} XDC`);
    console.log(`Date: ${new Date(event.date * 1000).toLocaleDateString()}`);
    
    try {
      const tx = await eventManager.createEvent(
        event.name,
        event.description,
        event.date,
        event.ticketPrice,
        event.totalTickets
      );
      
      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log(`✅ Event ${i} created successfully`);
    } catch (error) {
      console.error(`❌ Failed to create event ${i}:`, error.message);
    }
  }

  // Check final count
  const finalEventCount = await eventManager.nextEventId();
  console.log(`\n🎉 Final events in contract: ${finalEventCount}`);
  console.log(`Created ${finalEventCount - currentEventCount} new events`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
