import { createInstance } from 'fhevmjs'
import { useAccount, useReadContract } from 'wagmi'
import { zamaABI, semaAbi } from '@/abis'
import { readContract } from '@wagmi/core'
import { Wallet, JsonRpcProvider, Contract, ethers } from 'ethers'

let _instance: any

export function app() {
  const result = useReadContract({
    abi: zamaABI,
    address: '0x7e9D541EbcfF638fE973928Bf03Dc75A428903fb',
    functionName: 'checkPoints',
  })

  console.log('result: ', result)
}

const provider = new JsonRpcProvider('https://devnet.zama.ai/')

// Function to create or retrieve an FHE instance
const getInstance = async () => {
  if (_instance) return _instance

  // Get the current network's chain id
  const network = await provider.getNetwork()
  const chainId = parseInt(String(network.chainId), 10)

  const ret = await provider.call({
    // fhe lib address, may need to be changed depending on network
    to: '0x000000000000000000000000000000000000005d',
    // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    data: '0xd9d47bb001',
  })
  const decoded = ethers.AbiCoder.defaultAbiCoder().decode(['bytes'], ret)
  const publicKey = decoded[0]

  console.log('publicKey: ', publicKey)

  // Create and cache the FHE instance
  _instance = createInstance({ chainId, publicKey })
  return _instance
}

// const checkPoints = async () => {
//   const user = new Wallet('0xb56abbe1e399f6db451b495bc190ea73e3ecb67e16686705d3488935fc5c9ce6', provider)
//   const contract = new Contract(CONTRACT_ADDRESS, ABI, user)

//   // Send the transaction to check points
//   const points = await contract.checkPoints()
//   return points
// }
