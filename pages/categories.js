import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories')
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Product Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          const categoryName = typeof category === 'string' ? category : category.name
          const categorySlug = typeof category === 'string' ? category : category.slug
          return (
            <Link href={`/category/${categorySlug}`} key={index}>
              <a className="bg-white shadow-md rounded-lg p-4 text-center hover:bg-blue-50 transition-colors duration-300">
                <h2 className="text-lg font-semibold text-gray-800 capitalize">{categoryName}</h2>
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
