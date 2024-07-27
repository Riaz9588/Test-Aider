import Link from 'next/link'
import useCartStore from '../store/cartStore'
import Image from 'next/image'
import useToast from '../hooks/useToast'

export default function Cart() {
  const { items, removeItem, clearCart } = useCartStore()
  const { showToast } = useToast()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
              <div className="relative h-16 w-16 flex-shrink-0 bg-gray-200">
                <Image 
                  src={item.thumbnail} 
                  alt={item.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                <button 
                  className="text-red-500 hover:text-red-700 text-sm"
                  onClick={() => {
                    removeItem(item.id)
                    showToast(`${item.title} removed from cart`, 'error')
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg text-gray-800 pt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link href="/checkout">
            <a className="block w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 text-center">
              Checkout
            </a>
          </Link>
          <button 
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 mt-2"
            onClick={() => {
              clearCart()
              showToast('Cart cleared', 'error')
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  )
}
