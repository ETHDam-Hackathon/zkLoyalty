export type GroupCardType = {
  name: string
  points: number
}

export function GroupCard(group: GroupCardType) {
  return (
    <div className='p-4'>
      <div className='card w-50  bg-primary text-primary-content'>
        <div className='card-body'>
          <h2 className='card-title'>{group.name}</h2>
          <p>You currently hold {group.points} Points!</p>
          <div className='card-actions justify-end'>
            <button className='btn'>Redeem</button>
          </div>
        </div>
      </div>
    </div>
  )
}
