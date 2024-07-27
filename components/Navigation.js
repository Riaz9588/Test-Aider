import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
              <a className="text-xl font-bold text-gray-800">Next.js E-commerce</a>
            </Link>
          </li>
          <li>
            <Link href="/categories">
              <a className="text-gray-600 hover:text-gray-800">Categories</a>
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</a>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
