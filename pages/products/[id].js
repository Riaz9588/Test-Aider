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
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="mb-4 relative h-96">
        <Image src={product.image} alt={product.title} layout="fill" objectFit="contain" />
      </div>
      <p className="text-2xl font-bold mb-2">${product.price.toFixed(2)}</p>
      <p className="mb-4">{product.description}</p>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => addItem(product)}
      >
        Add to Cart
      </button>
    </div>
  )
}
