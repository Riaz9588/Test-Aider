import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import useCartStore from '../../store/cartStore'
import SkeletonLoader from '../../components/SkeletonLoader'

export default function CategoryProducts() {
  const router = useRouter()
  const { category } = router.query
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    if (category) {
      const fetchCategoryProducts = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`https://dummyjson.com/products/category/${category}`)
          setProducts(response.data.products)
        } catch (error) {
          console.error('Error fetching category products:', error)
        } finally {
          setTimeout(() => setLoading(false), 1000) // Simulate loading delay
        }
      }
      fetchCategoryProducts()
    }
  }, [category])

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 capitalize">{category} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 capitalize">{category} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
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
                onClick={() => addItem(product)}
              >
                <i className="fas fa-cart-plus mr-2"></i>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
