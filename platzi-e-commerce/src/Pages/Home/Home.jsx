import { useContext } from 'react'
import Card from '../../Components/Card'
import Layout from '../../Components/Layout'
import ProductDetail from '../../Components/ProductDetail'
import CheckoutMenu from '../../Components/CheckoutMenu'
import { ShoppingCartContext } from '../../Contexts'

export default function Home () {
  const { products, searchByTitle, setSearchByTitle, filteredProducts } = useContext(ShoppingCartContext)
  const handleChange = (e) => {
    const { value } = e.target
    setSearchByTitle(value)
  }
  return (
    <Layout>
      <div className='flex justify-center font-bold text-4xl'>
        <h1 className='text-sky-500'>Home</h1>
      </div>
      <input
        type='text'
        placeholder='Laptops, headphones....'
        value={searchByTitle}
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-sky-300'
        onChange={(e) => handleChange(e)}
      />

      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 w-[95%] place-items-center max-w-[1200px]'>
        {
        filteredProducts.map(product => (
          <Card key={product.id} product={product} />
        ))
      }
      </div>
      <ProductDetail />
      <CheckoutMenu />
    </Layout>
  )
}
