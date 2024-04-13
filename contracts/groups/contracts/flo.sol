pragma solidity ^0.8.23;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract LoyaltyGroup {
    ISemaphore public semaphore;

    event GroupCreated(address owner, uint256 groupId);

    constructor(ISemaphore _semaphore) {
        semaphore = _semaphore;

        uint256 groupId = semaphore.createGroup(address(this));
        emit GroupCreated(msg.sender, groupId);
    }

    function addMember(uint256 identityCommitment, uint256 groupId) external {
        semaphore.addMember(groupId, identityCommitment);
    }
}
