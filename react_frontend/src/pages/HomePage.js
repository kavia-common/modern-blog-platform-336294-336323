import React from 'react';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import './HomePage.css';

/**
 * HomePage - Main blog listing page
 * Displays filtered posts in a responsive grid with sidebar for tags/filters
 */
function HomePage() {
  const { filteredPosts, searchQuery, activeTag, setSearch, setTagFilter, posts } = useBlog();

  const hasFilters = searchQuery || activeTag;

  return (
    <div className="home-page">
      {/* Hero Header */}
      <div className="home-hero">
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            {hasFilters ? (
              <>
                {searchQuery ? `Results for "${searchQuery}"` : `Tag: ${activeTag}`}
              </>
            ) : (
              <>Explore the <span className="home-hero-accent">Latest</span> Articles</>
            )}
          </h1>
          <p className="home-hero-subtitle">
            {hasFilters
              ? `${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''} found`
              : `Discover ${posts.length} posts on web development, design, and technology`}
          </p>
          {hasFilters && (
            <button
              className="home-clear-filters"
              onClick={() => { setSearch(''); setTagFilter(''); }}
              aria-label="Clear all filters"
            >
              ✕ Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div className="home-layout">
        <main className="home-main" id="main-content" role="main">
          {filteredPosts.length > 0 ? (
            <div className="posts-grid" aria-label="Blog posts">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="home-empty" role="status">
              <span className="home-empty-icon" aria-hidden="true">🔍</span>
              <h2 className="home-empty-title">No posts found</h2>
              <p className="home-empty-text">
                {hasFilters
                  ? 'Try adjusting your search or removing filters'
                  : 'Be the first to write a post!'}
              </p>
              {hasFilters && (
                <button
                  className="home-clear-filters"
                  onClick={() => { setSearch(''); setTagFilter(''); }}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </main>

        <aside className="home-sidebar" aria-label="Filters and information">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}

export default HomePage;
