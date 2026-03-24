import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { getBadgeStyle } from './BlogCard';
import './RecentCard.css';

/**
 * RecentCard - Compact horizontal card for the right column of "Recent blog posts".
 * Matches Figma nodes 1:107 / 1:122 (320x200 image + content, horizontal layout).
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
      <Link to={`/post/${post.id}`} className="tb-recent-card__image-link" tabIndex="-1" aria-hidden="true">
        <div
          className="tb-recent-card__image"
          style={post.image ? { backgroundImage: `url(${post.image})` } : undefined}
          role="img"
          aria-label={`Cover for ${post.title}`}
        />
      </Link>

      <div className="tb-recent-card__content">
        <div className="tb-recent-card__heading-group">
          <p className="tb-recent-card__author">{authorLine}</p>
          <div className="tb-recent-card__title-row">
            <h3 className="tb-recent-card__title">
              <Link to={`/post/${post.id}`} className="tb-recent-card__title-link">{post.title}</Link>
            </h3>
            <Link to={`/post/${post.id}`} className="tb-recent-card__arrow" aria-label={`Read ${post.title}`}>
              <svg width="24" height="24" viewBox="0 0 24 28" fill="none" aria-hidden="true">
                <path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <p className="tb-recent-card__excerpt">{post.excerpt}</p>
        </div>

        <div className="tb-recent-card__badges" aria-label="Post categories">
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
      </div>
    </article>
  );
}

export default RecentCard;
