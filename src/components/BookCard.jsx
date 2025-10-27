import React from 'react'

function coverUrl(book) {
  if (book.cover_i) return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
  const isbn = book.isbn && book.isbn[0]
  if (isbn) return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
  return null
}

export default function BookCard({ book, onFavorite, onUnfavorite, isFavorited }) {
  const img = coverUrl(book)
  const title = book.title || 'Untitled'
  const authors = book.author_name ? book.author_name.join(', ') : (book.authors ? book.authors.map(a=>a.name).join(', ') : 'Unknown author')
  const year = book.first_publish_year || book.publish_year && book.publish_year[0] || ''

  return (
    <article className="flex gap-4 bg-white rounded p-4 shadow-sm">
      <div className="w-24 flex-none">
        {img ? (
          <img src={img} alt={`${title} cover`} className="object-cover w-24 h-32 rounded" />
        ) : (
          <div className="w-24 h-32 bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded">No cover</div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            {isFavorited ? (
              <button onClick={onUnfavorite} aria-label="Remove favorite" className="text-sm">💔</button>
            ) : (
              <button onClick={onFavorite} aria-label="Add favorite" className="text-sm">⭐</button>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-600">{authors}</div>
        <div className="text-xs text-gray-500 mt-2">{book.subject ? book.subject.slice(0, 5).join(', ') : ''}</div>
        <div className="text-xs text-gray-400 mt-3">First published: {year || '—'}</div>
        <a
          className="inline-block mt-3 text-sm text-blue-600"
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noreferrer"
        >
          View on Open Library
        </a>
      </div>
    </article>
  )
}
