import { useContext } from 'react'
import { ShoppingCartContext } from '../../Contexts'
import { Link } from 'react-router-dom'

export default function MyOrder () {
  const { order } = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = order?.length - 1

  return (
    <div>
      <div>
        <h1 className='text-center font-bold text-2xl mb-4'>My Order</h1>
        <Link to='/my-orders'>
          <span> Atras </span>
        </Link>
      </div>
      <div className='flex flex-col items-center justify-center p-6 border-sky-300/50 border-1 container mx-auto'>
        {
              order?.[index]?.products.map(item => (
                <div key={item.id} className='py-5 max-w-[500px] w-full flex justify-between border-b-1 border-gray-400/50 last-of-type:border-0 p-6'>
                  <div className='flex items-center gap-2'>
                    <figure className='h-20 w-20 flex items-center'>
                      <img className='object-cover rounded-lg' src={item.images[0]} alt={`imagen de ${item.title}`} />
                    </figure>
                    <div className='flex flex-col justify-center items-center'>
                      <span className='font-medium text-md text-center'>{item.title}</span>
                      <span>{item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))
            }
      </div>

    </div>
  )
}
