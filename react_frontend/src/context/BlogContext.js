import React, { createContext, useContext, useReducer, useEffect } from 'react';

/**
 * initialPosts - Mock blog post data matching the "THE BLOG" Figma content.
 * Images reference assets downloaded from Figma, served from /assets/ public path.
 *
 * Invariant: Each post must have id, title, content, excerpt, author, publishDate,
 *            tags (array), image (string|""), likes (number), bookmarked, likedByUser.
 */
const initialPosts = [
  {
    id: '1',
    title: 'UX review presentations',
    content: `# UX review presentations

How do you create compelling presentations that wow your colleagues and impress your managers?

## The Challenge

Creating effective UX review presentations requires balancing detailed analysis with clear storytelling. Your audience needs to understand both the problems you found and the solutions you propose.

## Key Strategies

### 1. Lead with Impact
Start with the most critical findings. Decision-makers have limited attention spans—front-load the insights that matter most.

### 2. Use Real User Quotes
Nothing is more persuasive than hearing directly from users. Incorporate verbatim quotes to bring authenticity to your findings.

### 3. Prioritize Recommendations
Not all issues are equal. Use a priority matrix to help stakeholders understand what to fix first.

## Structure Your Presentation

- **Executive Summary**: High-level findings (2-3 slides)
- **Methodology**: How you conducted the review
- **Findings**: Detailed analysis with evidence
- **Recommendations**: Actionable next steps
- **Roadmap**: Timeline for implementation

A well-structured UX review presentation turns raw data into actionable insights that drive real product improvements.`,
    excerpt: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    author: 'Olivia Rhye',
    publishDate: '2023-01-01',
    tags: ['Design', 'Research', 'Presentation'],
    image: '/assets/blog-card-1.png',
    likes: 42,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '2',
    title: 'Migrating to Linear 101',
    content: `# Migrating to Linear 101

Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started with your migration.

## Why Linear?

Linear is built for speed. Every action feels instant, and the keyboard-first design means your team spends less time clicking and more time shipping.

## Migration Steps

### Step 1: Audit Your Current Setup
Before migrating, document your existing workflow:
- What project management tool are you leaving?
- How are you currently tracking bugs?
- What are your team's naming conventions?

### Step 2: Set Up Your Workspace
1. Create your Linear workspace
2. Configure teams and projects
3. Set up your issue statuses to match your workflow

### Step 3: Import Existing Issues
Linear supports CSV imports from most major tools. Map your existing fields to Linear's structure.

### Step 4: Train Your Team
Run a 30-minute walkthrough session focusing on:
- Creating and updating issues
- Using cycles (sprints)
- Keyboard shortcuts

## Tips for Success

- Start with one team before rolling out company-wide
- Use Linear's API to automate repetitive tasks
- Take advantage of Git integrations for automatic issue updates

The transition to Linear typically takes 1-2 weeks, after which most teams report significant productivity improvements.`,
    excerpt: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here\'s how to get started.',
    author: 'Phoenix Baker',
    publishDate: '2023-01-01',
    tags: ['Design', 'Research'],
    image: '/assets/blog-card-2.png',
    likes: 35,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '3',
    title: 'Building your API Stack',
    content: `# Building your API Stack

The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing APIs. Here's what you need to know.

## The Modern API Stack

Building a robust API stack requires careful consideration of tools at each layer:

### Design & Documentation
- **OpenAPI/Swagger**: Define your API contract before writing code
- **Stoplight**: Visual API design with collaboration features
- **Postman**: Industry-standard API documentation

### Development
- **Express.js / FastAPI**: Lightweight frameworks for quick setup
- **NestJS / Django REST Framework**: Full-featured frameworks with structure

### Testing
- **Postman Collections**: Automated test suites
- **Jest / Pytest**: Unit testing your API logic
- **k6**: Load testing at scale

### Monitoring
- **Datadog / New Relic**: Performance monitoring
- **Sentry**: Error tracking
- **Grafana**: Custom dashboards

## Best Practices

\`\`\`javascript
// Always version your APIs
app.use('/api/v1/users', usersRouter);
app.use('/api/v2/users', usersRouterV2);

// Use consistent error responses
const errorResponse = (code, message) => ({
  error: { code, message, timestamp: new Date().toISOString() }
});
\`\`\`

Start small, document everything, and iterate based on consumer feedback.`,
    excerpt: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing APIs.',
    author: 'Lana Steiner',
    publishDate: '2023-01-01',
    tags: ['Design', 'Research'],
    image: '/assets/blog-card-3.png',
    likes: 28,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '4',
    title: 'Grid system for better Design User Interface',
    content: `# Grid system for better Design User Interface

A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, which can be used to align and organize page elements.

## Why Grid Systems Matter

Grid systems are used to create a consistent look and feel across a website, and can help to make the layout more visually appealing and easier to navigate.

## Types of Grid Systems

### Column Grids
The most common type, dividing the page into vertical columns:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
\`\`\`

### Modular Grids
Both horizontal and vertical divisions, creating a matrix of cells.

### Hierarchical Grids
Informal grids that prioritize visual hierarchy over strict alignment.

## Implementing a Grid System

1. **Define your columns**: 12 is standard (divisible by 2, 3, 4, 6)
2. **Set your gutters**: The space between columns (typically 16-32px)
3. **Define breakpoints**: How the grid adapts at different screen sizes
4. **Apply consistently**: Use the same grid throughout your design

## Grid Systems in CSS

Modern CSS makes grid systems trivial to implement:

\`\`\`css
/* 12-column grid */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
\`\`\`

A well-implemented grid system is the foundation of professional, polished UI design.`,
    excerpt: 'A grid system is a design tool used to arrange content on a webpage. It creates consistent, beautiful layouts.',
    author: 'Olivia Rhye',
    publishDate: '2023-01-01',
    tags: ['Design', 'Interface'],
    image: '/assets/blog-card-featured-464667.png',
    likes: 64,
    bookmarked: true,
    likedByUser: false,
  },
  {
    id: '5',
    title: 'Bill Walsh leadership lessons',
    content: `# Bill Walsh leadership lessons

Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?

## The Standard of Performance

Bill Walsh's philosophy centered on a "Standard of Performance" — a set of behaviors and attitudes that he believed would lead to winning, independent of the scoreboard.

## Key Leadership Principles

### 1. Focus on the Process, Not the Outcome
Walsh famously said: "The score takes care of itself." By focusing on executing each play correctly, winning becomes a natural result.

### 2. Teach, Don't Dictate
Great leaders are great teachers. Walsh spent as much time in the classroom as on the practice field, ensuring every player understood not just *what* to do, but *why*.

### 3. Build a Culture of Excellence
Culture is built through consistent behavior, not slogans. Walsh's 49ers were expected to be professional in every interaction—from how they dressed to how they treated support staff.

### 4. Prepare for Every Scenario
Walsh was famous for scripting the first 25 offensive plays. This preparation reduced in-game decision-making pressure and allowed instinct to take over.

## Application to Modern Leadership

These principles translate directly to business:

- **Standard of Performance**: Define what excellence looks like in your organization
- **Process over outcomes**: Focus on execution metrics, not just KPIs
- **Continuous teaching**: Invest in your team's development constantly
- **Scenario planning**: Prepare for challenges before they arise

Leadership is about installing the right mindset in your organization. The results will follow.`,
    excerpt: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?',
    author: 'Alec Whitten',
    publishDate: '2023-01-01',
    tags: ['Leadership', 'Management'],
    image: '/assets/blog-card-5.png',
    likes: 52,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '6',
    title: 'PM mental models',
    content: `# PM mental models

Mental models are simple expressions of complex processes or relationships. For Product Managers, they are essential thinking tools.

## Why Mental Models Matter

Great PMs don't just react to data—they use mental models to anticipate, reason, and make better decisions faster.

## Essential PM Mental Models

### 1. Jobs-to-be-Done (JTBD)
People don't buy products; they hire them to do a job. Understanding the job helps you build what customers actually need.

*Example*: People don't want a drill—they want a hole in the wall.

### 2. First Principles Thinking
Break problems down to their fundamental truths and reason up from there.

*Example*: Instead of asking "How can we improve our checkout?", ask "What is the minimum information we need to complete a transaction?"

### 3. Second-Order Thinking
Consider the consequences of consequences. Every decision has ripple effects.

*Example*: "If we add this feature, users will use it more. But will using it more actually make their lives better?"

### 4. Inversion
Instead of asking "How do we succeed?", ask "How do we fail?" Then avoid those things.

*Example*: To build a great product, list all the ways to make a terrible product, then don't do those things.

### 5. Opportunity Cost
Choosing to do something means choosing NOT to do something else. Every roadmap decision has a cost.

## Building Your Mental Model Library

The best PMs continuously add to their mental model toolkit:
- Read broadly across disciplines
- Reflect on decisions after the fact
- Share models with your team

Mental models become powerful when they're second nature—when you apply them automatically in the heat of decision-making.`,
    excerpt: 'Mental models are simple expressions of complex processes or relationships.',
    author: 'Demi Wilkinson',
    publishDate: '2023-01-01',
    tags: ['Product', 'Research', 'Frameworks'],
    image: '/assets/blog-card-6.png',
    likes: 47,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '7',
    title: 'What is Wireframing?',
    content: `# What is Wireframing?

Introduction to Wireframing and its Principles. Learn from the best in the industry.

## Definition

A wireframe is a low-fidelity visual representation of a digital interface. It shows the layout, structure, and hierarchy of elements without any visual design (colors, fonts, images).

## Why Wireframe?

Wireframing serves several critical purposes:

1. **Clarify requirements**: Forces teams to define what needs to be built before building it
2. **Rapid iteration**: Much faster to change a wireframe than working code
3. **Stakeholder alignment**: Gives non-technical stakeholders something concrete to react to
4. **Developer handoff**: Provides clear structure for implementation

## Types of Wireframes

### Low-Fidelity
Hand-drawn sketches or simple digital boxes. Used for initial ideation.

### Mid-Fidelity
Digital wireframes with basic layout and placeholder content. Most common type.

### High-Fidelity
Detailed wireframes with real content and precise measurements. Bridges design and prototype.

## Wireframing Tools

- **Figma**: Collaborative, cloud-based, free tier available
- **Balsamiq**: Deliberately low-fidelity, fast sketching
- **Sketch**: Mac-only, powerful for complex systems
- **Adobe XD**: Integrated with Creative Suite

## Best Practices

\`\`\`
Do:
✓ Focus on layout, not aesthetics
✓ Use real (or realistic) content
✓ Annotate decisions and reasoning
✓ Iterate quickly based on feedback

Don't:
✗ Add colors or detailed typography
✗ Treat wireframes as final designs
✗ Skip wireframing to save time
\`\`\`

Wireframing is the foundation of great UX. The time invested upfront saves multiples downstream.`,
    excerpt: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.',
    author: 'Candice Wu',
    publishDate: '2023-01-01',
    tags: ['Design', 'Research'],
    image: '/assets/blog-card-7.png',
    likes: 39,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '8',
    title: 'How collaboration makes us better designers',
    content: `# How collaboration makes us better designers

Collaboration can make our teams stronger, and our individual designs better.

## The Solo Designer Myth

For too long, design has been romanticized as a solitary creative act—the lone genius in their studio. In reality, the best design work happens in collaboration.

## How Collaboration Improves Design

### Diverse Perspectives Catch Blind Spots
What seems obvious to the designer often isn't to the user. Collaborators from different backgrounds surface assumptions you didn't know you were making.

### Real-Time Feedback Accelerates Iteration
Instead of completing a design and presenting it for feedback, collaborative design tools allow continuous input throughout the process.

### Cross-Functional Input Creates Better Products
When engineers, product managers, and designers work side-by-side, the resulting designs are both beautiful *and* buildable.

## Collaborative Design in Practice

### Design Critiques
Run structured critique sessions where the goal is improving the work, not judging the designer.

**Format**:
1. Designer presents (5 min)
2. Clarifying questions (5 min)
3. Structured feedback (15 min)
4. Designer response (5 min)

### Pair Design
Like pair programming, two designers working together on the same problem—one leading, one observing and questioning.

### Design Sprints
Google Ventures' 5-day process compresses months of design and validation into a single week through intense collaboration.

## Building a Collaborative Culture

Collaboration doesn't happen automatically—it requires psychological safety, clear processes, and the right tools.

The best design teams I've worked with share one trait: they prioritize learning over ego. When everyone is focused on making the work better, collaboration flourishes.`,
    excerpt: 'Collaboration can make our teams stronger, and our individual designs better.',
    author: 'Natali Craig',
    publishDate: '2023-01-01',
    tags: ['Design', 'Research'],
    image: '/assets/blog-card-8.png',
    likes: 31,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '9',
    title: 'Our top 10 Javascript frameworks to use',
    content: `# Our top 10 Javascript frameworks to use

JavaScript frameworks make development easy with extensive features and functionalities.

## The Framework Landscape in 2023

The JavaScript ecosystem continues to evolve at a rapid pace. Here are the top 10 frameworks every developer should know.

## Top 10 Frameworks

### 1. React
Facebook's UI library dominates the market. Its component-based architecture and massive ecosystem make it a safe choice for most projects.

\`\`\`jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
\`\`\`

### 2. Vue.js
Progressive framework that's easy to learn and increasingly powerful. Excellent for teams transitioning from traditional web development.

### 3. Angular
Google's comprehensive framework includes everything out of the box: routing, state management, HTTP client, and more.

### 4. Next.js
React-based framework with built-in SSR, SSG, and a powerful routing system. The go-to for production React applications.

### 5. Nuxt.js
The Vue equivalent of Next.js. Excellent developer experience with automatic code splitting.

### 6. Svelte
Compiles to vanilla JavaScript at build time—no runtime framework overhead. Fastest apps, smallest bundles.

### 7. SolidJS
React-inspired but with fine-grained reactivity. Extremely performant without virtual DOM overhead.

### 8. Remix
Full-stack React framework focused on web fundamentals. Excellent for forms, loading states, and error handling.

### 9. Astro
Content-focused framework that ships zero JavaScript by default. Perfect for blogs and marketing sites.

### 10. Qwik
Resumable framework designed for instant page loads regardless of application complexity.

## How to Choose

- **React/Next.js**: Large ecosystem, lots of developers, most job postings
- **Vue/Nuxt**: Gentler learning curve, excellent documentation
- **Svelte/SolidJS**: Maximum performance, smaller bundle sizes
- **Astro**: Content sites, blogs, documentation

Choose based on your team's skills and your project's requirements, not hype.`,
    excerpt: 'JavaScript frameworks make development easy with extensive features and functionalities.',
    author: 'Drew Cano',
    publishDate: '2023-01-01',
    tags: ['Software Development', 'Tools', 'SaaS'],
    image: '/assets/blog-card-9.png',
    likes: 58,
    bookmarked: false,
    likedByUser: false,
  },
  {
    id: '10',
    title: 'Podcast: Creating a better CX Community',
    content: `# Podcast: Creating a better CX Community

Starting a community doesn't need to be complicated, but how do you get started?

## Why Community Matters for CX

Customer experience doesn't end at the product—it extends to the community around it. The most successful products have passionate user communities that extend the brand far beyond what any marketing team could achieve.

## Episode Highlights

In this episode, we spoke with community builders from Slack, Notion, and Figma about their approaches to community-led growth.

### Key Themes

**1. Start with your most engaged users**
Don't try to build a community for everyone immediately. Find your 10-50 most passionate users and serve them exceptionally well first.

**2. Give before you take**
Successful communities lead with value. Before asking anything of members, provide resources, recognition, and genuine connection.

**3. Community is a product**
Treat your community with the same product thinking you apply to your core product:
- Define clear outcomes for members
- Measure engagement and retention
- Iterate based on feedback

**4. The moderator's role**
Great community managers are part host, part therapist, part product manager. They set the tone for all interactions.

## Getting Started

\`\`\`
Week 1: Identify your first 10 community members
Week 2: Host a private kickoff call
Week 3: Create a shared space (Slack, Discord, Circle)
Week 4: Establish community norms together
Month 2: Open to a broader audience
\`\`\`

## Resources Mentioned

- **Community-Led Growth** by Commsor
- **The Business of Belonging** by David Spinks
- **Buzzing Communities** by Richard Millington

The best time to start building your community was yesterday. The second best time is today.`,
    excerpt: 'Starting a community doesn\'t need to be complicated, but how do you get started?',
    author: 'Orlando Diggs',
    publishDate: '2023-01-01',
    tags: ['Podcasts', 'Customer Success'],
    image: '/assets/blog-card-10.png',
    likes: 43,
    bookmarked: false,
    likedByUser: false,
  },
];

