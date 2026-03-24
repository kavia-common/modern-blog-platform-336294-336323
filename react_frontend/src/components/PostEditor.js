import React, { useState, useEffect } from 'react';
import './PostEditor.css';

/**
 * PostEditor component - Rich editor for creating and editing blog posts
 * Supports markdown preview, tags, image URL, and author fields
 * @param {Object} initialValues - Initial form values
 * @param {Function} onSubmit - Submit handler
 * @param {boolean} isEditing - Whether in edit mode
 */
function PostEditor({ initialValues = {}, onSubmit, isEditing = false }) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [content, setContent] = useState(initialValues.content || '');
  const [excerpt, setExcerpt] = useState(initialValues.excerpt || '');
  const [author, setAuthor] = useState(initialValues.author || '');
  const [tagsInput, setTagsInput] = useState(
    initialValues.tags ? initialValues.tags.join(', ') : ''
  );
  const [image, setImage] = useState(initialValues.image || '');
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Auto-generate excerpt from content if not set
  useEffect(() => {
    if (!excerpt && content) {
      const plainText = content.replace(/[#*`[\]()>-]/g, '').trim();
      const words = plainText.split(/\s+/).slice(0, 25).join(' ');
      setExcerpt(words + (plainText.split(/\s+/).length > 25 ? '...' : ''));
    }
  }, [content, excerpt]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!content.trim()) newErrors.content = 'Content is required';
    if (!author.trim()) newErrors.author = 'Author name is required';
    if (title.trim().length > 120) newErrors.title = 'Title must be under 120 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const postData = {
      title: title.trim(),
      content,
      excerpt: excerpt.trim() || content.replace(/[#*`[\]()>-]/g, '').trim().split(/\s+/).slice(0, 25).join(' '),
      author: author.trim(),
      tags,
      image: image.trim(),
    };

    try {
      await onSubmit(postData);
    } finally {
      setSubmitting(false);
    }
  };

  const renderMarkdownPreview = (text) => {
    // Simple markdown renderer for preview
    return text
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h1-6ulp])/gm, '')
      .split('\n')
      .join('<br/>');
  };

  return (
    <form className="post-editor" onSubmit={handleSubmit} noValidate>
      {/* Title */}
      <div className="editor-field">
        <label className="editor-label" htmlFor="post-title">
          Title <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="post-title"
          type="text"
          className={`editor-input ${errors.title ? 'input-error' : ''}`}
          placeholder="Enter an engaging post title..."
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
          }}
          maxLength={120}
          aria-required="true"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <span className="error-msg" id="title-error" role="alert">{errors.title}</span>
        )}
        <span className="char-count">{title.length}/120</span>
      </div>

      {/* Author */}
      <div className="editor-field">
        <label className="editor-label" htmlFor="post-author">
          Author <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="post-author"
          type="text"
          className={`editor-input ${errors.author ? 'input-error' : ''}`}
          placeholder="Your name..."
          value={author}
          onChange={e => {
            setAuthor(e.target.value);
            if (errors.author) setErrors(prev => ({ ...prev, author: '' }));
          }}
          aria-required="true"
          aria-invalid={!!errors.author}
          aria-describedby={errors.author ? 'author-error' : undefined}
        />
        {errors.author && (
          <span className="error-msg" id="author-error" role="alert">{errors.author}</span>
        )}
      </div>

      {/* Tags */}
      <div className="editor-field">
        <label className="editor-label" htmlFor="post-tags">Tags</label>
        <input
          id="post-tags"
          type="text"
          className="editor-input"
          placeholder="React, JavaScript, Web Dev (comma separated)"
          value={tagsInput}
          onChange={e => setTagsInput(e.target.value)}
          aria-describedby="tags-hint"
        />
        <span className="editor-hint" id="tags-hint">Separate tags with commas</span>
        {tagsInput && (
          <div className="tags-preview" aria-label="Tag preview">
            {tagsInput.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
              <span key={tag} className="post-tag-preview">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Image URL */}
      <div className="editor-field">
        <label className="editor-label" htmlFor="post-image">Cover Image URL (optional)</label>
        <input
          id="post-image"
          type="url"
          className="editor-input"
          placeholder="https://example.com/image.jpg"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        {image && (
          <div className="image-preview">
            <img src={image} alt="Cover preview" onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="editor-field editor-field-content">
        <div className="editor-content-header">
          <label className="editor-label" htmlFor="post-content">
            Content <span className="required" aria-hidden="true">*</span>
          </label>
          <div className="editor-tab-group" role="group" aria-label="Editor mode">
            <button
              type="button"
              className={`editor-tab ${!previewMode ? 'active' : ''}`}
              onClick={() => setPreviewMode(false)}
              aria-pressed={!previewMode}
            >
              ✏️ Write
            </button>
            <button
              type="button"
              className={`editor-tab ${previewMode ? 'active' : ''}`}
              onClick={() => setPreviewMode(true)}
              aria-pressed={previewMode}
            >
              👁️ Preview
            </button>
          </div>
        </div>

        {!previewMode ? (
          <>
            <textarea
              id="post-content"
              className={`editor-textarea ${errors.content ? 'input-error' : ''}`}
              placeholder={`Write your post content here using Markdown...\n\n# Heading 1\n## Heading 2\n**Bold** or *italic*\n\`code\`\n\n- List item\n- Another item`}
              value={content}
              onChange={e => {
                setContent(e.target.value);
                if (errors.content) setErrors(prev => ({ ...prev, content: '' }));
              }}
              aria-required="true"
              aria-invalid={!!errors.content}
              aria-describedby={errors.content ? 'content-error' : 'markdown-hint'}
            />
            <span className="editor-hint" id="markdown-hint">Markdown supported</span>
          </>
        ) : (
          <div
            className="editor-preview-pane"
            dangerouslySetInnerHTML={{ __html: content ? `<p>${renderMarkdownPreview(content)}</p>` : '<p class="preview-empty">Nothing to preview yet...</p>' }}
            aria-live="polite"
          />
        )}
        {errors.content && (
          <span className="error-msg" id="content-error" role="alert">{errors.content}</span>
        )}
      </div>

      {/* Excerpt */}
      <div className="editor-field">
        <label className="editor-label" htmlFor="post-excerpt">Short Description (optional)</label>
        <textarea
          id="post-excerpt"
          className="editor-input editor-excerpt"
          placeholder="Brief summary of your post (auto-generated if left empty)..."
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          rows={2}
          maxLength={280}
        />
        <span className="char-count">{excerpt.length}/280</span>
      </div>

      {/* Submit */}
      <div className="editor-submit-row">
        <button
          type="submit"
          className="editor-submit-btn"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? (
            <span>Publishing...</span>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              {isEditing ? 'Update Post' : 'Publish Post'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default PostEditor;
