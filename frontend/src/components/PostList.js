import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await API.get('/posts');
        setPosts(response.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            await API.delete(`/posts/${id}`);
            fetchPosts();
        }
    };

    return (
        <div className="posts-list">
            {posts.map((post) => (
                <article key={post._id} className="post-item">
                    <div className="post-header">
                        <h2 className="post-title">{post.title}</h2>
                        <span className="post-author">Written by {post.author}</span>
                    </div>
                    <div className="post-content">
                        <p>{post.body}</p>
                    </div>
                    <div className="post-actions">
                        <Link to={`/edit/${post._id}`} className="action-btn edit-btn">
                            Edit Post
                        </Link>
                        <button
                            onClick={() => handleDelete(post._id)}
                            className="action-btn delete-btn"
                        >
                            Delete Post
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}