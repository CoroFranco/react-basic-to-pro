import React, { useContext, useEffect, useState } from 'react'
import Card from '../../Components/Card'
import Layout from '../../Components/Layout'
import ProductDetail from '../../Components/ProductDetail'
import CheckoutMenu from '../../Components/CheckoutMenu'
import { ShoppingCartContext } from '../../Contexts'
import LoadingSpinner from '../../Components/LoadingSpinner'

export default function Home () {
  const { searchByTitle, setSearchByTitle, filteredProducts, setCategory, loading } = useContext(ShoppingCartContext)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  // Handle search input change
  const handleChange = (e) => {
    const { value } = e.target
    setSearchByTitle(value)
    // Reset to first page when search changes
    setCurrentPage(1)
  }

  // Get current path and category
  const currentPath = window.location.pathname
  const index = currentPath.substring(currentPath.lastIndexOf('/') + 1)

  // Set category based on path
  useEffect(() => {
    if (!index) {
      setCategory('All')
    } else {
      setCategory(index)
    }
  }, [index])

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading) {
    return (
      <LoadingSpinner
        size='large'
        color='purple'
        variant='dots'
        text='Cargando datos'
      />
    )
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>Exclusive Products</h1>
      </div>

      <input
        type='text'
        placeholder='Search a product'
        className='rounded-lg border border-black w-80 p-2 mb-4'
        onChange={handleChange}
        value={searchByTitle}
      />

      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 w-[95%] place-items-center max-w-[1200px]'>
        {
        currentProducts.map(product => (
          <Card key={product.id} product={product} />
        ))
      }
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center items-center mt-4 space-x-4'>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
        >
          Previous
        </button>

        <span className='text-gray-700'>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>

      <ProductDetail />
      <CheckoutMenu />
    </Layout>
  )
}
