import React, { useState } from 'react'

const COMMON_QUERIES = {
  'What are your opening hours?': 'We are open from 8 AM to 8 PM every day!',
  'Do you offer gluten-free options?': 'Yes, we have a variety of gluten-free baked goods!',
  'Can I customize a cake?': 'Absolutely! Visit our Custom Orders page to make your request.',
  'Where are you located?': 'Find us on the Contact page with map and address details.',
  'How do I track my order?': 'Log in and go to your dashboard to track your orders.',
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [chat, setChat] = useState([{ sender: 'bot', text: 'Hi! How can I help you today?' }])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const userText = input.trim()
    setChat((prev) => [...prev, { sender: 'user', text: userText }])

    // Simple matching response
    let response = 'Sorry, I am still learning. Please contact us directly for detailed help.'
    for (const q in COMMON_QUERIES) {
      if (userText.toLowerCase().includes(q.toLowerCase())) {
        response = COMMON_QUERIES[q]
        break
      }
    }
    setTimeout(() => {
      setChat((prev) => [...prev, { sender: 'bot', text: response }])
    }, 800)

    setInput('')
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-cream border border-peach rounded-lg shadow-lg flex flex-col overflow-hidden z-50">
          <div className="bg-peach p-3 flex justify-between items-center font-pacifico text-light-brown text-lg">
            Sweet Delights Chat
            <button className="font-bold text-xl" onClick={() => setOpen(false)}>&times;</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-cream">
            {chat.map((msg, i) => (
              <div key={i} className={`max-w-[75%] p-2 rounded-md ${msg.sender === 'bot' ? 'bg-soft-yellow text-light-brown self-start' : 'bg-peach text-light-brown self-end'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-2 bg-cream flex gap-2 border-t border-peach">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow rounded border border-peach p-1 outline-none"
              placeholder="Ask me anything..."
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
              aria-label="Chat input"
            />
            <button onClick={handleSend} className="bg-peach px-3 py-1 rounded text-light-brown font-semibold hover:bg-soft-yellow transition">Send</button>
          </div>
        </div>
      )}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-6 right-6 bg-peach text-light-brown rounded-full p-4 text-2xl shadow-lg hover:bg-soft-yellow transition z-50"
        >
          💬
        </button>
      )}
    </>
  )
}