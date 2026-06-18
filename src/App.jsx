import React, { useState, useCallback } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostSearch from './components/PostSearch';
import usePosts from './hooks/usePosts';
import useLocalStorage from './hooks/useLocalStorage';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';
import PostDetails from './components/PostDetails';

function App() {
  const [selectedPost, setSelectedPost] = useState(null);  const [searchTerm, setSearchTerm] = useState('');
  const [infiniteScroll, setInfiniteScroll] =
  useLocalStorage('infiniteScroll', true);
  const { theme } = useTheme();
  const [selectedTag, setSelectedTag] = useState('');
  
  const {
    posts,
    loading,
    error,
    availableTags
  } = usePosts({
    searchTerm,
    tag: selectedTag
  });
    

const handleSearchChange = useCallback((term) => {
  setSearchTerm(term);
}, []);

const handlePostClick = (post) => {
  setSelectedPost(post);
};

const handleTagSelect = (tag) => {
  setSelectedTag(tag);
};
  
  
  return (
    <div
      className={`container py-4 ${
        theme === 'dark'
          ? 'bg-dark text-light'
          : 'bg-light text-dark'
      }`}
    >
      <header className="pb-3 mb-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-5 fw-bold">Blog</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main>
        <div className="mb-3">

        <button
          className="btn btn-outline-primary"
          onClick={() =>
            setInfiniteScroll(!infiniteScroll)
          }
        >
          Mode :
          {' '}
          {infiniteScroll
            ? 'Défilement infini'
            : 'Bouton Charger plus'}
        </button>

      </div>
          <PostSearch
            onSearch={handleSearchChange}
            onTagSelect={handleTagSelect}
            availableTags={availableTags}
            selectedTag={selectedTag}
          />
                  
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}        
        <PostDetails
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onTagClick={handleTagSelect}
        />
        <PostList
          posts={posts}
          loading={loading}
          onPostClick={handlePostClick}
          onTagClick={handleTagSelect}
        />
      </main>
      
      <footer className="pt-3 mt-4 text-center border-top">
        <p>
          TP React Hooks - Blog &middot; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
