import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useCartStore from '../store/cartStore'

export default function Navigation() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const cartItems = useCartStore((state) => state.items)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/">
              <a className="text-xl font-bold text-gray-800 flex items-center">
                <i className="fas fa-store mr-2"></i>
                Next.js E-commerce
              </a>
            </Link>
          </li>
          <li>
            <Link href="/categories">
              <a className="text-gray-600 hover:text-gray-800 flex items-center">
                <i className="fas fa-th-large mr-1"></i>
                Categories
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/checkout">
              <a className="text-gray-600 hover:text-gray-800 mr-4 relative">
                <i className="fas fa-shopping-cart text-xl"></i>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </a>
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            ) : (
              <Link href="/login">
                <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login
                </a>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
