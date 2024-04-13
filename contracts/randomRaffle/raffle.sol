// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Raffle is Ownable {
    uint32 private winningNumber;

    constructor() Ownable(msg.sender) {}

    function generateRaffleNumber() public view returns (string memory) {
        bytes32 seed = bytes32(Sapphire.randomBytes(32, ""));
        uint256 raffleNumber = uint256(
            keccak256(abi.encodePacked(msg.sender, seed))
        ) % 10;
        if (raffleNumber == winningNumber) {
            return "You won!";
        } else {
            return "Next time!";
        }
    }

    function setWinningNumber(uint32 _number) public onlyOwner {
        require(_number >= 1 && _number <= 10);
        uint32 actNumber = _number - 1;
        winningNumber = actNumber;
    }
}
