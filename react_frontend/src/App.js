import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import BookmarksPage from './pages/BookmarksPage';
import './App.css';

/**
 * App - Root component with routing and global providers
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="app-root">
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navbar />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:id" element={<BlogDetailPage />} />
              <Route path="/create" element={<CreatePostPage />} />
              <Route path="/edit/:id" element={<EditPostPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BlogProvider>
  );
}

function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 64px)',
      textAlign: 'center',
      padding: '40px 24px',
      gap: '12px',
    }}>
      <span style={{ fontSize: '64px' }} role="img" aria-label="404">🔍</span>
      <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: 0 }}>Page Not Found</h1>
      <p style={{ color: '#6b7280', margin: 0 }}>The page you're looking for doesn't exist.</p>
      <a
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '10px 24px',
          background: '#3b82f6',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          marginTop: '8px',
        }}
      >
        Go Home
      </a>
    </div>
  );
}

export default App;
