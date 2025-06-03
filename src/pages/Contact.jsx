import React, { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Basic validation
    if (!form.name || !form.email || !form.message) {
      setError('Please fill all fields.')
      return
    }
    setError(null)

    // Mock submission - here you can integrate e.g. send to Firebase or email service
    setTimeout(() => {
      setSubmitted(true)
    }, 1000)
  }

  return (
    <section className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 p-4">
      <div className="flex-1">
        <h1 className="text-4xl font-pacifico text-light-brown mb-6">Contact Us</h1>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Contact form">
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold text-light-brown">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded border border-peach p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-semibold text-light-brown">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded border border-peach p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-semibold text-light-brown">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full rounded border border-peach p-2 focus:outline-none focus:ring-2 focus:ring-soft-yellow resize-y"
              ></textarea>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              className="bg-peach text-light-brown rounded py-2 px-6 font-semibold hover:bg-soft-yellow transition"
            >
              Send Message
            </button>
          </form>
        ) : (
          <p className="text-green-600 font-semibold text-lg">Thank you for reaching out! We will respond shortly.</p>
        )}
      </div>
      <div className="flex-1 rounded-lg overflow-hidden shadow-md border border-peach" aria-label="Map showing Sweet Delights Bakery location">
        <iframe
          title="Sweet Delights Bakery Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.6528229209787!2d-122.4194151846819!3d37.774929779759115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085817c8a23d9ef%3A0xe685c4bddd2f1877!2sBakery!5e0!3m2!1sen!2sus!4v1686552398720!5m2!1sen!2sus"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  )
}