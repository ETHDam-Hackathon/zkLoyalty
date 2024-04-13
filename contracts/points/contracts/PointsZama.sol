// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";

contract Points {

    mapping (address => euint32) public account;

    // This function allows the owner to reward points to any user.
    function rewardPoints( address _user, bytes calldata encryptedAmount) public {
        require(_user != address(0), "Invalid address");
        require(_user != msg.sender, "Company can't give points to itself!");
        euint32 amount = TFHE.asEuint32(encryptedAmount);
        account[_user] = TFHE.add(account[_user], amount);
    }

    // This function allows users to redeem their points.
    function redeemPoints(bytes calldata encryptedAmount) public onlyUser {
        euint32 amount = TFHE.asEuint32(encryptedAmount);
        require(TFHE.decrypt(TFHE.ge(account[msg.sender] ,amount )),  "Not enough points!");
        account[msg.sender] = TFHE.sub(account[msg.sender], amount);
    }

    // This function allows users to check their points balance.
    function checkPoints() public view returns (uint32) {
        return TFHE.decrypt(account[msg.sender]);
    }

    // This modifier ensures that the function is only called by a user who has points.
    modifier onlyUser() {
        require(TFHE.decrypt(account[msg.sender]) > 0, "Not a user or no points!");
        _;
    }
}
