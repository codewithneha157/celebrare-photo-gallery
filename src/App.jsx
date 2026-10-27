

import { useCallback, useMemo, useState } from 'react'
import useFetchPhotos from './useFetchPhotos'
import useFavorites from './useFavorites'

function App() {
  const { photos, loading, error } = useFetchPhotos()
  const { favorites, toggleFavorite } = useFavorites()
  const [search, setSearch] = useState('')

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    )
  }, [photos, search])

  return (
    <main className="min-h-screen bg-gray-100 p-5 sm:p-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">
        Celebrare Photo Gallery
      </h1>

      <input
        type="text"
        placeholder="Search by author..."
        value={search}
        onChange={handleSearch}
        className="mx-auto mb-8 block w-full max-w-md rounded-lg border bg-white p-3"
      />

      {loading && (
        <p className="text-center text-lg">Loading photos...</p>
      )}

      {error && (
        <p className="text-center text-red-600">
          Error: {error}. Please refresh the page.
        </p>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="text-center">No photos found.</p>
      )}

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => {
          const isFavorite = favorites.includes(photo.id)

          return (
            <article
              key={photo.id}
              className="overflow-hidden rounded-xl bg-white shadow"
            >
              <img
                src={photo.download_url}
                alt={`Photo by ${photo.author}`}
                loading="lazy"
                className="h-56 w-full object-cover"
              />

              <div className="flex items-center justify-between gap-2 p-4">
                <p className="font-medium">{photo.author}</p>

                <button
                  type="button"
                  onClick={() => toggleFavorite(photo.id)}
                  aria-label={
                    isFavorite ? 'Remove from favourites' : 'Add to favourites'
                  }
                  aria-pressed={isFavorite}
                  className={`text-2xl ${
                    isFavorite ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  {isFavorite ? '♥' : '♡'}
                </button>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default App
