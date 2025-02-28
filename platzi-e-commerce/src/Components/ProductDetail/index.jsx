import { motion } from 'motion/react'

export default function ProductDetail () {
  return (
    <motion.aside
      className='w-[350px] flex flex-col  fixed right-2 h-[90vh] border border-black rounded-xl'
      initial={{ x: '100vh' }}
      animate={{ x: 0 }}
      transition={{ duration: 2, delay: 1, type: 'spring', stiffness: 1000, damping: 40 }}
    >
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>Detail</h2>
        <div>X</div>
      </div>
    </motion.aside>
  )
}
