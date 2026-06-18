import React, { useState } from 'react';

function PostSearch({
  onSearch,
  onTagSelect,
  availableTags = [],
  selectedTag = ''
}) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchInput(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearchInput('');

    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="mb-4">

      <div className="row">

        <div className="col-md-8">

          <div className="input-group">

            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Rechercher des articles..."
              value={searchInput}
              onChange={handleSearchChange}
            />

            {searchInput && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={clearSearch}
              >
                ✕
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default PostSearch;