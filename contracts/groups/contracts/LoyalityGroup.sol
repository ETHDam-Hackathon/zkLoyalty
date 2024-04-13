pragma solidity ^0.8.23;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract LoyaltyGroup {
    ISemaphore public semaphore;
    mapping (uint256 => address) groupOwners;

    event GroupCreated(address owner, uint256 groupId);

    constructor(address _semaphore) {
        semaphore = ISemaphore(_semaphore);
    }

    function createGroup() external {
        uint256 groupId = semaphore.createGroup(address(this));
	groupOwners[groupId] = msg.sender;
        emit GroupCreated(msg.sender, groupId);
    }

    function addMember(uint256 identityCommitment, uint256 groupId) external {
	require(groupOwners[groupId] == msg.sender, "Only the group owner can add members.");
        semaphore.addMember(groupId, identityCommitment);
    }
}
