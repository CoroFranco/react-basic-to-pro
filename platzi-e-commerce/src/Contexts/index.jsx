import { createContext, useCallback, useEffect, useState } from 'react'

export const ShoppingCartContext = createContext()

export default function ShoppingCartProvider ({ children }) {
  const [count, setCount] = useState(0)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const [isCheckoutMenuOpen, setIsCheckoutMenuOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [productDetail, setProductDetail] = useState({})
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchByTitle, setSearchByTitle] = useState(null)
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://api.escuelajs.co/api/v1/products')
      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const filterProducts = useCallback((products, search, category) => {
    if ((!search || search === '') && category === 'All') {
      return products
    }
    if (category !== 'All' && (!search || search === '')) {
      return products.filter(product =>
        product.category.name.toLowerCase().includes(category))
    }
    if (category === 'All') {
      return products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()))
    }
    return products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      product.category.name.toLowerCase().includes(category)
    )
  }, [category])

  useEffect(() => {
    const filtered = filterProducts(products, searchByTitle, category)
    setFilteredProducts(filtered)
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [products, searchByTitle, filterProducts])

  const addToCart = (e, product) => {
    e.stopPropagation()
    closeProductDetail()
    openCheckoutMenu()
    setCount(count + 1)
    setCart(prevCart => {
      const productExists = prevCart.find(item => item.id === product.id)

      if (productExists) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const addDetail = (product) => {
    openProductDetail()
    closeCheckoutMenu()
    setProductDetail({ ...product })
  }

  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  const openCheckoutMenu = () => setIsCheckoutMenuOpen(true)
  const closeCheckoutMenu = () => setIsCheckoutMenuOpen(false)

  const [order, setOrder] = useState([])

  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      cart,
      addToCart,
      openCheckoutMenu,
      closeCheckoutMenu,
      addDetail,
      productDetail,
      isCheckoutMenuOpen,
      setCart,
      order,
      setOrder,
      products,
      searchByTitle,
      setSearchByTitle,
      filteredProducts,
      setCategory,
      loading
    }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
