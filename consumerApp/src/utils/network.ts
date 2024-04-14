import { defineChain } from 'viem'
import { mainnet, sapphireTestnet, sepolia } from 'viem/chains'
import { Chain, hardhat } from 'viem/chains'

export const fheZama = defineChain({
  id: 8009,
  name: 'Zama',
  nativeCurrency: {
    decimals: 18,
    name: 'Zama',
    symbol: 'ZAMA',
  },
  rpcUrls: {
    default: {
      http: ['https://devnet.zama.ai/'],
      webSocket: ['wss://devnet.zama.ai/'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://main.explorer.zama.ai' },
  },
})

let chains = [mainnet, sapphireTestnet, sepolia] as [Chain, ...Chain[]]

export const ETH_CHAINS = chains

export const NETWORK_COLORS = {
  ethereum: {
    color: 'green',
    bgVariant: 'bg-green-600',
  },
  arbitrum: {
    color: 'sky',
    bgVariant: 'bg-sky-600',
  },
  base: {
    color: 'blue',
    bgVariant: 'bg-blue-600',
  },
  linea: {
    color: 'slate',
    bgVariant: 'bg-slate-600',
  },
  polygon: {
    color: 'purple',
    bgVariant: 'bg-purple-600',
  },
  optimism: {
    color: 'red',
    bgVariant: 'bg-red-600',
  },
  scroll: {
    color: 'amber',
    bgVariant: 'bg-amber-600',
  },
  other: {
    color: 'gray',
    bgVariant: 'bg-gray-600',
  },
}

export function GetNetworkColor(chain?: string, type: 'color' | 'bgVariant' = 'color') {
  chain = chain?.toLocaleLowerCase()
  if (chain === 'sapphireTestnet' || chain === 'sepolia' || chain === 'homestead') return NETWORK_COLORS.ethereum[type]
  if (chain?.includes('arbitrum')) return NETWORK_COLORS.arbitrum[type]
  if (chain?.includes('base')) return NETWORK_COLORS.base[type]
  if (chain?.includes('linea')) return NETWORK_COLORS.linea[type]
  if (chain?.includes('polygon') || chain?.includes('matic')) return NETWORK_COLORS.polygon[type]
  if (chain?.includes('optimism') || chain?.startsWith('op')) return NETWORK_COLORS.optimism[type]
  if (chain?.includes('scroll')) return NETWORK_COLORS.scroll[type]

  return NETWORK_COLORS.other[type]
}
