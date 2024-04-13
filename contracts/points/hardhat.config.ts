import { HardhatUserConfig } from "hardhat/config";
import '@oasisprotocol/sapphire-hardhat';
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    'zama-devnet': {
      url: "https://devnet.zama.ai",
      accounts: [String(process.env.COMPANY_PRIVATE_KEY), String(process.env.USER_PRIVATE_KEY)],
      chainId: 0x1F49,
    }
  }
};

export default config;