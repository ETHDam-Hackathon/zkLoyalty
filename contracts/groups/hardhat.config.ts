import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@semaphore-protocol/hardhat";
import "./tasks/deploy";

const config: HardhatUserConfig = {
  solidity: "0.8.23",
};

export default config;
