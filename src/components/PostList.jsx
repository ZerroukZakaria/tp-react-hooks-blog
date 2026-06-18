import React, { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true
}) {



  
  const handlePostClick = (post) => {
    if (onPostClick) {
      onPostClick(post);
    }
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation();

    if (onTagClick) {
      onTagClick(tag);
    }
  };


  const [loadMoreRef, isIntersecting] =
  useIntersectionObserver({
    enabled: infiniteScroll
  });


useEffect(() => {

  if (
    isIntersecting &&
    hasMore &&
    onLoadMore
  ) {
    onLoadMore();
  }

}, [
  isIntersecting,
  hasMore,
  onLoadMore
]);

  

  if (!loading && posts.length === 0) {
    return (
      <div className="alert alert-info">
        Aucun article trouvé.
      </div>
    );
  }

  return (
    <div className="post-list">

      <div className="row">

        {posts.map((post) => (

          <div
            key={post.id}
            className="col-md-6 mb-4"
          >

            <div
              className="card h-100"
              onClick={() => handlePostClick(post)}
            >

              <div className="card-body">

                <h5 className="card-title">
                  {post.title}
                </h5>

                <p className="card-text">
                  {post.body.substring(0, 120)}...
                </p>

                <div className="d-flex flex-wrap gap-2">

                  {post.tags.map((tag) => (

                    <span
                      key={tag}
                      className="badge bg-primary"
                      onClick={(e) =>
                        handleTagClick(e, tag)
                      }
                    >
                      {tag}
                    </span>

                  ))}

                </div>

              </div>

<div className="card-footer">

  <small className="text-muted">

    👍 {post.reactions?.likes || 0}

    {' · '}

    👎 {post.reactions?.dislikes || 0}

  </small>

</div>

            </div>

          </div>

        ))}

      </div>

      {loading && <LoadingSpinner />}

      {!infiniteScroll && hasMore && (
        <div className="text-center my-4">

          <button
            className="btn btn-primary"
            onClick={onLoadMore}
          >
            Charger plus
          </button>

        </div>
      )}

      <div ref={loadMoreRef}></div>

    </div>
  );
}

export default React.memo(PostList);