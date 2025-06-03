import React, { useEffect, useState } from 'react'
import { useUser } from '../App.jsx'
import { fetchUserOrders } from '../firebase.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function Dashboard() {
  const { user } = useUser()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetchUserOrders(user.uid).then((data) => {
      setOrders(data)
      setLoading(false)
    })
  }, [user])

  if (!user) {
    return <p className="text-light-brown font-semibold">Please log in to view your dashboard.</p>
  }

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-pacifico text-light-brown mb-6">Your Dashboard</h1>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-light-brown mb-3">Profile</h2>
        <div className="bg-soft-yellow p-4 rounded-lg shadow-sm">
          <p><strong>Email:</strong> {user.email}</p>
          {/* More profile update fields could be added here */}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-light-brown mb-3">Order History</h2>
        {loading ? (
          <LoadingSpinner />
        ) : orders.length === 0 ? (
          <p className="text-light-brown font-semibold">You have no past orders.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="border border-peach rounded p-4 bg-cream shadow-sm">
                <p className="font-semibold text-light-brown mb-1">Order ID: {order.id}</p>
                <p className="text-light-brown mb-2">Placed: {new Date(order.createdAt?.seconds * 1000).toLocaleString()}</p>
                <div className="max-h-40 overflow-y-auto">
                  {order.cartItems?.map(({ name, quantity, price }, i) => (
                    <div key={i} className="flex justify-between text-light-brown mb-1">
                      <span>{name} x {quantity}</span>
                      <span>${(price * quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <p className="font-semibold text-light-brown mt-2">
                  Total: ${order.totalAmount?.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}