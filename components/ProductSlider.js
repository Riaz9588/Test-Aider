import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function ProductSlider() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=5')
        setFeaturedProducts(response.data.products)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      }
    }
    fetchFeaturedProducts()
  }, [])

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="rounded-lg overflow-hidden"
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/products/${product.id}`}>
              <a className="block relative h-96 w-full">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="text-lg">${product.price.toFixed(2)}</p>
                </div>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
