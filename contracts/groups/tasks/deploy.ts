import { task, types } from "hardhat/config"

task("deploy", "Deploy a LoyaltyGroup contract")
    .addOptionalParam("semaphore", "Semaphore contract address", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs, semaphore: semaphoreAddress }, { ethers, run }) => {
        if (!semaphoreAddress) {
            const { semaphore } = await run("deploy:semaphore", {
                logs
            })

            semaphoreAddress = await semaphore.getAddress()
        }

        const factory = await ethers.getContractFactory("LoyaltyGroup")

        const contract = await factory.deploy(semaphoreAddress)

        if (logs) {
            console.info(`LoyaltyGroup contract has been deployed to: ${await contract.getAddress()}`)
        }

        return contract
    })

