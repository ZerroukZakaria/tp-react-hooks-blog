import { useState, useEffect, useMemo } from 'react';
import useDebounce from './useDebounce';

function usePosts({
  searchTerm = '',
  tag = '',
  limit = 10,
  infinite = true
} = {}) {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const availableTags = useMemo(() => {

  const tags = posts.flatMap(
    post => post.tags || []
  );

  return [...new Set(tags)];

}, [posts]);

  const fetchPosts = async () => {

    try {

      setLoading(true);
      setError(null);

      let url = 'https://dummyjson.com/posts';

      if (debouncedSearchTerm.trim()) {
        url = `https://dummyjson.com/posts/search?q=${debouncedSearchTerm}`;
      }

      if (tag) {
        url = `https://dummyjson.com/posts/tag/${tag}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des posts');
      }

      const data = await response.json();

      setPosts(data.posts);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchPosts();

  }, [debouncedSearchTerm]);

  return {
    posts,
    loading,
    error,
    availableTags
  };
}

export default usePosts;