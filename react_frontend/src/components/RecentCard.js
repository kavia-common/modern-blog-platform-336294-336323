import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { getBadgeStyle } from './BlogCard';
import './RecentCard.css';

/**
 * RecentCard - Compact horizontal card for the right column of "Recent blog posts".
 * Matches Figma nodes 1:107 / 1:122 (layout_ZLUASY):
 *   - row, fill, gap 24px
 *   - Image: 320×200 fixed (layout_EA8NKC)
 *   - Content (layout_87XOK4): column, stretch, fill, gap 24px
 *
 * Contract:
 *   - Input: post object
 *   - Output: article JSX
 *   - Side effects: navigates on tag click
 *
 * @param {Object} props
 * @param {Object} props.post - Post data object
 */
// PUBLIC_INTERFACE
function RecentCard({ post }) {
  const { setTagFilter } = useBlog();
  const navigate = useNavigate();

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
    <article className="tb-recent-card" aria-label={`Post: ${post.title}`}>
      {/* Image: layout_EA8NKC 320×200 fixed */}
      <Link to={`/post/${post.id}`} className="tb-recent-card__image-link" tabIndex="-1" aria-hidden="true">
        {post.image ? (
          <img
            className="tb-recent-card__image"
            src={post.image}
            alt={`Cover for ${post.title}`}
          />
        ) : (
          <div
            className="tb-recent-card__image tb-recent-card__image--placeholder"
            role="img"
            aria-label={`Cover for ${post.title}`}
          />
        )}
      </Link>

      {/* Content: layout_87XOK4 column, stretch, fill, gap 24px */}
      <div className="tb-recent-card__content">
        {/* Heading group: layout_OPQ78S column, stretch, gap 12px */}
        <div className="tb-recent-card__heading-group">
          {/* Author: Text sm/Semibold #6941C6 */}
          <p className="tb-recent-card__author">{authorLine}</p>
          {/* Heading + icon: layout_BVPWKW column, stretch, gap 8px (for small cards uses Text lg/Semibold) */}
          <div className="tb-recent-card__heading-text">
            <div className="tb-recent-card__title-row">
              <h3 className="tb-recent-card__title">
                <Link to={`/post/${post.id}`} className="tb-recent-card__title-link">{post.title}</Link>
              </h3>
              {/* Icon wrap: layout_B9TBFM column, padding 4px 0 0 */}
              <Link to={`/post/${post.id}`} className="tb-recent-card__arrow" aria-label={`Read ${post.title}`}>
                <svg width="24" height="28" viewBox="0 0 24 28" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            {/* Supporting text: Text md/Normal #667085 */}
            <p className="tb-recent-card__excerpt">{post.excerpt}</p>
          </div>
        </div>

        {/* Categories: layout_A98Z4R row, fill, gap 8px */}
        <div className="tb-recent-card__badges" aria-label="Post categories">
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
    </article>
  );
}

export default RecentCard;
