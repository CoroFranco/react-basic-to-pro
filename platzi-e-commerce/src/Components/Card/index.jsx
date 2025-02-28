import { useContext } from 'react'
import { ShoppingCartContext } from '../../Contexts'

export default function Card ({ product }) {
  const { count, setCount } = useContext(ShoppingCartContext)
  console.log()
  return (
    <div className='bg-white cursor-pointer w-56 h-60 rounded-xl overflow-hidden'>
      <figure className='relative mb-2 w-full h-4/5'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-xl text-black text-sm px-3 py-0.5 m-2'>{product?.category.name}</span>
        <img className='w-full h-full object-cover' src={product?.images[0]} alt='headphones' />
        <button onClick={() => setCount(count + 1)} className='absolute top-0 right-0 m-2 bg-white rounded-full w-6 h-6 flex items-center justify-center pb-0.5 hover:bg-gray-100'>
          +
        </button>
      </figure>
      <p className='flex place-items-center justify-between'>
        <span className='text-sm font-light'>{product?.title}</span>
        <span className='text-sm font-bold'>${product?.price}</span>
      </p>
    </div>
  )
}
