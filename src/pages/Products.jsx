import React, { useEffect, useState } from 'react'
import { fetchProducts, subscribeStockUpdates } from '../firebase.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useCart } from '../App.jsx'

const categories = ['All', 'Cake', 'Pastry', 'Cookie', 'Cupcake']

export default function Products() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [stock, setStock] = useState({})
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
      .then((items) => {
        setProducts(items)
        setFiltered(items)
      })
      .finally(() => setLoading(false))

    const unsubscribe = subscribeStockUpdates((items) => {
      const stockMap = {}
      items.forEach((item) => {
        stockMap[item.id] = item.stock || 0
      })
      setStock(stockMap)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (category === 'All') {
      setFiltered(products)
    } else {
      setFiltered(products.filter((p) => p.category === category))
    }
  }, [category, products])

  return (
    <section>
      <h1 className="text-4xl font-pacifico text-light-brown mb-6">Our Baked Goods</h1>
      <div className="mb-6">
        <label htmlFor="category" className="font-semibold mr-3 text-light-brown">
          Filter by Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-peach rounded px-3 py-1"
          aria-label="Filter products by category"
        >
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <p className="text-light-brown font-semibold">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((product) => {
            const inStock = stock[product.id] > 0
            return (
              <div
                key={product.id}
                className="bg-cream rounded-lg shadow-md p-4 flex flex-col"
                tabIndex={0}
                aria-label={`${product.name} - $${product.price.toFixed(2)}. ${inStock ? 'In stock' : 'Out of stock'}`}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="rounded-t-lg w-full h-48 object-cover mb-3"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold text-light-brown mb-1 flex-grow">{product.name}</h3>
                <p className="text-soft-yellow font-semibold mb-1">${product.price.toFixed(2)}</p>
                <p className="text-light-brown text-sm mb-3">{product.description}</p>
                <p className={`mb-4 font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                <button
                  disabled={!inStock}
                  onClick={() => addToCart(product, 1)}
                  className={`bg-peach text-light-brown font-semibold rounded py-2 hover:bg-soft-yellow ${
                    inStock ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  } transition`}
                  aria-disabled={!inStock}
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to cart
                </button>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}