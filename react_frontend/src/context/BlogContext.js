import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial mock data
const initialPosts = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    content: `# Getting Started with React Hooks

React Hooks revolutionized how we write React components. They allow you to use state and other React features in functional components.

## useState Hook

The \`useState\` hook lets you add state to functional components:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

The \`useEffect\` hook lets you perform side effects in functional components:

\`\`\`javascript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

## Custom Hooks

You can create your own hooks by composing existing ones. This promotes code reuse and separation of concerns.

React Hooks have made functional components the preferred way to write React code, replacing class components in most scenarios.`,
    excerpt: 'Learn how React Hooks revolutionized functional components, enabling state and side effects without class components.',
    author: 'Jane Smith',
    publishDate: '2024-01-15',
    tags: ['React', 'JavaScript', 'Hooks'],
    image: '',
    likes: 42,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '2',
    title: 'Mastering CSS Grid Layout',
    content: `# Mastering CSS Grid Layout

CSS Grid is a powerful layout system that allows you to create complex two-dimensional layouts with ease.

## Basic Grid Setup

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## Grid Areas

You can define named grid areas for semantic layouts:

\`\`\`css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
\`\`\`

## Auto-placement

Grid auto-placement algorithm automatically places items in the grid, making dynamic layouts easy to manage.`,
    excerpt: 'Deep dive into CSS Grid Layout and learn how to create complex, responsive two-dimensional layouts.',
    author: 'Bob Johnson',
    publishDate: '2024-01-20',
    tags: ['CSS', 'Web Design', 'Layout'],
    image: '',
    likes: 35,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '3',
    title: 'TypeScript Best Practices for 2024',
    content: `# TypeScript Best Practices for 2024

TypeScript continues to grow in popularity. Here are the best practices to follow in 2024.

## Use Strict Mode

Always enable strict mode in your TypeScript config:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## Prefer Interfaces over Type Aliases

For object shapes, prefer interfaces as they are more extensible:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

## Use Generic Types

Generics allow you to write reusable, type-safe code:

\`\`\`typescript
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}
\`\`\``,
    excerpt: 'Explore the latest TypeScript best practices that will make your code more robust and maintainable in 2024.',
    author: 'Alice Chen',
    publishDate: '2024-02-01',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    image: '',
    likes: 58,
    bookmarked: true,
    likedByUser: false,
  },
  {
    id: '4',
    title: 'Building RESTful APIs with Node.js',
    content: `# Building RESTful APIs with Node.js

Node.js is an excellent choice for building fast, scalable RESTful APIs.

## Express Setup

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

## RESTful Conventions

Follow REST conventions:
- GET for retrieving data
- POST for creating resources
- PUT/PATCH for updating
- DELETE for removing resources

## Error Handling

Always implement proper error handling middleware to catch and format errors consistently.`,
    excerpt: 'A comprehensive guide to building scalable RESTful APIs with Node.js and Express.',
    author: 'Mike Wilson',
    publishDate: '2024-02-10',
    tags: ['Node.js', 'API', 'Backend'],
    image: '',
    likes: 29,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '5',
    title: 'Introduction to Web Accessibility',
    content: `# Introduction to Web Accessibility

Web accessibility ensures that websites and applications are usable by everyone, including people with disabilities.

## WCAG Guidelines

The Web Content Accessibility Guidelines (WCAG) provide standards for accessibility:

- **Perceivable**: Content must be presentable in ways users can perceive
- **Operable**: User interface must be operable
- **Understandable**: Content must be understandable
- **Robust**: Content must be robust enough for assistive technologies

## ARIA Attributes

Use ARIA attributes to enhance accessibility:

\`\`\`html
<button aria-label="Close dialog" aria-expanded="false">
  <span aria-hidden="true">×</span>
</button>
\`\`\`

## Keyboard Navigation

Ensure all interactive elements are keyboard accessible. Use proper focus management and visible focus indicators.`,
    excerpt: 'Learn the fundamentals of web accessibility and how to make your applications usable by everyone.',
    author: 'Sarah Davis',
    publishDate: '2024-02-15',
    tags: ['Accessibility', 'Web Design', 'WCAG'],
    image: '',
    likes: 47,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '6',
    title: 'State Management with Redux Toolkit',
    content: `# State Management with Redux Toolkit

Redux Toolkit is the official, opinionated toolset for efficient Redux development.

## Setup

\`\`\`javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
\`\`\`

## Creating Slices

\`\`\`javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});
\`\`\`

## Async Thunks

Use \`createAsyncThunk\` for async operations like API calls, with built-in loading and error states.`,
    excerpt: 'Discover how Redux Toolkit simplifies state management in React applications with less boilerplate.',
    author: 'Tom Brown',
    publishDate: '2024-02-20',
    tags: ['Redux', 'React', 'State Management'],
    image: '',
    likes: 33,
    bookmarked: false,
    likedByUser: false,
  },
];

