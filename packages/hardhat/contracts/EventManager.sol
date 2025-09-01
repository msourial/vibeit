// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "./VibeTicket.sol";

contract EventManager {
    struct Event {
        uint256 id;
        string name;
        string description;
        uint256 date;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 soldTickets;
        address organizer;
    }

    uint256 public nextEventId;
    mapping(uint256 => Event) public events;
    VibeTicket public vibeTicket;

    event EventCreated(
        uint256 id,
        string name,
        uint256 date,
        uint256 ticketPrice,
        uint256 totalTickets,
        address indexed organizer
    );

    event TicketPurchased(uint256 indexed eventId, address indexed buyer);

    constructor(address _vibeTicketAddress) {
        vibeTicket = VibeTicket(_vibeTicketAddress);
    }

    function createEvent(
        string memory _name,
        string memory _description,
        uint256 _date,
        uint256 _ticketPrice,
        uint256 _totalTickets
    ) public {
        require(_totalTickets > 0, "Must have at least one ticket");

        uint256 eventId = nextEventId;
        events[eventId] = Event({
            id: eventId,
            name: _name,
            description: _description,
            date: _date,
            ticketPrice: _ticketPrice,
            totalTickets: _totalTickets,
            soldTickets: 0,
            organizer: msg.sender
        });

        nextEventId++;

        emit EventCreated(eventId, _name, _date, _ticketPrice, _totalTickets, msg.sender);
    }

    function buyTicket(uint256 _eventId) public payable {
        Event storage _event = events[_eventId];

        require(_event.soldTickets < _event.totalTickets, "No tickets left");
        require(msg.value == _event.ticketPrice, "Incorrect ticket price");

        _event.soldTickets++;
        vibeTicket.mint(msg.sender);

        (bool success, ) = _event.organizer.call{value: msg.value}("");
        require(success, "Transfer failed.");

        emit TicketPurchased(_eventId, msg.sender);
    }

    function getEvents() public view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](nextEventId);
        for (uint i = 0; i < nextEventId; i++) {
            allEvents[i] = events[i];
        }
        return allEvents;
    }
}