// ===================================================
// Action types
// ===================================================

/** ACTIONS - Canonical set of action type strings for the blog reducer. */
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

// ===================================================
// Reducer
// ===================================================

/**
 * blogReducer - Pure reducer function for blog state transitions.
 *
 * Contract:
 *   - Input: state { posts, searchQuery, activeTag }, action { type, payload }
 *   - Output: new state (immutable)
 *   - Side effects: none
 *   - Invariant: state always has posts array, searchQuery string, activeTag string
 */
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

// ===================================================
// Initial state factory
// ===================================================

/**
 * getInitialState - Reads state from localStorage or falls back to initialPosts.
 *
 * Contract:
 *   - Input: none
 *   - Output: { posts, searchQuery, activeTag }
 *   - Side effects: reads localStorage
 *   - Error handling: catches parse errors and falls back to initialPosts
 */
const getInitialState = () => {
  try {
    const saved = localStorage.getItem('blogPosts');
    const posts = saved ? JSON.parse(saved) : initialPosts;
    return { posts, searchQuery: '', activeTag: '' };
  } catch {
    return { posts: initialPosts, searchQuery: '', activeTag: '' };
  }
};

// ===================================================
// Context
// ===================================================

const BlogContext = createContext(null);

// ===================================================
// Provider
// ===================================================

