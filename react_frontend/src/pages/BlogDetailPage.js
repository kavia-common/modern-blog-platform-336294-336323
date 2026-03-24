import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import './BlogDetailPage.css';

/**
 * BlogDetailPage - Full post view with content, actions, and navigation
 */
function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, toggleLike, toggleBookmark, deletePost, setTagFilter } = useBlog();

  const post = getPostById(id);

  if (!post) {
    return (
      <div className="detail-not-found">
        <span className="not-found-icon" aria-hidden="true">📄</span>
        <h1>Post Not Found</h1>
        <p>The post you're looking for doesn't exist or has been deleted.</p>
        <Link to="/" className="not-found-back">← Back to Home</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
      navigate('/');
    }
  };

  const handleTagClick = (tag) => {
    setTagFilter(tag);
    navigate('/');
  };

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const readTime = Math.ceil(post.content.split(' ').length / 200);

  // Simple markdown renderer
  const renderMarkdown = (text) => {
    return text
      .replace(/```([\w]*)\n([\s\S]*?)```/g, '<pre><code class="code-block">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]*?<\/li>)/g, (match) => `<ul>${match}</ul>`)
      .replace(/\n\n/g, '</p><p>')
      .split('\n')
      .join(' ');
  };

  return (
    <div className="detail-page">
      <div className="detail-container">
        {/* Breadcrumb */}
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span className="breadcrumb-current" aria-current="page">{post.title}</span>
        </nav>

        <article className="detail-article" aria-labelledby="post-title">
          {/* Header */}
          <header className="detail-header">
            {/* Tags */}
            <div className="detail-tags" aria-label="Post tags">
              {post.tags.map(tag => (
                <button
                  key={tag}
                  className="post-tag"
                  onClick={() => handleTagClick(tag)}
                  aria-label={`Filter by tag: ${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Title */}
            <h1 id="post-title" className="detail-title">{post.title}</h1>

            {/* Meta */}
            <div className="detail-meta">
              <div className="detail-author">
                <span className="detail-avatar" aria-hidden="true">
                  {post.author.charAt(0).toUpperCase()}
                </span>
                <div>
                  <span className="detail-author-name">{post.author}</span>
                  <div className="detail-meta-info">
                    <span>{formattedDate}</span>
                    <span className="meta-dot" aria-hidden="true">·</span>
                    <span>{readTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="detail-actions">
                <button
                  className={`detail-action-btn like-btn ${post.likedByUser ? 'active' : ''}`}
                  onClick={() => toggleLike(post.id)}
                  aria-label={post.likedByUser ? `Unlike (${post.likes})` : `Like (${post.likes})`}
                  aria-pressed={post.likedByUser}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={post.likedByUser ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>{post.likes}</span>
                </button>

                <button
                  className={`detail-action-btn bookmark-btn ${post.bookmarked ? 'active' : ''}`}
                  onClick={() => toggleBookmark(post.id)}
                  aria-label={post.bookmarked ? 'Remove bookmark' : 'Bookmark'}
                  aria-pressed={post.bookmarked}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={post.bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>

                <Link
                  to={`/edit/${post.id}`}
                  className="detail-action-btn edit-btn"
                  aria-label="Edit post"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </Link>

                <button
                  className="detail-action-btn delete-btn"
                  onClick={handleDelete}
                  aria-label="Delete post"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {post.image && (
            <div className="detail-cover">
              <img src={post.image} alt={`Cover for ${post.title}`} className="detail-cover-img" />
            </div>
          )}

          {/* Content */}
          <div
            className="detail-content"
            dangerouslySetInnerHTML={{ __html: `<p>${renderMarkdown(post.content)}</p>` }}
            aria-label="Post content"
          />
        </article>

        {/* Footer */}
        <div className="detail-footer">
          <Link to="/" className="detail-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to all posts
          </Link>
          <Link to={`/edit/${post.id}`} className="detail-edit-link">
            Edit this post →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
