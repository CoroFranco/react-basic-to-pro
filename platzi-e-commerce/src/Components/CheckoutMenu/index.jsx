import { motion } from 'motion/react'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Contexts'
import { totalPrice } from '../../utils'
import { Link } from 'react-router-dom'

export default function CheckoutMenu () {
  const { isCheckoutMenuOpen, setCart, cart, closeCheckoutMenu, setOrder, order } = useContext(ShoppingCartContext)

  const handleClick = (id) => {
    const filteredProducts = cart.filter(item => item.id !== id)
    setCart(filteredProducts)
  }

  const handleCheckout = (cart) => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: cart,
      totalProduct: cart.length,
      totalPrice: totalPrice(cart)
    }
    setOrder([...order, orderToAdd])
    setCart([])
  }

  return (
    <>
      {
      isCheckoutMenuOpen &&
        <motion.aside
          className='w-[350px] overflow-scroll scroll-container bg-white flex flex-col fixed right-2 h-[90vh] border border-black rounded-xl'
          initial={{ x: '100vh' }}
          animate={{ x: 0 }}
          transition={{ duration: 2, type: 'spring', stiffness: 1000, damping: 40 }}
        >
          <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl'>Detail</h2>
            <div onClick={closeCheckoutMenu} className='cursor-pointer'>X</div>
          </div>

          <div className='flex-1'>
            {
              cart.map(item => (
                <div key={item.id} className='py-5 flex justify-between border-b-1 border-gray-400/50 last-of-type:border-0 p-6'>
                  <div className='flex items-center gap-2'>
                    <figure className='h-20 w-20 flex items-center'>
                      <img className='object-cover rounded-lg' src={item.images[0]} alt={`imagen de ${item.title}`} />
                    </figure>
                    <div className='flex flex-col justify-center items-center'>
                      <span className='font-medium text-md text-center'>{item.title}</span>
                      <span>{item.quantity}</span>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <p className='font-bold'>${item.price * item.quantity}</p>
                    <button className='cursor-pointer' onClick={() => handleClick(item.id)}>X</button>
                  </div>
                </div>
              ))
            }
          </div>

          <div className='flex justify-center font-bold text-2xl'>
            <p>Total: ${totalPrice(cart)}</p>
          </div>
          <div className='flex justify-center font-bold text-2xl my-4'>
            <Link to='/my-orders/last'>
              <button className='bg-gray-300/80 w-full px-2 py-1 rounded-2xl cursor-pointer hover:bg-gray-300' onClick={() => handleCheckout(cart)}>Chekout</button>
            </Link>
          </div>
        </motion.aside>
    }
    </>

  )
}
