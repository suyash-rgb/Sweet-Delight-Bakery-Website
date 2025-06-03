import React, { useEffect, useState, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import {
  auth,
  onAuthChange,
  logOut,
} from './firebase.js'

import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CustomOrders from './pages/CustomOrders.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import NotFound from './pages/NotFound.jsx'
import ChatBot from './components/ChatBot.jsx'

/* Contexts */

const UserContext = createContext()
const CartContext = createContext()

export const useUser = () => useContext(UserContext)
export const useCart = () => useContext(CartContext)

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
  const unsubscribe = onAuthChange((user) => {
    if (user) {
      console.log("User authenticated:", auth.currentUser);
    }
    setUser(user);
  });

  return () => unsubscribe();
}, []);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => setCart([])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                } />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                } />
                <Route path="/custom-orders" element={
                  <RequireAuth>
                    <CustomOrders />
                  </RequireAuth>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
          </div>
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

function RequireAuth({ children }) {
  const { user } = useUser()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function Header() {
  const { user, setUser } = useUser()
  const { cart } = useCart()

  const handleLogout = async () => {
    await logOut()
    setUser(null)
  }

  return (
    <header className="bg-peach shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-3xl font-pacifico text-light-brown hover:text-light-brown/80 transition">
          Sweet Delights
        </Link>
        <nav className="space-x-6 text-light-brown font-semibold uppercase tracking-wide">
          <Link to="/" className="hover:text-light-brown/80">Home</Link>
          <Link to="/products" className="hover:text-light-brown/80">Products</Link>
          <Link to="/custom-orders" className="hover:text-light-brown/80">Custom Orders</Link>
          <Link to="/contact" className="hover:text-light-brown/80">Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-light-brown/80">Dashboard</Link>
              <button onClick={handleLogout} className="hover:text-red-600 transition">Logout</button>
              <span className="ml-4 font-normal text-sm">{user.email}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-light-brown/80">Login</Link>
              <Link to="/signup" className="hover:text-light-brown/80">Sign Up</Link>
            </>
          )}
          <Link to="/cart" className="relative inline-block hover:text-light-brown/80" aria-label="Cart">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-soft-yellow text-light-brown p-6 text-center font-medium">
      <p>© 2024 Sweet Delights Bakery. All rights reserved.</p>
    </footer>
  )
}

export default App;
