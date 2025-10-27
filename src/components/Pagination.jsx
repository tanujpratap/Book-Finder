import React from 'react'

export default function Pagination({ current = 1, total = 1, onChange }) {
  if (total <= 1) return null
  const range = []
  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)
  for (let i = start; i <= end; i++) range.push(i)

  return (
    <nav className="flex items-center gap-2">
      <button
        className="px-3 py-1 border rounded"
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
      >
        Prev
      </button>

      {start > 1 && (
        <button className="px-2 py-1" onClick={() => onChange(1)}>1</button>
      )}

      {start > 2 && <span className="px-2">…</span>}

      {range.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded ${p === current ? 'bg-blue-600 text-white' : 'border'}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      {end < total - 1 && <span className="px-2">…</span>}

      {end < total && (
        <button className="px-2 py-1" onClick={() => onChange(total)}>{total}</button>
      )}

      <button
        className="px-3 py-1 border rounded"
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
      >
        Next
      </button>
    </nav>
  )
}