// Action types
const ACTIONS = {
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  TOGGLE_LIKE: 'TOGGLE_LIKE',
  TOGGLE_BOOKMARK: 'TOGGLE_BOOKMARK',
  SET_SEARCH: 'SET_SEARCH',
  SET_TAG_FILTER: 'SET_TAG_FILTER',
};

// Reducer
function blogReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_POSTS:
      return { ...state, posts: action.payload };
    case ACTIONS.ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case ACTIONS.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case ACTIONS.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    case ACTIONS.TOGGLE_LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload
            ? {
                ...post,
                likedByUser: !post.likedByUser,
                likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
              }
            : post
        ),
      };
    case ACTIONS.TOGGLE_BOOKMARK:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload
            ? { ...post, bookmarked: !post.bookmarked }
            : post
        ),
      };
    case ACTIONS.SET_SEARCH:
      return { ...state, searchQuery: action.payload };
    case ACTIONS.SET_TAG_FILTER:
      return { ...state, activeTag: action.payload };
    default:
      return state;
  }
}

// Initial state
const getInitialState = () => {
  try {
    const saved = localStorage.getItem('blogPosts');
    const posts = saved ? JSON.parse(saved) : initialPosts;
    return {
      posts,
      searchQuery: '',
      activeTag: '',
    };
  } catch {
    return {
      posts: initialPosts,
      searchQuery: '',
      activeTag: '',
    };
  }
};

// Create context
const BlogContext = createContext(null);

// Provider component
export function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, null, getInitialState);

  // Persist to localStorage when posts change
  useEffect(() => {
    try {
      localStorage.setItem('blogPosts', JSON.stringify(state.posts));
    } catch (e) {
      console.error('Failed to save posts to localStorage', e);
    }
  }, [state.posts]);

  const addPost = (postData) => {
    const newPost = {
      ...postData,
      id: Date.now().toString(),
      publishDate: new Date().toISOString().split('T')[0],
      likes: 0,
      bookmarked: false,
      likedByUser: false,
    };
    dispatch({ type: ACTIONS.ADD_POST, payload: newPost });
    return newPost.id;
  };

  const updatePost = (post) => {
    dispatch({ type: ACTIONS.UPDATE_POST, payload: post });
  };

  const deletePost = (id) => {
    dispatch({ type: ACTIONS.DELETE_POST, payload: id });
  };

  const toggleLike = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_LIKE, payload: id });
  };

  const toggleBookmark = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_BOOKMARK, payload: id });
  };

  const setSearch = (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: query });
  };

  const setTagFilter = (tag) => {
    dispatch({ type: ACTIONS.SET_TAG_FILTER, payload: tag });
  };

  const getFilteredPosts = () => {
    return state.posts.filter(post => {
      const matchesSearch =
        !state.searchQuery ||
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        post.tags.some(tag =>
          tag.toLowerCase().includes(state.searchQuery.toLowerCase())
        ) ||
        post.excerpt.toLowerCase().includes(state.searchQuery.toLowerCase());

      const matchesTag =
        !state.activeTag ||
        post.tags.some(tag => tag.toLowerCase() === state.activeTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  };

  const getAllTags = () => {
    const tagSet = new Set();
    state.posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  };

  const getPostById = (id) => state.posts.find(post => post.id === id);

  return (
    <BlogContext.Provider
      value={{
        posts: state.posts,
        searchQuery: state.searchQuery,
        activeTag: state.activeTag,
        filteredPosts: getFilteredPosts(),
        allTags: getAllTags(),
        addPost,
        updatePost,
        deletePost,
        toggleLike,
        toggleBookmark,
        setSearch,
        setTagFilter,
        getPostById,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

// Custom hook
export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}

export { ACTIONS };
export default BlogContext;
