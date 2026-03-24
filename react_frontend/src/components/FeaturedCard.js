import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { getBadgeStyle } from './BlogCard';
import './FeaturedCard.css';

/**
 * FeaturedCard - Wide horizontal card for the featured blog section.
 * Matches Figma node 1:140 (layout_DLJIQ3):
 *   - row, fill, gap 32px
 *   - Image: layout_UPJ4IB fill width, height 246px
 *   - Content (layout_87XOK4): column, stretch, fill, gap 24px
 *
 * Contract:
 *   - Input: post object
 *   - Output: article JSX
 *   - Side effects: navigate on delete, context calls for like/bookmark/delete
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
      {/* Image: layout_UPJ4IB fill width, height 246px */}
      <Link to={`/post/${post.id}`} className="tb-featured-card__image-link" tabIndex="-1" aria-hidden="true">
        {post.image ? (
          <img
            className="tb-featured-card__image"
            src={post.image}
            alt={`Cover image for ${post.title}`}
          />
        ) : (
          <div
            className="tb-featured-card__image tb-featured-card__image--placeholder"
            role="img"
            aria-label={`Cover image for ${post.title}`}
          />
        )}
      </Link>

      {/* Content: layout_87XOK4 column, stretch, fill, gap 24px */}
      <div className="tb-featured-card__content">
        {/* Heading group: layout_OPQ78S column, stretch, gap 12px */}
        <div className="tb-featured-card__heading-group">
          {/* Author: Text sm/Semibold #6941C6 */}
          <p className="tb-featured-card__author">{authorLine}</p>
          {/* Heading + icon: layout_OIVI4I row, fill, gap 16px */}
          <div className="tb-featured-card__title-row">
            <h2 className="tb-featured-card__title">
              <Link to={`/post/${post.id}`} className="tb-featured-card__title-link">{post.title}</Link>
            </h2>
            {/* Icon wrap: layout_B9TBFM column, padding 4px 0 0 */}
            <Link to={`/post/${post.id}`} className="tb-featured-card__arrow-link" aria-label={`Read ${post.title}`}>
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          {/* Supporting text: Text md/Normal #667085 */}
          <p className="tb-featured-card__excerpt">{post.excerpt}</p>
        </div>

        {/* Categories: layout_A98Z4R row, fill, gap 8px */}
        <div className="tb-featured-card__badges" aria-label="Post categories">
          {post.tags.slice(0, 3).map(tag => {
            const s = getBadgeStyle(tag);
            return (
              <button
                key={tag}
                className="tb-badge"
                style={{ backgroundColor: s.bg, color: s.color }}
                onClick={(e) => handleTagClick(e, tag)}
                aria-label={`Filter by ${tag}`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Action buttons row */}
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
