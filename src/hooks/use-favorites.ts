import { useLocalStorage } from './use-local-storage';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>('devnest_favorites', []);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev: string[]) => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId);
      } else {
        return [...prev, toolId];
      }
    });
  };

  const isFavorite = (toolId: string): boolean => {
    return favorites.includes(toolId);
  };

  const addFavorite = (toolId: string) => {
    if (!favorites.includes(toolId)) {
      setFavorites((prev: string[]) => [...prev, toolId]);
    }
  };

  const removeFavorite = (toolId: string) => {
    setFavorites((prev: string[]) => prev.filter(id => id !== toolId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };
}
