
import { useEffect, useReducer } from 'react'
import { favoritesReducer } from './useFavoritesReducer'

const STORAGE_KEY = 'celebrare-favorites'

export default function useFavorites() {
  const [favorites, dispatch] = useReducer(favoritesReducer, [], () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id) => {
    dispatch({ type: 'TOGGLE_FAVORITE', id })
  }

  return { favorites, toggleFavorite }
}
