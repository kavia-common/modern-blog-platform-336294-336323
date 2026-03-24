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
 * Matches Figma layout: 2 rows × 3 columns = 6 posts per page.
 */
const POSTS_PER_PAGE = 6;

/**
 * HomePage - Main page matching "THE BLOG Light Mode" Figma design (node 1:30).
 *
 * Layout structure (matches Figma node hierarchy exactly):
 *   1. Header (node 1:31): Navbar (sticky, rendered in App.js) + Giant "THE BLOG" title (1:53)
 *   2. Blog (node 1:80): column of 3 sections
 *      - Section 1 (1:81): "Recent blog posts" — large left card + 2-card right column
 *      - Section 2 (1:137): Featured/wide horizontal card
 *      - Section 3 (1:158): "All blog posts" 3-col grid + pagination
 *   3. Footer (node 1:324)
 *
 * Contract:
 *   - Inputs: none (reads from BlogContext)
 *   - Outputs: JSX full-page layout
 *   - Side effects: none
 *   - In normal mode: sections 1-3 + footer shown
 *   - In filter mode: only "All blog posts" grid with filtered results
 *   - Pagination resets to page 1 on any filter change
 *
 * Flow invariants:
 *   - recentPosts: posts[0..2] (left=large, right=2×small horizontal)
 *   - featuredPost: posts[3] (wide horizontal card)
 *   - allPostsSource: posts[4..] unfiltered, or filteredPosts when filtering
 *   - pagedPosts: slice of allPostsSource by currentPage
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
          Figma node 1:53 Container:
          - layout_BWNI58: row, width 1216, gap 260px
          - stroke_3SVU46: border-bottom rgba(0,0,0,0.34) 1px (top only in figma shorthand = bottom here)
          ============================================== */}
      <header className="tb-page-header">
        <div className="tb-page-header__inner">
          <h1 className="tb-page-title">THE BLOG</h1>
        </div>
      </header>

      <main id="main-content" className="tb-blog-content">

        {/* ==============================================
            SECTION 1: Recent blog posts (Figma 1:81)
            layout_VSO2YB: column, center, fill, padding 30px 0, gap 64px
            Container (layout_HGPLDT): column, 1280px, padding 0 32px, gap 32px
            Content (layout_9AN6U4): row, fill, gap 32px
            Only shown when not filtering
            ============================================== */}
        {!hasFilters && recentPosts.length > 0 && (
          <section className="tb-section" aria-labelledby="recent-heading">
            <div className="tb-section-container">
              <h2 className="tb-section-heading" id="recent-heading">Recent blog posts</h2>
              <div className="tb-recent-layout">
                {/* Left: large card (Figma 1:85) */}
                {recentPosts[0] && (
                  <div className="tb-recent-layout__main">
                    <RecentLargeCard post={recentPosts[0]} />
                  </div>
                )}
                {/* Right column: 2 horizontal cards (Figma 1:106, layout_50FMDT) */}
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
            layout_VSO2YB: same as section 1
            Content (layout_X8RG8B): row, fill, gap 32px
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
            layout_VSO2YB: same as others
            Container (layout_364NIK): column, 1280px, padding 0 32px, gap 30px
            Heading+content (layout_FX4KU9): column, 1216px, gap 32px
            Content (layout_89PXSP): column, fill, gap 48px
            Rows (layout_YOEGPZ): row, center, fill, gap 32px
            ============================================== */}
        <section className="tb-section" aria-labelledby="all-posts-heading">
          <div className="tb-section-container tb-section-container--all-posts">
            {/* Heading + grid wrapper at 1216px per Figma layout_FX4KU9 */}
            <div className="tb-all-posts-heading-content">
              {/* Filter status bar */}
              {hasFilters && (
                <div className="tb-filter-bar">
                  <div>
                    <h2 className="tb-section-heading" id="all-posts-heading">
                      {searchQuery ? `Results for "${searchQuery}"` : `Tag: ${activeTag}`}
                    </h2>
                    <p className="tb-filter-count">{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found</p>
                  </div>
                  <button
                    className="tb-clear-filters"
                    onClick={() => { setSearch(''); setTagFilter(''); }}
                    aria-label="Clear filters"
                  >
                    ✕ Clear filters
                  </button>
                </div>
              )}

              {!hasFilters && (
                <h2 className="tb-section-heading" id="all-posts-heading">All blog posts</h2>
              )}

              {pagedPosts.length > 0 ? (
                /* Content: layout_89PXSP column, gap 48px */
                <div className="tb-all-posts-content">
                  {buildRows(pagedPosts, 3).map((row, rowIdx) => (
                    /* Row: layout_YOEGPZ row, center, fill, gap 32px */
                    <div key={rowIdx} className="tb-all-posts-row">
                      {row.map(post => <BlogCard key={post.id} post={post} />)}
                    </div>
                  ))}

                  {/* Pagination: Figma node 1:291 */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              ) : (
                <EmptyState hasFilters={hasFilters} onClear={() => { setSearch(''); setTagFilter(''); }} />
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer: Figma node 1:324 */}
      <Footer />
    </div>
  );
}

/**
 * buildRows - Splits posts array into rows of N columns for the grid layout.
 *
 * Contract:
 *   - Input: posts array, cols number
 *   - Output: array of arrays (rows)
 *   - Pure function, no side effects
 *
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
 * Matches Figma node 1:85 (layout_KLLMN7): column, stretch, fill, gap 32px.
 * Image fills top portion; content has author, title+arrow icon, excerpt, badges.
 *
 * @param {Object} props
 * @param {Object} props.post - Post data object
 */
function RecentLargeCard({ post }) {
  const { setTagFilter } = useBlog();

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
  const authorLine = `${post.author} • ${formattedDate}`;

  return (
    <article className="tb-large-card" aria-label={`Post: ${post.title}`}>
      {/* Image: layout_LMIWYM fill */}
      <Link to={`/post/${post.id}`} className="tb-large-card__image-link" tabIndex="-1" aria-hidden="true">
        {post.image ? (
          <img
            className="tb-large-card__image"
            src={post.image}
            alt={`Cover for ${post.title}`}
          />
        ) : (
          <div className="tb-large-card__image tb-large-card__image--placeholder" role="img" aria-label={`Cover for ${post.title}`} />
        )}
      </Link>

      {/* Content: layout_X3D16A column, stretch, gap 24px */}
      <div className="tb-large-card__content">
        {/* Heading group: layout_OPQ78S column, stretch, gap 12px */}
        <div className="tb-large-card__heading-group">
          {/* Author: Text sm/Semibold #6941C6 */}
          <p className="tb-large-card__author">{authorLine}</p>
          {/* Title row + icon: layout_OIVI4I row, fill, gap 16px */}
          <div className="tb-large-card__title-row">
            <h2 className="tb-large-card__title">
              <Link to={`/post/${post.id}`} className="tb-large-card__title-link">{post.title}</Link>
            </h2>
            {/* Icon wrap: layout_B9TBFM column, padding 4px 0 0 */}
            <Link to={`/post/${post.id}`} className="tb-large-card__arrow" aria-label={`Read ${post.title}`}>
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 21L17 11M17 11H7M17 11V21" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          {/* Supporting text: Text md/Normal #667085 */}
          <p className="tb-large-card__excerpt">{post.excerpt}</p>
        </div>

        {/* Categories: layout_A98Z4R row, fill, gap 8px */}
        <div className="tb-large-card__badges" aria-label="Post categories">
          {post.tags.slice(0, 3).map(tag => {
            const s = getBadgeStyle(tag);
            return (
              <button
                key={tag}
                className="tb-badge"
                style={{ backgroundColor: s.bg, color: s.color }}
                onClick={(e) => { e.preventDefault(); setTagFilter(tag); }}
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

/**
 * EmptyState - Shown when no posts match the current filters.
 *
 * @param {Object} props
 * @param {boolean} props.hasFilters - Whether filters are active
 * @param {Function} props.onClear - Callback to clear all filters
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
