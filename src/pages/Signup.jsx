import React, { useState } from 'react'
import { signUp } from '../firebase.js'
import { useUser } from '../App.jsx'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const { setUser } = useUser()
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const userCredential = await signUp(form.email, form.password)
      setUser(userCredential.user)
      navigate('/dashboard')
    } catch (err) {
      setError(`Failed to sign up. Email might be already in use. ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-md mx-auto mt-20 bg-cream p-8 rounded-lg shadow-md border border-peach">
      <h1 className="text-4xl font-pacifico text-light-brown mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Signup form">
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
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="border border-peach rounded p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow"
          aria-label="Confirm Password"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-peach text-light-brown rounded py-2 font-semibold hover:bg-soft-yellow transition disabled:opacity-50"
          aria-label="Sign up"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-6 text-center text-light-brown">
        Already have an account?{' '}
        <Link to="/login" className="underline hover:text-soft-yellow transition">
          Login
        </Link>
      </p>
    </section>
  )
}