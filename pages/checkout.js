import { useState } from 'react'
import { useRouter } from 'next/router'
import useCartStore from '../store/cartStore'

export default function Checkout() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const router = useRouter()
  const { items, clearCart } = useCartStore()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the order to a backend
    alert('Order placed successfully!')
    clearCart()
    router.push('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-bold">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-bold">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="address" className="block mb-2 font-bold">Address</label>
              <textarea
                id="address"
                className="w-full px-3 py-2 border rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Place Order
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.title} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
