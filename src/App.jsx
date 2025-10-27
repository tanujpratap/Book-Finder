import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import BookCard from './components/BookCard'
import Pagination from './components/Pagination'
import { searchBooks } from './services/openLibrary'

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('bf:favorites')
      return raw ? JSON.parse(raw) : []
    } catch (e) { return [] }
  })

  useEffect(() => {
    try {
      localStorage.setItem('bf:favorites', JSON.stringify(favorites))
    } catch (e) {}
  }, [favorites])

  function add(book) {
    setFavorites((s) => {
      if (s.find((b)=>b.key===book.key)) return s
      return [book, ...s]
    })
  }
  function remove(bookKey) {
    setFavorites((s) => s.filter(b => b.key !== bookKey))
  }
  return { favorites, add, remove }
}

export default function App() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [numFound, setNumFound] = useState(0)
  const [view, setView] = useState('search') // 'search' or 'favorites'
  const LIMIT = 20

  const fav = useFavorites()

  useEffect(() => {
    if (view === 'favorites') return
    if (!query) {
      setBooks([])
      setNumFound(0)
      return
    }

    setLoading(true)
    setError(null)

    searchBooks(query, page, LIMIT)
      .then(({ docs, numFound }) => {
        setBooks(docs)
        setNumFound(numFound)
      })
      .catch((err) => setError(err.message || 'Failed to fetch'))
      .finally(() => setLoading(false))
  }, [query, page, view])

  function handleSearch(q) {
    setQuery(q)
    setPage(1)
    setView('search')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Book Finder</h1>
            <p className="text-sm text-gray-600">Search the Open Library catalog for books and authors.</p>
          </div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-2 rounded ${view==='search' ? 'bg-blue-600 text-white' : 'border'}`}
              onClick={() => setView('search')}
            >
              Search
            </button>
            <button
              className={`px-3 py-2 rounded ${view==='favorites' ? 'bg-yellow-400' : 'border'}`}
              onClick={() => setView('favorites')}
            >
              Favorites ({fav.favorites.length})
            </button>
          </div>
        </header>

        {view === 'search' && <SearchBar onSearch={handleSearch} defaultValue={query} />}

        <main className="mt-6">
          {view === 'search' && (
            <>
              {loading && <p className="text-gray-700">Loading…</p>}
              {error && <p className="text-red-600">{error}</p>}

              {!loading && !error && books.length === 0 && query && (
                <p className="text-gray-700">No results found for "{query}".</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {books.map((b) => (
                  <BookCard
                    key={`${b.key}-${b.cover_i || 'no-cover'}`}
                    book={b}
                    onFavorite={() => fav.add(b)}
                    isFavorited={!!fav.favorites.find(f=>f.key===b.key)}
                  />
                ))}
              </div>

              {numFound > LIMIT && (
                <div className="mt-6">
                  <Pagination
                    current={page}
                    total={Math.ceil(numFound / LIMIT)}
                    onChange={(p) => setPage(p)}
                  />
                </div>
              )}
            </>
          )}

          {view === 'favorites' && (
            <div>
              {fav.favorites.length === 0 ? (
                <p className="text-gray-600">You have no favorites yet. Click the ⭐ on any book to save it here.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fav.favorites.map(b => (
                    <BookCard
                      key={b.key}
                      book={b}
                      onUnfavorite={() => fav.remove(b.key)}
                      isFavorited={true}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {!query && view === 'search' && (
            <div className="mt-12 text-gray-600">Tip: try searching for an author, title, or keyword (e.g., "tolstoy" or "data science").</div>
          )}
        </main>

        <footer className="mt-12 text-xs text-gray-500">Data from Open Library (openlibrary.org)</footer>
      </div>
    </div>
  )
}
