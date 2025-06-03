import React, { useState } from 'react'
import { addCustomOrder } from '../firebase.js'

export default function CustomOrders() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    details: '',
    dateNeeded: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, details, dateNeeded } = form
    if (!name || !email || !details || !dateNeeded) {
      setError('Please fill in all required fields.')
      return
    }
    setError(null)
    setLoading(true)

    try {
      await addCustomOrder({
        ...form,
        createdAt: new Date(),
        status: 'Pending',
      })
      setSubmitted(true)
      setForm({
        name: '',
        email: '',
        phone: '',
        details: '',
        dateNeeded: '',
      })
    } catch {
      setError('Failed to send your request. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-xl mx-auto p-6 bg-cream rounded-lg shadow-md border border-peach">
      <h1 className="text-4xl font-pacifico mb-6 text-light-brown">Custom Orders</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Custom order request form">
          <div>
            <label className="block mb-1 font-semibold text-light-brown" htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-peach rounded p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-light-brown" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-peach rounded p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-light-brown" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-peach rounded p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-light-brown" htmlFor="details">
              Order Details *
            </label>
            <textarea
              id="details"
              name="details"
              value={form.details}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-peach rounded p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow resize-y"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-light-brown" htmlFor="dateNeeded">
              Date Needed *
            </label>
            <input
              id="dateNeeded"
              name="dateNeeded"
              type="date"
              value={form.dateNeeded}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-peach rounded p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow"
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-peach text-light-brown rounded py-2 px-6 font-semibold hover:bg-soft-yellow transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Submit Request'}
          </button>
        </form>
      ) : (
        <p className="text-green-700 font-semibold text-lg">
          Thank you for your request! We will contact you soon to discuss the details.
        </p>
      )}
    </section>
  )
}