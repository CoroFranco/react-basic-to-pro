import { useContext, useEffect, useState } from "react"
import { FiltersContext } from "../contexts/filter"

export default function useFilters() {
  const [products, setProducts] = useState([])
  const {filters, setFilters} = useContext(FiltersContext)
  const [loading, setLoading] = useState(true)

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.price && 
        (filters.category === 'ALL' || product.category === filters.category) &&
        (filters.title === '' || product.title.toLowerCase().includes(filters.title.toLowerCase()))
      );
    });
  };

  const filteredProducts = filterProducts(products)

  const search = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    search()
  }, [])

  return {filteredProducts, filters, setFilters, loading}
}
