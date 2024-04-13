import { expect } from "chai"
import { run } from "hardhat"
import { LoyaltyGroup } from "../typechain-types"
import "ethers"

describe("LoyaltyGroup2", () => {
	let contract: LoyaltyGroup
	let semaphoreContract: string

	before(async () => {
		const { semaphore } = await run("deploy:semaphore", {
			logs: false
		})

		contract = await run("deploy", { logs: false, _semaphore: await semaphore.getAddress() })
		semaphoreContract = semaphore;
	})

	describe("# createLoyaltyGroup", () => {
	})
})
