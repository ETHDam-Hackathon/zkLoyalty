import { parseAbiItem } from 'viem'
import { publicClient } from './client'

export function unwatch() {
  console.log('time for watching')
  publicClient.watchEvent({
    address: '0x2A123CAb6eb46A22ad1FeBF5a73F7832601775ad',
    event: {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'newContract',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'groupId',
          type: 'uint256',
        },
      ],
      name: 'GroupCreated',
      type: 'event',
    },
    onLogs: (logs) => console.log(logs),
  })
}
