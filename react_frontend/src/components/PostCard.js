import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import './PostCard.css';

/**
 * PostCard component - Displays a blog post in card format
 * @param {Object} post - The post object to display
 * @param {string} post.id - Unique post identifier
 * @param {string} post.title - Post title
 * @param {string} post.excerpt - Short description
 * @param {string} post.author - Author name
 * @param {string} post.publishDate - Publication date
 * @param {Array} post.tags - Array of tag strings
 * @param {number} post.likes - Number of likes
 * @param {boolean} post.bookmarked - Whether bookmarked by user
 * @param {boolean} post.likedByUser - Whether liked by user
 */
function PostCard({ post }) {
  const { toggleLike, toggleBookmark, deletePost, setTagFilter } = useBlog();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit/${post.id}`);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(post.id);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(post.id);
  };

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    setTagFilter(tag);
    navigate('/');
  };

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const readTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <article className="post-card" aria-label={`Blog post: ${post.title}`}>
      {post.image && (
        <Link to={`/post/${post.id}`} className="post-card-image-link" tabIndex="-1" aria-hidden="true">
          <div
            className="post-card-image"
            style={{ backgroundImage: `url(${post.image})` }}
            role="img"
            aria-label={`Image for ${post.title}`}
          />
        </Link>
      )}

      <div className="post-card-body">
        {/* Tags */}
        <div className="post-card-tags" aria-label="Post tags">
          {post.tags.slice(0, 3).map(tag => (
            <button
              key={tag}
              className="post-tag"
              onClick={(e) => handleTagClick(e, tag)}
              aria-label={`Filter by tag: ${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Title */}
        <h2 className="post-card-title">
          <Link to={`/post/${post.id}`} className="post-card-title-link">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="post-card-excerpt">{post.excerpt}</p>

        {/* Meta */}
        <div className="post-card-meta">
          <div className="post-card-author">
            <span className="post-card-avatar" aria-hidden="true">
              {post.author.charAt(0).toUpperCase()}
            </span>
            <div>
              <span className="post-card-author-name">{post.author}</span>
              <span className="post-card-date">
                {formattedDate} · {readTime} min read
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="post-card-actions">
          <div className="post-card-actions-left">
            <button
              className={`post-action-btn like-btn ${post.likedByUser ? 'active' : ''}`}
              onClick={handleLike}
              aria-label={post.likedByUser ? `Unlike post (${post.likes} likes)` : `Like post (${post.likes} likes)`}
              aria-pressed={post.likedByUser}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={post.likedByUser ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{post.likes}</span>
            </button>

            <button
              className={`post-action-btn bookmark-btn ${post.bookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
              aria-label={post.bookmarked ? 'Remove bookmark' : 'Bookmark post'}
              aria-pressed={post.bookmarked}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={post.bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>

          <div className="post-card-actions-right">
            <button
              className="post-action-btn edit-btn"
              onClick={handleEdit}
              aria-label={`Edit post: ${post.title}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>

            <button
              className="post-action-btn delete-btn"
              onClick={handleDelete}
              aria-label={`Delete post: ${post.title}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
