import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import './BookmarksPage.css';

/**
 * BookmarksPage - Shows all bookmarked posts
 */
function BookmarksPage() {
  const { posts } = useBlog();
  const bookmarkedPosts = posts.filter(p => p.bookmarked);

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-container">
        <header className="bookmarks-header">
          <h1 className="bookmarks-title">
            <span aria-hidden="true">🔖</span> Bookmarked Posts
          </h1>
          <p className="bookmarks-subtitle">
            {bookmarkedPosts.length > 0
              ? `${bookmarkedPosts.length} saved post${bookmarkedPosts.length !== 1 ? 's' : ''}`
              : 'Your reading list is empty'}
          </p>
        </header>

        {bookmarkedPosts.length > 0 ? (
          <div className="bookmarks-grid" aria-label="Bookmarked posts">
            {bookmarkedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bookmarks-empty" role="status">
            <span className="bookmarks-empty-icon" aria-hidden="true">🔖</span>
            <h2>No bookmarks yet</h2>
            <p>Click the bookmark icon on any post to save it for later reading.</p>
            <Link to="/" className="bookmarks-browse-link">Browse Posts</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookmarksPage;
