import React, { useState } from 'react'

export default function SearchBar({ onSearch, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue)

  function submit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        aria-label="Search books"
        className="flex-1 border rounded px-3 py-2 shadow-sm"
        placeholder="Search books by title, author, ISBN..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
    </form>
  )
}
