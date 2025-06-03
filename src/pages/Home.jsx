import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../firebase.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

const featuredIds = ['cake-1', 'cookie-2', 'cupcake-3'] // example product IDs to feature (replace with your DB IDs)

const testimonials = [
  {
    name: 'Anna M.',
    comment: "The cakes here are heavenly! Sweet Delights is my go-to bakery.",
    img: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    name: 'John D.',
    comment: 'Super friendly staff and amazing pastries every time.',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Lily K.',
    comment: 'Custom cakes that look beautiful and taste even better. Highly recommend!',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        const featuredProducts = products.filter((p) => featuredIds.includes(p.id))
        setFeatured(featuredProducts)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      {/* Welcome Banner */}
      <div className="bg-peach rounded-xl p-12 text-center text-light-brown mb-10 shadow-lg">
        <h1 className="text-5xl font-pacifico mb-4 drop-shadow-sm">Welcome to Sweet Delights Bakery!</h1>
        <p className="text-xl max-w-2xl mx-auto font-semibold">
          Discover our delightful variety of cakes, cookies, and pastries made fresh daily with love.
        </p>
      </div>

      {/* Featured Products */}
      <h2 className="text-3xl font-pacifico text-light-brown mb-6">Featured Baked Goods</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {featured.map((product) => (
            <div
              key={product.id}
              tabIndex={0}
              className="bg-cream rounded-lg shadow-md p-4 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              aria-label={`${product.name} - $${product.price.toFixed(2)}`}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                className="rounded-t-lg w-full h-48 object-cover mb-3"
              />
              <h3 className="text-xl font-semibold text-light-brown mb-1">{product.name}</h3>
              <p className="text-soft-yellow font-semibold mb-2">${product.price.toFixed(2)}</p>
              <p className="text-light-brown text-sm">{product.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Testimonials */}
      <h2 className="text-3xl font-pacifico text-light-brown mb-6">What Our Happy Customers Say</h2>
      <div className="flex flex-col md:flex-row md:space-x-6 gap-8">
        {testimonials.map(({ name, comment, img }, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-soft-yellow rounded-lg p-6 shadow-md cursor-default hover:scale-105 transition-transform"
            tabIndex={0}
            aria-label={`Testimonial by ${name}`}
          >
            <img
              src={img}
              alt={`Picture of ${name}`}
              className="w-20 h-20 rounded-full mb-4 object-cover"
              loading="lazy"
            />
            <p className="text-center text-light-brown italic mb-2">"{comment}"</p>
            <p className="font-semibold text-light-brown">{name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}