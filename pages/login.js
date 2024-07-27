import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useToast from '../hooks/useToast'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { showToast } = useToast()

  useEffect(() => {
    // Check if user is already logged in
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
      router.push('/')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // This is a simplified login. In a real app, you'd validate against a backend.
    if (username === 'user' && password === 'password') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true')
      }
      showToast('Login successful', 'success')
      router.push('/')
    } else {
      showToast('Invalid credentials', 'error')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6 text-center">
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}
