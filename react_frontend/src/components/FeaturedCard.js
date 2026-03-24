import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { getBadgeStyle } from './BlogCard';
import './FeaturedCard.css';

/**
 * FeaturedCard - Wide horizontal card for the featured/second blog section.
 * Matches Figma node 1:140 (image-left + content-right, gap 32px).
 *
 * @param {Object} props
 * @param {Object} props.post - Post data object
 */
// PUBLIC_INTERFACE
function FeaturedCard({ post }) {
  const { toggleLike, toggleBookmark, deletePost, setTagFilter } = useBlog();
  const navigate = useNavigate();

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    setTagFilter(tag);
    navigate('/');
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
      navigate('/');
    }
  };

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
  const authorLine = `${post.author} • ${formattedDate}`;

  return (
    <article className="tb-featured-card" aria-label={`Featured post: ${post.title}`}>
      <Link to={`/post/${post.id}`} className="tb-featured-card__image-link" tabIndex="-1" aria-hidden="true">
        <div
          className="tb-featured-card__image"
          style={post.image ? { backgroundImage: `url(${post.image})` } : undefined}
          role="img"
          aria-label={`Cover image for ${post.title}`}
        />
      </Link>

      <div className="tb-featured-card__content">
        <div className="tb-featured-card__heading-group">
          <p className="tb-featured-card__author">{authorLine}</p>
          <div className="tb-featured-card__title-row">
            <h2 className="tb-featured-card__title">
              <Link to={`/post/${post.id}`} className="tb-featured-card__title-link">{post.title}</Link>
            </h2>
            <Link to={`/post/${post.id}`} className="tb-featured-card__arrow-link" aria-label={`Read ${post.title}`}>
              <svg width="24" height="24" viewBox="0 0 24 28" fill="none" aria-hidden="true">
                <path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <p className="tb-featured-card__excerpt">{post.excerpt}</p>
        </div>

        <div className="tb-featured-card__badges" aria-label="Post categories">
          {post.tags.slice(0, 3).map(tag => {
            const s = getBadgeStyle(tag);
            return (
              <button key={tag} className="tb-badge" style={{ backgroundColor: s.bg, color: s.color }}
                onClick={(e) => handleTagClick(e, tag)} aria-label={`Filter by ${tag}`}>
                {tag}
              </button>
            );
          })}
        </div>

        <div className="tb-featured-card__actions" aria-label="Post actions">
          <button
            className={`tb-card-action-btn${post.likedByUser ? ' tb-like-btn--active' : ''}`}
            onClick={() => toggleLike(post.id)}
            aria-label={`${post.likedByUser ? 'Unlike' : 'Like'} (${post.likes})`}
            aria-pressed={post.likedByUser}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={post.likedByUser ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{post.likes}</span>
          </button>
          <button
            className={`tb-card-action-btn${post.bookmarked ? ' tb-bookmark-btn--active' : ''}`}
            onClick={() => toggleBookmark(post.id)}
            aria-label={post.bookmarked ? 'Remove bookmark' : 'Bookmark'}
            aria-pressed={post.bookmarked}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={post.bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button className="tb-card-action-btn tb-delete-btn" onClick={handleDelete} aria-label="Delete post">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default FeaturedCard;
