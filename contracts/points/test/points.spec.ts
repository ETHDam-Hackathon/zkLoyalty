const { createInstance } = require("fhevmjs");
const { Wallet, JsonRpcProvider, Contract, ethers } = require("ethers");

// Load the ABI definition from a JSON file
const ABI = require("./ABI.json");

// Define the smart contract address
const CONTRACT_ADDRESS = "0x7e9D541EbcfF638fE973928Bf03Dc75A428903fb";

// Initialize a JSON-RPC provider pointing to the Zama network
const provider = new JsonRpcProvider("https://devnet.zama.ai/");

// Initialize a wallet with a private key and attach the provider
const signer = new Wallet("0xe03322b7debce9de786821499e0f5d45df8a0cc34665aeed56ce9a836a6d5afb", provider);

let _instance;

// Function to create or retrieve an FHE instance
const getInstance = async () => {
  if (_instance) return _instance;

  // Get the current network's chain id
  const network = await provider.getNetwork();
  const chainId = parseInt(network.chainId, 10);

  const ret = await provider.call({
    // fhe lib address, may need to be changed depending on network
    to: "0x000000000000000000000000000000000000005d",
    // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    data: "0xd9d47bb001",
  });
  const decoded = ethers.AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
  const publicKey = decoded[0];

  console.log("publicKey: ", publicKey);

  // Create and cache the FHE instance
  _instance = createInstance({ chainId, publicKey });
  return _instance;
};

// Function to reward points using encrypted transactions
const rewardPoints = async (to, amount) => {
  const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
  const instance = await getInstance();
  const encryptedAmount = instance.encrypt32(amount);

  // Send the encrypted transaction
  const transaction = await contract.rewardPoints(to, encryptedAmount);
  return transaction;
};

const checkPoints = async () => {
  const user = new Wallet("0xb56abbe1e399f6db451b495bc190ea73e3ecb67e16686705d3488935fc5c9ce6", provider);
  const contract = new Contract(CONTRACT_ADDRESS, ABI, user);

  // Send the transaction to check points
  const points = await contract.checkPoints();
  return points;
};

const redeemPoints = async (amount) => {
  const user = new Wallet("0xb56abbe1e399f6db451b495bc190ea73e3ecb67e16686705d3488935fc5c9ce6", provider);
  const contract = new Contract(CONTRACT_ADDRESS, ABI, user);
  const instance = await getInstance();
  const encryptedAmount = instance.encrypt32(amount);

  // Send the transaction to redeem points
  const transaction = await contract.redeemPoints(encryptedAmount);
  return transaction;
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const executeTransactions = async () => {
  try {
    console.log("Rewarding points...");
    const txReward = await rewardPoints("0x0483b9CA6325Ea4FBcAc02e16C1Dc06f054c93AA", 0x64);
    console.log("Transaction successful:", txReward);
    await delay(15000); // Delay for 15 seconds

    console.log("Checking points...");
    const txCheck1 = await checkPoints();
    console.log("Points checked:", txCheck1);
    await delay(15000); // Delay for 15 seconds

    console.log("Redeeming points...");
    const txRedeem = await redeemPoints(0x32);
    console.log("Redeem transaction successful:", txRedeem);
    await delay(15000); // Delay for 15 seconds

    console.log("Checking points again...");
    const txCheck2 = await checkPoints();
    console.log("Points checked:", txCheck2);
  } catch (err) {
    console.error("Error in transaction:", err);
  }
};

executeTransactions();