import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import useCartStore from '../../store/cartStore'

export default function Product() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://dummyjson.com/products/${id}`)
          setProduct(response.data)
        } catch (error) {
          console.error('Error fetching product:', error)
        }
      }
      fetchProduct()
    }
  }, [id])

  if (!product) return <div className="text-center py-10">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <div className="relative h-96 w-full md:w-96">
              <Image src={product.thumbnail} alt={product.title} layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.title}</h1>
            <p className="text-2xl font-bold mb-4 text-blue-600">${product.price.toFixed(2)}</p>
            <p className="mb-4 text-gray-600">{product.description}</p>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Brand:</span> {product.brand}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Category:</span> {product.category}
            </div>
            <div className="mb-6">
              <span className="font-semibold text-gray-700">Rating:</span> {product.rating} / 5
            </div>
            <button 
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
              onClick={() => addItem(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
