import { useEffect, useState } from 'react'
import Card from '../../Components/Card'
import Layout from '../../Components/Layout'
import ProductDetail from '../../Components/ProductDetail'

export default function Home () {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://api.escuelajs.co/api/v1/products')
      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <Layout>
      Home
      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 w-[95%] place-items-center max-w-[1200px]'>
        {
        products.map(product => (
          <Card key={product.id} product={product} />
        ))
      }
      </div>
      <ProductDetail />
    </Layout>
  )
}
