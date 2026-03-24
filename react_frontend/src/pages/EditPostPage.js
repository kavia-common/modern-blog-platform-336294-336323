import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import PostEditor from '../components/PostEditor';
import './CreatePostPage.css';
import './EditPostPage.css';

/**
 * EditPostPage - Page for editing existing blog posts
 */
function EditPostPage() {
  const { id } = useParams();
  const { getPostById, updatePost } = useBlog();
  const navigate = useNavigate();

  const post = getPostById(id);

  if (!post) {
    return (
      <div className="edit-not-found">
        <span aria-hidden="true">📄</span>
        <h1>Post Not Found</h1>
        <p>The post you want to edit doesn't exist.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  const handleSubmit = (postData) => {
    updatePost({ ...post, ...postData });
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="create-page">
      <div className="create-container">
        <header className="create-header">
          <div className="create-header-icon" aria-hidden="true">✏️</div>
          <h1 className="create-title">Edit Post</h1>
          <p className="create-subtitle">Update your post content and details</p>
          <Link to={`/post/${post.id}`} className="edit-back-link">
            ← Back to post
          </Link>
        </header>

        <div className="create-editor-card">
          <PostEditor
            initialValues={post}
            onSubmit={handleSubmit}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  );
}

export default EditPostPage;
