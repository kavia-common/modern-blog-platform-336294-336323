import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import PostEditor from '../components/PostEditor';
import './CreatePostPage.css';

/**
 * CreatePostPage - Page for creating new blog posts
 */
function CreatePostPage() {
  const { addPost } = useBlog();
  const navigate = useNavigate();

  const handleSubmit = (postData) => {
    const newId = addPost(postData);
    navigate(`/post/${newId}`);
  };

  return (
    <div className="create-page">
      <div className="create-container">
        <header className="create-header">
          <div className="create-header-icon" aria-hidden="true">✍️</div>
          <h1 className="create-title">Create New Post</h1>
          <p className="create-subtitle">Share your knowledge and ideas with the community</p>
        </header>

        <div className="create-editor-card">
          <PostEditor onSubmit={handleSubmit} isEditing={false} />
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;
