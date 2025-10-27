export async function searchBooks(q, page = 1, limit = 20) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Open Library responded with ${res.status}`)
  const data = await res.json()
  return {
    docs: data.docs || [],
    numFound: data.numFound || 0,
  }
}
