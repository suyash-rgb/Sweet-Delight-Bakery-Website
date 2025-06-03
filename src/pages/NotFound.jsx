import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="text-center p-16 text-light-brown">
      <h1 className="text-6xl font-pacifico mb-4">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-peach px-6 py-3 rounded font-semibold hover:bg-soft-yellow transition"
      >
        Go Home
      </Link>
    </section>
  )
}