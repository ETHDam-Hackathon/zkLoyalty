pragma solidity >=0.8.23;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract LoyaltyGroupFactory {
  ISemaphore semaphore;
  uint256 numberOfGroups;

  event GroupCreated(address newContract, uint groupId);

  constructor(address _semaphore) {
    semaphore = ISemaphore(_semaphore);
    numberOfGroups = 0;
  }

  function createGroup() external {
    uint256 groupId = semaphore.createGroup();
    LoyaltyGroup newGroup = new LoyaltyGroup(address(semaphore), groupId);
    emit GroupCreated(address(newGroup), groupId);
    numberOfGroups++;
  }
}

contract LoyaltyGroup {
  ISemaphore semaphore;
  uint256 groupId;
  address owner;

  constructor(address _semaphore, uint256 _groupId) {
    semaphore = ISemaphore(_semaphore);
    groupId = _groupId;
    owner = msg.sender;
  }

  function addMember(uint256 identityCommitment) external {
    require(msg.sender == owner, "Only the group owner can add members");
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
