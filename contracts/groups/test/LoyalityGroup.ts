import { expect } from "chai"
import { run } from "hardhat"
import { LoyaltyGroup } from "../typechain-types"
import "ethers"

const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("LoyalityGroup", () => {
	let groupContract: LoyaltyGroup
	let semaphoreContract: string

	before(async () => {
		const { semaphore } = await run("deploy:semaphore", {
			logs: false
		})

		groupContract = await run("deploy", { logs: false, _semaphore: await semaphore.getAddress() })
		semaphoreContract = semaphore;
	})

	describe("# createGroup", () => {
		it("creates groups with different owners", async function () {
			let [owner0, owner1] = await ethers.getSigners();
			
			const tx0 = groupContract.connect(owner0).createGroup();
			await expect(tx0)
				.to.emit(groupContract, "GroupCreated")
				.withArgs(owner0.address, anyValue);

			const tx1 = groupContract.connect(owner1).createGroup();
			await expect(tx1)
				.to.emit(groupContract, "GroupCreated")
				.withArgs(owner1.address, anyValue);
		})
	})

	describe("# addMember", () => {
		it("lets only the group owner add members", async function () {
			let [owner, notTheOwner] = await ethers.getSigners();

			await groupContract.connect(owner).createGroup();

			const authorizedTx = groupContract.connect(owner).addMember(42, 0);
			await expect(authorizedTx).not.to.be.reverted;

			const unauthorizedTx = groupContract.connect(notTheOwner).addMember(73, 0);
			await expect(unauthorizedTx).to.be.revertedWith("Only the group owner can add members.");
		})

		it("warns about nonexisting groups and duplicate users", async function () {
			await groupContract.createGroup();
			await groupContract.createGroup();

			const tx = groupContract.addMember(1, 10);
			await expect(tx).to.be.revertedWith("Group does not exist.");
		})

		it("warns about duplicate users in the same group", async function () {
			let [owner0, owner1] = await ethers.getSigners();

			await groupContract.connect(owner0).createGroup();
			await groupContract.connect(owner1).createGroup();

			const tx1 = groupContract.connect(owner0).addMember(111, 0);
			await expect(tx1).not.to.be.reverted;

			const tx2 = groupContract.connect(owner0).addMember(111, 0);
			await expect(tx2).to.be.reverted;

			const tx3 = groupContract.connect(owner1).addMember(111, 1);
			await expect(tx3).not.to.be.reverted;
		})

	})
})
