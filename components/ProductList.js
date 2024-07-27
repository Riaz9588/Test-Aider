import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import useCartStore from '../store/cartStore'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <Link href={`/products/${product.id}`}>
              <a className="font-semibold text-lg mb-2 hover:text-blue-600">
                {product.title}
              </a>
            </Link>
            <p className="mb-2">${product.price.toFixed(2)}</p>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => addItem(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
