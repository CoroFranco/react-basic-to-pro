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

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://api.escuelajs.co/api/v1/products')
      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const filterProducts = useCallback((products, search) => {
    if (!search || search === '') {
      return products
    }
    return products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [])

  useEffect(() => {
    const filtered = filterProducts(products, searchByTitle)
    setFilteredProducts(filtered)
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
      filteredProducts
    }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
