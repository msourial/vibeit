// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VibeTicket is ERC721, Ownable {
    uint256 public nextTokenId;
    address public eventManager;

    modifier onlyEventManager() {
        require(msg.sender == eventManager, "Only EventManager can call this");
        _;
    }

    constructor() ERC721("Vibe Ticket", "VIBET") Ownable(msg.sender) {}

    function setEventManager(address _eventManager) public onlyOwner {
        eventManager = _eventManager;
    }

    function mint(address to) public onlyEventManager {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        nextTokenId++;
    }
}
