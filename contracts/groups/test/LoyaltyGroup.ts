import { Group, Identity, generateProof } from "@semaphore-protocol/core"
import { expect } from "chai"
import { run } from "hardhat"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { LoyaltyGroupFactory, LoyaltyGroup } from "../typechain-types"
import "ethers"
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("LoyaltyGroupFactory", () => {
	let factoryContract: LoyaltyGroupFactory
	let semaphoreContract: string

	before(async () => {
		const { semaphore } = await run("deploy:semaphore", {
			logs: false
		})

		factoryContract = await run("deploy", { logs: false, _semaphore: await semaphore.getAddress() })
		semaphoreContract = semaphore;
	})

	describe("# createLoyaltyGroup", () => {
		it("creates groups with correct group ids", async function() {
			const tx0 = factoryContract.createGroup();
			await expect(tx0)
				.to.emit(factoryContract, "GroupCreated")
				.withArgs(anyValue, 0);

			const tx1 = factoryContract.createGroup();
			await expect(tx1)
				.to.emit(factoryContract, "GroupCreated")
				.withArgs(anyValue, 1);
		});
	})
})

describe("LoyaltyGroup", () => {
	let owner: Address
	let group0: LoyaltyGroup
	let semaphoreContract: string

	before(async () => {
		const { semaphore } = await run("deploy:semaphore", {
			logs: false
		})

		let groups = await ethers.getContractFactory("LoyaltyGroup");
		let semaphoreAddr = await semaphore.getAddress();

		[owner] = await ethers.getSigners();
		group0 = await groups.connect(owner).deploy(semaphoreAddr, 0);
		semaphoreContract = semaphore;
	})

	describe("# addMember", () => {
		it("requires owner", async function() {
			let [_, notTheOwner] = await ethers.getSigners();
			let tx = group0.connect(notTheOwner).addMember(42);
			await expect(tx).to.be.revertedWith("Only the group owner can add members");

			let tx2 = group0.connect(owner).addMember(44);
			await expect(tx2).not.to.be.reverted;
		})
	})
})

