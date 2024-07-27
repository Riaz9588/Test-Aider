import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import useCartStore from '../store/cartStore'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=20')
        setProducts(response.data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Products</h2>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="relative h-48">
              <Image 
                src={product.thumbnail} 
                alt={product.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <a className="font-semibold text-lg mb-2 hover:text-blue-600 line-clamp-2">
                  {product.title}
                </a>
              </Link>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <button 
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                onClick={() => addItem(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
