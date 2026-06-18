import React from 'react';
// TODO: Exercice 3 - Importer useTheme

/**
 * Composant d'affichage détaillé d'un post
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.post - Le post à afficher
 * @param {Function} props.onClose - Fonction pour fermer les détails
 * @param {Function} props.onTagClick - Fonction appelée lors du clic sur un tag
 */
function PostDetails({ post, onClose, onTagClick }) {
  // TODO: Exercice 3 - Utiliser le hook useTheme
  
  // TODO: Exercice 3 - Utiliser useMemo pour calculer les classes CSS
  const themeClasses = {
    card: '',
    badge: '',
    button: ''
  };
  
  if (!post) return null;
  
  return (
<div className="card-body">

  <p className="card-text">
    {post.body}
  </p>

  <hr />

  <div className="mb-3">

    <strong>Utilisateur:</strong>
    {' '}
    {post.userId}

  </div>

  <div className="mb-3">

    👍 {post.reactions?.likes ?? 0}
    {' '}
    | 👎 {post.reactions?.dislikes ?? 0}

  </div>

  <div>

    {post.tags?.map((tag) => (

      <span
        key={tag}
        className="badge bg-primary me-2"
        style={{ cursor: 'pointer' }}
        onClick={() => onTagClick?.(tag)}
      >
        {tag}
      </span>

    ))}

  </div>

</div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostDetails);