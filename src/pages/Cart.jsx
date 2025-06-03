import React from 'react'
import { useCart } from '../App.jsx'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="text-center text-light-brown">
        <h2 className="text-3xl font-pacifico mb-6">Your cart is empty.</h2>
        <Link
          to="/products"
          className="inline-block bg-peach px-6 py-3 rounded font-semibold hover:bg-soft-yellow transition"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h1 className="text-4xl font-pacifico text-light-brown mb-6">Your Cart</h1>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border border-soft-yellow rounded">
          <thead className="bg-soft-yellow text-light-brown">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Subtotal</th>
              <th className="p-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ id, name, price, quantity }) => (
              <tr key={id} className="border-t border-peach">
                <td className="p-3 text-light-brown font-semibold">{name}</td>
                <td className="p-3">${price.toFixed(2)}</td>
                <td className="p-3">{quantity}</td>
                <td className="p-3">${(price * quantity).toFixed(2)}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => removeFromCart(id)}
                    aria-label={`Remove ${name} from cart`}
                    className="text-red-600 hover:text-red-800 font-bold text-xl leading-none"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <button
          onClick={clearCart}
          className="bg-red-400 hover:bg-red-600 text-white font-semibold rounded px-5 py-2 mb-4 md:mb-0 transition"
          aria-label="Clear cart"
        >
          Clear Cart
        </button>
        <div className="text-2xl font-semibold text-light-brown mb-4 md:mb-0">
          Total: ${totalPrice.toFixed(2)}
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-soft-yellow hover:bg-yellow-300 text-light-brown font-bold rounded px-6 py-3 transition"
          aria-label="Proceed to checkout"
        >
          Proceed to Checkout
        </button>
      </div>
    </section>
  )
}