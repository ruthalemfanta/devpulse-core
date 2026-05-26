import React, { useState, useEffect } from 'react';

// This component serves as the main interface for the DevPulse Blog Workspace, allowing users to create and view blog posts. It interacts with a mock backend server to fetch and submit data, demonstrating a simple CRUD application structure. The design is kept minimalistic to focus on functionality and ease of use, with clear sections for creating new posts and viewing existing ones.

function App() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('http://localhost:5001/api/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error('Error fetching blog posts:', err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        })
            .then((res) => res.json())
            .then((newPost) => {
                setPosts([...posts, newPost]);
                setTitle('');
                setContent('');
            });
    };

    return (
        <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1>DevPulse Blog Workspace</h1>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                    type="text" placeholder="Post Title" value={title} 
                    onChange={(e) => setTitle(e.target.value)} required 
                    style={{ padding: '8px' }}
                />
                <textarea 
                    placeholder="Write your article here..." value={content} 
                    onChange={(e) => setContent(e.target.value)} required 
                    style={{ padding: '8px', minHeight: '100px' }}
                />
                <button type="submit" style={{ padding: '10px', background: '#0052CC', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Publish Post
                </button>
            </form>

            <h2>Articles Feed</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {posts.map((post) => (
                    <div key={post.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '4px' }}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small style={{ color: '#666' }}>Views: {post.views}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;