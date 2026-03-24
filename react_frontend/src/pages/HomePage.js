import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import { getBadgeStyle } from '../components/BlogCard';
import RecentCard from '../components/RecentCard';
import FeaturedCard from '../components/FeaturedCard';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import './HomePage.css';

/**
 * POSTS_PER_PAGE - Number of posts shown per page in "All blog posts" grid.
 */
const POSTS_PER_PAGE = 6;

/**
 * HomePage - Main page matching "THE BLOG Light Mode" Figma design (node 1:30).
 *
 * Layout structure:
 *   1. Header: Giant "THE BLOG" title (node 1:53)
 *   2. Section 1 - "Recent blog posts": large left card + 2-card right column (node 1:81)
 *   3. Section 2 - Featured post: wide horizontal card (node 1:137)
 *   4. Section 3 - "All blog posts": 3-column grid + pagination (node 1:158)
 *   5. Footer (node 1:324)
 *
 * Contract:
 *   - In normal mode: sections 1-4 + footer are shown
 *   - In filter mode: only "All blog posts" grid with filtered results
 *   - Pagination resets to page 1 on any filter change
 */
// PUBLIC_INTERFACE
function HomePage() {
  const { filteredPosts, searchQuery, activeTag, setSearch, setTagFilter } = useBlog();
  const [currentPage, setCurrentPage] = useState(1);

  const hasFilters = !!(searchQuery || activeTag);

  // Slice posts into sections (only when not filtering)
  const recentPosts = useMemo(() => hasFilters ? [] : filteredPosts.slice(0, 3), [filteredPosts, hasFilters]);
  const featuredPost = useMemo(() => hasFilters ? null : (filteredPosts[3] || null), [filteredPosts, hasFilters]);
  const allPostsSource = useMemo(() => hasFilters ? filteredPosts : filteredPosts.slice(4), [filteredPosts, hasFilters]);

  const totalPages = Math.ceil(allPostsSource.length / POSTS_PER_PAGE);

  // Reset pagination when filters change
  useEffect(() => { setCurrentPage(1); }, [searchQuery, activeTag]);

  const pagedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return allPostsSource.slice(start, start + POSTS_PER_PAGE);
  }, [allPostsSource, currentPage]);

  return (
    <div className="tb-home">
      {/* ==============================================
          HEADER: Giant "THE BLOG" display title
          Figma node 1:53 Container (border-bottom with stroke_SX4N9A)
          ============================================== */}
      <header className="tb-page-header">
        <div className="tb-page-header__inner">
          <h1 className="tb-page-title">THE BLOG</h1>
        </div>
      </header>

      <main id="main-content" className="tb-blog-content">

        {/* ==============================================
            SECTION 1: Recent blog posts (Figma 1:81)
            Only shown when not filtering
            ============================================== */}
        {!hasFilters && recentPosts.length > 0 && (
          <section className="tb-section" aria-labelledby="recent-heading">
            <div className="tb-section-container">
              <h2 className="tb-section-heading" id="recent-heading">Recent blog posts</h2>
              <div className="tb-recent-layout">
                {recentPosts[0] && (
                  <div className="tb-recent-layout__main">
                    <RecentLargeCard post={recentPosts[0]} />
                  </div>
                )}
                {recentPosts.slice(1, 3).length > 0 && (
                  <div className="tb-recent-layout__column">
                    {recentPosts.slice(1, 3).map(post => (
                      <RecentCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ==============================================
            SECTION 2: Featured post (Figma 1:137)
            Only shown when not filtering
            ============================================== */}
        {!hasFilters && featuredPost && (
          <section className="tb-section" aria-label="Featured post">
            <div className="tb-section-container">
              <FeaturedCard post={featuredPost} />
            </div>
          </section>
        )}

        {/* ==============================================
            SECTION 3: All blog posts (Figma 1:158)
            3-column grid with pagination
            ============================================== */}
        <section className="tb-section" aria-labelledby="all-posts-heading">
          <div className="tb-section-container tb-section-container--all-posts">
            {/* Filter status bar */}
            {hasFilters && (
              <div className="tb-filter-bar">
                <div>
                  <h2 className="tb-section-heading" id="all-posts-heading">
                    {searchQuery ? `Results for "${searchQuery}"` : `Tag: ${activeTag}`}
                  </h2>
                  <p className="tb-filter-count">{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found</p>
                </div>
                <button className="tb-clear-filters" onClick={() => { setSearch(''); setTagFilter(''); }} aria-label="Clear filters">
                  ✕ Clear filters
                </button>
              </div>
            )}

            {!hasFilters && (
              <h2 className="tb-section-heading" id="all-posts-heading">All blog posts</h2>
            )}

            {pagedPosts.length > 0 ? (
              <div className="tb-all-posts-content">
                {buildRows(pagedPosts, 3).map((row, rowIdx) => (
                  <div key={rowIdx} className="tb-all-posts-row">
                    {row.map(post => <BlogCard key={post.id} post={post} />)}
                  </div>
                ))}
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            ) : (
              <EmptyState hasFilters={hasFilters} onClear={() => { setSearch(''); setTagFilter(''); }} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/**
 * buildRows - Splits posts array into rows of N columns for the grid layout.
 * @param {Array} posts
 * @param {number} cols
 * @returns {Array<Array>}
 */
function buildRows(posts, cols) {
  const rows = [];
  for (let i = 0; i < posts.length; i += cols) {
    rows.push(posts.slice(i, i + cols));
  }
  return rows;
}

/**
 * RecentLargeCard - Large vertical card for the left column of "Recent blog posts".
 * Matches Figma node 1:85 (full-width image + content, gap 32px).
 */
function RecentLargeCard({ post }) {
  const { setTagFilter } = useBlog();

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
  const authorLine = `${post.author} • ${formattedDate}`;

  return (
    <article className="tb-large-card" aria-label={`Post: ${post.title}`}>
      <Link to={`/post/${post.id}`} className="tb-large-card__image-link" tabIndex="-1" aria-hidden="true">
        <div
          className="tb-large-card__image"
          style={post.image ? { backgroundImage: `url(${post.image})` } : undefined}
          role="img"
          aria-label={`Cover for ${post.title}`}
        />
      </Link>
      <div className="tb-large-card__content">
        <div className="tb-large-card__heading-group">
          <p className="tb-large-card__author">{authorLine}</p>
          <div className="tb-large-card__title-row">
            <h2 className="tb-large-card__title">
              <Link to={`/post/${post.id}`} className="tb-large-card__title-link">{post.title}</Link>
            </h2>
            <Link to={`/post/${post.id}`} className="tb-large-card__arrow" aria-label={`Read ${post.title}`}>
              <svg width="24" height="24" viewBox="0 0 24 28" fill="none" aria-hidden="true">
                <path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <p className="tb-large-card__excerpt">{post.excerpt}</p>
        </div>
        <div className="tb-large-card__badges" aria-label="Post categories">
          {post.tags.slice(0, 3).map(tag => {
            const s = getBadgeStyle(tag);
            return (
              <button key={tag} className="tb-badge" style={{ backgroundColor: s.bg, color: s.color }}
                onClick={(e) => { e.preventDefault(); setTagFilter(tag); }} aria-label={`Filter by ${tag}`}>
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}

/**
 * EmptyState - Shown when no posts match the current filters.
 */
function EmptyState({ hasFilters, onClear }) {
  return (
    <div className="tb-empty" role="status">
      <span className="tb-empty__icon" aria-hidden="true">🔍</span>
      <h3 className="tb-empty__title">No posts found</h3>
      <p className="tb-empty__text">
        {hasFilters ? 'Try adjusting your search or removing filters.' : 'Be the first to write a post!'}
      </p>
      {hasFilters && (
        <button className="tb-clear-filters" onClick={onClear}>Clear filters</button>
      )}
    </div>
  );
}

export default HomePage;
