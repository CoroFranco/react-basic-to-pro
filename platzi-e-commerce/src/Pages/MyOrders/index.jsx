import { useContext } from 'react'
import OrdersCard from '../../Components/OrdersCard'
import { ShoppingCartContext } from '../../Contexts'
import { Link } from 'react-router-dom'

export default function MyOrders () {
  const { order } = useContext(ShoppingCartContext)
  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <h1>MyOrders</h1>
      {
        order.map((order, id) => (
          <Link key={id} to={`/my-orders/${id}`}>
            <OrdersCard totalPrice={order.totalPrice} totalProducts={order.totalProduct} />
          </Link>

        ))
      }
    </div>
  )
}
