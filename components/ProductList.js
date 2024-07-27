import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import useCartStore from '../store/cartStore'
import SkeletonLoader from './SkeletonLoader'
import useToast from '../hooks/useToast'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((state) => state.addItem)
  const { showToast } = useToast()

  const productsPerPage = 12

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`)
        setProducts(response.data.products)
        setTotalPages(Math.ceil(response.data.total / productsPerPage))
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setTimeout(() => setLoading(false), 1000) // Simulate loading delay
      }
    }
    fetchProducts()
  }, [currentPage])

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
        <Link href="/categories">
          <a className="text-blue-500 hover:text-blue-600 flex items-center">
            <span>View All Categories</span>
            <i className="fas fa-chevron-right ml-2"></i>
          </a>
        </Link>
      </div>
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: productsPerPage }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : filteredProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative h-48 bg-gray-200">
                  <Image 
                    src={product.thumbnail} 
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                  />
                </div>
                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <a className="font-semibold text-lg mb-2 hover:text-blue-600 line-clamp-2">
                      {product.title}
                    </a>
                  </Link>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <i className="fas fa-tag mr-2 text-blue-500"></i>
                    ${product.price.toFixed(2)}
                  </p>
                  <button 
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
                    onClick={() => {
                      addItem(product)
                      showToast(`${product.title} added to cart`, 'success')
                    }}
                  >
                    <i className="fas fa-cart-plus mr-2"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
      </div>
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}
