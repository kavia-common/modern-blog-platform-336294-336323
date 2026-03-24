import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import './BlogCard.css';

/**
 * BADGE_STYLES - Figma design token color mapping for category badges.
 * Matches Figma fill tokens: fill_EKYITE (#F9F5FF/#6941C6), fill_ZOM8PA (#EEF4FF/#3538CD), etc.
 * Keys are lowercase tag names; values are { bg, color } pairs.
 */
const BADGE_STYLES = {
  design:                 { bg: '#F9F5FF', color: '#6941C6' },
  research:               { bg: '#EEF4FF', color: '#3538CD' },
  presentation:           { bg: '#FDF2FA', color: '#C11574' },
  interface:              { bg: '#FDF2FA', color: '#C11574' },
  leadership:             { bg: '#F9F5FF', color: '#6941C6' },
  management:             { bg: '#F8F9FC', color: '#363F72' },
  product:                { bg: '#F0F9FF', color: '#026AA2' },
  frameworks:             { bg: '#FFF6ED', color: '#C4320A' },
  tools:                  { bg: '#FDF2FA', color: '#C11574' },
  saas:                   { bg: '#FFF1F3', color: '#C01048' },
  podcasts:               { bg: '#F9F5FF', color: '#6941C6' },
  'customer success':     { bg: '#F8F9FC', color: '#363F72' },
  'software development': { bg: '#ECFDF3', color: '#027A48' },
};

/**
 * getBadgeStyle - Returns Figma badge colors for a given tag string.
 * Falls back to purple theme (#F9F5FF/#6941C6) for unknown categories.
 *
 * Contract:
 *   - Input: tag string (case-insensitive)
 *   - Output: { bg: string, color: string }
 *   - No side effects
 *
 * @param {string} tag
 * @returns {{ bg: string, color: string }}
 */
// PUBLIC_INTERFACE
export function getBadgeStyle(tag) {
  return BADGE_STYLES[(tag || '').toLowerCase()] || { bg: '#F9F5FF', color: '#6941C6' };
}

/**
 * BlogCard - Vertical blog post card for the "All blog posts" grid section.
 * Matches Figma node 1:164 (layout_60BBSD): column, stretch, fill, gap 32px.
 * Sections: image (240px tall) → body (heading-group + badges) → actions row.
 *
 * Contract:
 *   - Input: post object
 *   - Output: article JSX
 *   - Side effects: navigates on tag click, calls context on like/bookmark/delete
 *
 * @param {Object} props
 * @param {Object} props.post - Post data object
 */
// PUBLIC_INTERFACE
function BlogCard({ post }) {
  const { toggleLike, toggleBookmark, deletePost, setTagFilter } = useBlog();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    setTagFilter(tag);
    navigate('/');
  };

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
  const authorLine = `${post.author} • ${formattedDate}`;

  return (
    <article className="tb-blog-card" aria-label={`Blog post: ${post.title}`}>
      {/* Image: layout_YK4GB7 fill width, height 240px */}
      <Link to={`/post/${post.id}`} className="tb-blog-card__image-link" tabIndex="-1" aria-hidden="true">
        {post.image ? (
          <img
            className="tb-blog-card__image"
            src={post.image}
            alt={`Cover image for ${post.title}`}
          />
        ) : (
          <div
            className="tb-blog-card__image tb-blog-card__image--placeholder"
            role="img"
            aria-label={`Cover image for ${post.title}`}
          />
        )}
      </Link>

      {/* Body: layout_X3D16A column, stretch, fill, gap 24px */}
      <div className="tb-blog-card__body">
        {/* Heading group: layout_OPQ78S column, stretch, gap 12px */}
        <div className="tb-blog-card__heading-group">
          {/* Author: Text sm/Semibold #6941C6 */}
          <p className="tb-blog-card__author">{authorLine}</p>
          {/* Heading + icon: layout_OIVI4I row, fill, gap 16px */}
          <div className="tb-blog-card__title-row">
            <h2 className="tb-blog-card__title">
              <Link to={`/post/${post.id}`} className="tb-blog-card__title-link">{post.title}</Link>
            </h2>
            {/* Icon wrap: layout_B9TBFM column, padding 4px 0 0 */}
            <Link to={`/post/${post.id}`} className="tb-blog-card__arrow-link" aria-label={`Read ${post.title}`}>
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          {/* Supporting text: Text md/Normal #667085 */}
          <p className="tb-blog-card__excerpt">{post.excerpt}</p>
        </div>

        {/* Categories: layout_A98Z4R row, fill, gap 8px */}
        <div className="tb-blog-card__badges" aria-label="Post categories">
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
      </div>

      {/* Action buttons row */}
      <div className="tb-blog-card__actions" aria-label="Post actions">
        <button
          className={`tb-card-action-btn${post.likedByUser ? ' tb-like-btn--active' : ''}`}
          onClick={(e) => { e.preventDefault(); toggleLike(post.id); }}
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
          onClick={(e) => { e.preventDefault(); toggleBookmark(post.id); }}
          aria-label={post.bookmarked ? 'Remove bookmark' : 'Bookmark post'}
          aria-pressed={post.bookmarked}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={post.bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
        <button
          className="tb-card-action-btn tb-delete-btn"
          onClick={handleDelete}
          aria-label={`Delete: ${post.title}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default BlogCard;
