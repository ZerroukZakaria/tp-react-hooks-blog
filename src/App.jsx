import React, { useState, useCallback } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostSearch from './components/PostSearch';
import usePosts from './hooks/usePosts';
import useLocalStorage from './hooks/useLocalStorage';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';
// TODO: Exercice 3 - Importer ThemeToggle
// TODO: Exercice 3 - Importer ThemeProvider et useTheme
// TODO: Exercice 1 - Importer le hook usePosts
// TODO: Exercice 2 - Importer le hook useLocalStorage

function App() {
  // État local pour la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [infiniteScroll, setInfiniteScroll] =
  useLocalStorage('infiniteScroll', true);
  const { theme } = useTheme();
  // TODO: Exercice 4 - Ajouter l'état pour le tag sélectionné
  
  const {
    posts,
    loading,
    error
  } = usePosts({
    searchTerm
  });
    
  // TODO: Exercice 2 - Utiliser useLocalStorage pour le mode de défilement
  
  // TODO: Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  
  // Gestionnaire pour la recherche
const handleSearchChange = useCallback((term) => {
  setSearchTerm(term);
}, []);
  
  // TODO: Exercice 4 - Ajouter le gestionnaire pour la sélection de tag
  
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
        <PostSearch onSearch={handleSearchChange} />
        
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}        
        {/* TODO: Exercice 4 - Ajouter le composant PostDetails */}
        
        {/* TODO: Exercice 1 - Passer les props nécessaires à PostList */}
        <PostList
          posts={posts}
          loading={loading}
          infiniteScroll={infiniteScroll}
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
