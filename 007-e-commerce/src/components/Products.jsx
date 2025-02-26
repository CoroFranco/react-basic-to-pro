import useCart from "../hooks/useCart"
import useFilters from "../hooks/useFilters"


export default function Products({dark}) {
  const { filteredProducts, loading } = useFilters()
  const {addToCart, cart} = useCart()

  return (
    <main className="py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Productos</h1>
      
      <section className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {
        loading && <div className="text-4xl font-bold text-center mb-12">Loading...</div>
      }
      {
        filteredProducts.length === 0 && loading === false && <div className="text-4xl font-bold text-center mb-12">No se encontraron produsctos</div>
      }
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className={`border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col ${dark ? 'bg-gray-500 shadow-white' : 'bg-white border-gray-200'}  overflow-hidden`}
          >
            <header className={`h-[280px] flex items-center justify-center p-6 ${dark ? 'bg-gray-100' : 'bg-gray-100'}`}>
              <img 
                src={product.image || "/placeholder.svg"} 
                alt={product.title}
                className="max-h-[220px] w-auto object-contain hover:scale-105 transition-transform duration-200" 
              />
            </header>
            
            <footer className="p-6 flex flex-col gap-4 border-t border-gray-100">
              <h3 className="text-lg font-medium line-clamp-2 min-h-[56px]">
                {product.title}
              </h3>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-xl font-bold text-gray-900">
                  ${product.price}
                </p>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-gray-900 cursor-pointer text-white px-6 py-2.5 rounded-md hover:bg-gray-800 active:bg-gray-950 transition-colors duration-200 text-sm font-medium"
                >
                  Add to cart
                </button>
              </div>
            </footer>
          </div>
        ))}
      </section>
    </main>
  )
}
