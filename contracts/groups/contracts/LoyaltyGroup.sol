pragma solidity >=0.8.23;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract LoyaltyGroupFactory {
  address semaphore;
  uint numberOfGroups;

  constructor(address _semaphore) {
    semaphore = _semaphore;
    numberOfGroups = 0;
  }

  function createGroup() external returns(address, uint) {
    LoyaltyGroup newGroup = new LoyaltyGroup(semaphore, numberOfGroups);
    uint groupId = numberOfGroups;
    numberOfGroups++;
    return (address(newGroup), groupId);
  }
}

contract LoyaltyGroup {
  ISemaphore semaphore;
  uint groupId;
  address owner;

  constructor(address _semaphore, uint _groupId) {
    semaphore = ISemaphore(_semaphore);
    groupId = _groupId;
    owner = msg.sender;
  }

  function addMember(uint256 identityCommitment) external {
    require(msg.sender == owner);
    semaphore.addMember(groupId, identityCommitment);
  }

  function sendFeedback(
    uint256 merkleTreeDepth,
    uint256 merkleTreeRoot,
    uint256 nullifier,
    uint256 feedback,
    uint256[8] calldata points
  ) external {
    ISemaphore.SemaphoreProof memory proof = ISemaphore.SemaphoreProof(
      merkleTreeDepth,
      merkleTreeRoot,
      nullifier,
      feedback,
      groupId,
      points
    );

    semaphore.validateProof(groupId, proof);
  }
}
