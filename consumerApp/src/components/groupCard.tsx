import React from 'react'

export type GroupCardType = {
  name: string
  points: number
  groupNumber: string
  url: string
}

export function GroupCard(group: GroupCardType) {
  return (
    <div className='p-4'>
      <div className='card w-50  bg-primary text-primary-content'>
        <div className='card-body'>
          {/* <figure>
            <img src={group.url} alt='img' />
          </figure> */}
          <h2 className='card-title'>{group.name}</h2>
          <p>You currently hold {group.points} Points!</p>
          <div className='card-actions justify-end'>
            <label htmlFor='my_modal_6' className='btn'>
              Redeem!
            </label>

            <input type='checkbox' id='my_modal_6' className='modal-toggle' />
            <div className='modal' role='dialog'>
              <div className='modal-box bg-white'>
                <h3 className='font-bold text-lg'>Redeem!</h3>
                <p className='py-4'>Some Crazy Function</p>
                <div className='modal-action'>
                  <label htmlFor='my_modal_6' className='btn'>
                    Close!
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
