import React, { useState } from 'react'
import { logIn } from '../firebase.js'
import { useUser } from '../App.jsx'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const { setUser } = useUser()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const userCredential = await logIn(form.email, form.password)
      setUser(userCredential.user)
      navigate('/dashboard')
    } catch (err) {
      setError(`Failed to log in. Please check your credentials. ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-md mx-auto mt-20 bg-cream p-8 rounded-lg shadow-md border border-peach">
      <h1 className="text-4xl font-pacifico text-light-brown mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Login form">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border border-peach rounded p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow"
          aria-label="Email"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="border border-peach rounded p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow"
          aria-label="Password"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-peach text-light-brown rounded py-2 font-semibold hover:bg-soft-yellow transition disabled:opacity-50"
          aria-label="Login"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-6 text-center text-light-brown">
        Don't have an account?{' '}
        <Link to="/signup" className="underline hover:text-soft-yellow transition">
          Sign up
        </Link>
      </p>
    </section>
  )
}