const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Mock Database
let posts = [
    { id: 1, title: 'Getting Started with React', content: 'React is an excellent library...', views: 42 },
    { id: 2, title: 'Why Express is standard', content: 'Express keeps routing simple.', views: 112 }
];

// GET: Fetch all blog entries
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// POST: Add a new blog post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required fields.' });
    }
    const newPost = { id: posts.length + 1, title, content, views: 0 };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// SIMULATED BLOCKER ENDPOINT: Aggregating analytics counts
// NOTE FOR TESTING: This endpoint currently times out on heavy loads due to unoptimized loops.
app.get('/api/analytics/summary', async (req, res) => {
    // Intentionally unoptimized route to cause the stale PR scenario mentioned in the meeting script
    setTimeout(() => {
        const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
        res.json({ totalViews, postCount: posts.length });
    }, 4000); 
});

app.listen(PORT, () => {
    console.log(`DevPulse Mock Server running on port ${PORT}`);
});