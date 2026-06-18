import { useState, useEffect } from 'react';

function usePosts({
  searchTerm = '',
  tag = '',
  limit = 10,
  infinite = true
} = {}) {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {

    try {

      setLoading(true);
      setError(null);

      let url = 'https://dummyjson.com/posts';

      if (searchTerm.trim()) {
        url = `https://dummyjson.com/posts/search?q=${searchTerm}`;
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

  }, [searchTerm]);

  return {
    posts,
    loading,
    error
  };
}

export default usePosts;