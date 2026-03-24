import React from 'react';
import { useBlog } from '../context/BlogContext';
import './Sidebar.css';

/**
 * Sidebar component - Tag filters and blog statistics
 */
function Sidebar() {
  const { allTags, activeTag, setTagFilter, posts } = useBlog();

  const tagCounts = allTags.map(tag => ({
    tag,
    count: posts.filter(p => p.tags.includes(tag)).length,
  }));

  const bookmarkedCount = posts.filter(p => p.bookmarked).length;
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);

  return (
    <div className="sidebar">
      {/* Stats */}
      <div className="sidebar-card">
        <h2 className="sidebar-title">📊 Blog Stats</h2>
        <div className="sidebar-stats">
          <div className="stat-item">
            <span className="stat-value">{posts.length}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{totalLikes}</span>
            <span className="stat-label">Total Likes</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{bookmarkedCount}</span>
            <span className="stat-label">Bookmarked</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="sidebar-card">
        <h2 className="sidebar-title">🏷️ Browse by Tags</h2>
        {tagCounts.length > 0 ? (
          <div className="sidebar-tags">
            <button
              className={`sidebar-tag ${!activeTag ? 'active' : ''}`}
              onClick={() => setTagFilter('')}
              aria-pressed={!activeTag}
            >
              All Posts
              <span className="sidebar-tag-count">{posts.length}</span>
            </button>
            {tagCounts.map(({ tag, count }) => (
              <button
                key={tag}
                className={`sidebar-tag ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setTagFilter(activeTag === tag ? '' : tag)}
                aria-pressed={activeTag === tag}
                aria-label={`Filter by ${tag} (${count} posts)`}
              >
                {tag}
                <span className="sidebar-tag-count">{count}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="sidebar-empty">No tags yet</p>
        )}
      </div>

      {/* About */}
      <div className="sidebar-card sidebar-about">
        <h2 className="sidebar-title">💡 About BlogHub</h2>
        <p className="sidebar-about-text">
          A modern platform for sharing knowledge, insights, and ideas. Write, explore, and engage with content that matters.
        </p>
        <div className="sidebar-about-features">
          <span>✍️ Create & edit posts</span>
          <span>🔖 Bookmark favorites</span>
          <span>❤️ Like posts</span>
          <span>🔍 Search & filter</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
