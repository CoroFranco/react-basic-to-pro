import { motion } from 'framer-motion'
import useCart from '../hooks/useCart'

export default function Cart({closeCart}) {
    const {cart, removeFromCart, addOneProduct, removeOneProduct} = useCart()
    
    return (
        <motion.div 
            id="overlay" 
            onClick={closeCart} 
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.aside 
                onClick={e => e.stopPropagation()}
                className="bg-white fixed top-0 right-0 h-screen w-[350px] shadow-xl"
                initial={{ x: '100%' }}
                animate={{ x: '0' }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3 }}
            >
                <header className="p-4 border-b sticky top-0 bg-white/80 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-[#222]">Shopping Cart</h3>
                </header>

                <ul className="py-2 px-4 overflow-y-auto max-h-[calc(100vh-180px)]">
                    {cart.map(product => (
                      
                        <li key={product.title} className='flex flex-col border-b-black border-b-[1px] last:border-none py-4'>
                          <div className="flex gap-4  ">
                          <div className='w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center p-2 flex-shrink-0'>
                                <img 
                                    src={product.image || "/placeholder.svg"} 
                                    alt={product.title}
                                    className="max-h-full w-auto object-contain" 
                                />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium line-clamp-2 mb-1">
                                    {product.title}
                                </h3>
                                <p className="text-base font-bold text-gray-900">
                                    ${product.price}
                                </p>
                            </div>
                            <div>
                                <button className='text-black' onClick={()=>removeFromCart(product.title)}> Quitar </button>
                            </div>
                          </div>
                        <div>
                          <button onClick={() => removeOneProduct(product.title)} className='text-black'>-</button>
                          <span className='text-black'>{product.quantity}</span>
                          <button onClick={() => addOneProduct(product.title)} className='text-black'>+</button>
                        </div>
                            
                        </li>
                    ))}
                </ul>

                <footer className="border-t p-4 bg-gray-50 sticky bottom-0">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">Total</span>
                        <span className="text-lg text-black font-bold">
                            ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                        </span>
                    </div>

                    <button className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                        Checkout
                    </button>
                </footer>
            </motion.aside>
        </motion.div>
    )
}
