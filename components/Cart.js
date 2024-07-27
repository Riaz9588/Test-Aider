import useCartStore from '../store/cartStore'

export default function Cart() {
  const { items, removeItem, clearCart } = useCartStore()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span>{item.title} (x{item.quantity})</span>
              <div>
                <span className="mr-2">${(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded">Checkout</button>
          <button 
            className="w-full bg-red-500 text-white py-2 rounded"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  )
}