/**
 * BlogProvider - Provides blog state and actions to the component tree.
 *
 * Contract:
 *   - Inputs: children React nodes
 *   - Outputs: BlogContext.Provider with full blog API
 *   - Side effects: persists posts to localStorage on change
 */
// PUBLIC_INTERFACE
export function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, null, getInitialState);

  // Persist posts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('blogPosts', JSON.stringify(state.posts));
    } catch (e) {
      console.error('Failed to save posts to localStorage', e);
    }
  }, [state.posts]);

  // -----------------------------------------------
  // Action creators
  // -----------------------------------------------

  /** addPost - Creates a new post and adds it to the front of the list. */
  // PUBLIC_INTERFACE
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

  /** updatePost - Replaces a post by id. */
  // PUBLIC_INTERFACE
  const updatePost = (post) => {
    dispatch({ type: ACTIONS.UPDATE_POST, payload: post });
  };

  /** deletePost - Removes a post by id. */
  // PUBLIC_INTERFACE
  const deletePost = (id) => {
    dispatch({ type: ACTIONS.DELETE_POST, payload: id });
  };

  /** toggleLike - Flips likedByUser and adjusts like count. */
  // PUBLIC_INTERFACE
  const toggleLike = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_LIKE, payload: id });
  };

  /** toggleBookmark - Flips bookmarked state. */
  // PUBLIC_INTERFACE
  const toggleBookmark = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_BOOKMARK, payload: id });
  };

  /** setSearch - Updates the search query string. */
  // PUBLIC_INTERFACE
  const setSearch = (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: query });
  };

  /** setTagFilter - Updates the active tag filter. */
  // PUBLIC_INTERFACE
  const setTagFilter = (tag) => {
    dispatch({ type: ACTIONS.SET_TAG_FILTER, payload: tag });
  };

  // -----------------------------------------------
  // Derived data
  // -----------------------------------------------

  /**
   * getFilteredPosts - Returns posts matching the current search + tag filters.
   *
   * Contract:
   *   - Pure computation from state (no side effects)
   *   - Returns all posts when no filters are active
   */
  // PUBLIC_INTERFACE
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

  /**
   * getAllTags - Returns sorted unique tags from all posts.
   */
  // PUBLIC_INTERFACE
  const getAllTags = () => {
    const tagSet = new Set();
    state.posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  };

  /**
   * getPostById - Finds a single post by id.
   */
  // PUBLIC_INTERFACE
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

// ===================================================
// Custom hook
// ===================================================

/**
 * useBlog - Custom hook to access BlogContext.
 *
 * Contract:
 *   - Must be used within a BlogProvider
 *   - Throws if used outside provider
 *   - Returns full blog API object
 */
// PUBLIC_INTERFACE
export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}

export { ACTIONS };
export default BlogContext;
