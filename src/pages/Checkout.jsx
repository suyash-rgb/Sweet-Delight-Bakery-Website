import React, { useState } from 'react'
import { useCart, useUser } from '../App.jsx'
import { addOrder, clearCart as clearCartFn } from '../firebase.js'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)
    try {
      // 1. Send cart and user info to your backend to create a Stripe checkout session
      // This example assumes you have a backend endpoint at /create-checkout-session
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, userId: user.uid }),
      });

      if (!response.ok) throw new Error('Failed to create session')

      const { sessionId } = await response.json()

      // 2. Redirect to Stripe checkout
      const stripe = window.Stripe('YOUR_STRIPE_PUBLIC_KEY')
      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (!error) {
      // Store order in Firestore after successful payment
      await addOrder({ userId: user.uid, cart, totalAmount });
      clearCart(); // Clears the UI cart state
      clearCartFn(); 

      // Redirect user to dashboard after checkout
      navigate('/dashboard');

    } else {
      setError(error.message);
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  if (!user) return <p className="text-light-brown font-semibold">You must be logged in to checkout.</p>

  if (cart.length === 0) return <p className="text-light-brown font-semibold">Your cart is empty.</p>

  return (
    <section className="max-w-xl mx-auto bg-cream rounded-lg p-6 shadow-lg border border-peach">
      <h1 className="text-4xl font-pacifico text-light-brown mb-6 text-center">Checkout</h1>
      <div className="mb-6">
        {cart.map(({ id, name, quantity, price }) => (
          <div key={id} className="flex justify-between border-b border-peach py-2">
            <div>
              <p className="font-semibold text-light-brown">{name} x {quantity}</p>
            </div>
            <p className="font-semibold text-soft-yellow">${(price * quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="text-2xl font-bold text-light-brown mb-6 text-right">
        Total: ${totalAmount.toFixed(2)}
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-peach hover:bg-soft-yellow text-light-brown font-semibold rounded py-3 transition disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay with Stripe'}
      </button>
    </section>
  )
}