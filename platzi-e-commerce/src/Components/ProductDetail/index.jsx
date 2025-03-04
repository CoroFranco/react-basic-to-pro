import { motion } from 'motion/react'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Contexts'

export default function ProductDetail () {
  const { isProductDetailOpen, productDetail, closeProductDetail } = useContext(ShoppingCartContext)
  return (
    <>
      {
      isProductDetailOpen &&
        <motion.aside
          className='w-[350px] overflow-scroll scroll-container bg-white flex flex-col fixed right-2 h-[90vh] border border-black rounded-xl'
          initial={{ x: '100vh' }}
          animate={{ x: 0 }}
          transition={{ duration: 2, type: 'spring', stiffness: 1000, damping: 40 }}
        >
          <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl'>Detail</h2>
            <div onClick={closeProductDetail} className='cursor-pointer'>X</div>
          </div>

          <div>
            <div className='mb-10 border-b-1 border-gray-400/50 last-of-type:border-0'>
              <figure className='px-6'>
                <img className='w-full h-full rounded-lg' src={productDetail?.images[0]} alt={`imagen de ${productDetail.title}`} />
              </figure>
              <p className='flex flex-col p-6 '>
                <span className='font-medium text-2xl'>{productDetail.price}</span>
                <span>{productDetail.quantity}</span>
                <span className='font-medium text-md'>{productDetail.title}</span>
                <span className='font-light max-h-[100px] overflow-hidden'>{productDetail.description}</span>
              </p>
            </div>
          </div>
        </motion.aside>
    }
    </>

  )
}
