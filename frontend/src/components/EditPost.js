import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function EditPost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await API.get(`/posts/${id}`);
            const { title, body, author } = response.data;
            setTitle(title);
            setBody(body);
            setAuthor(author);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to load post');
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/posts/${id}`, { title, body, author });
            navigate('/');
        } catch (err) {
            setError('Failed to update post');
        }
    };

    if (isLoading) {
        return <div className="loading-state">Loading post...</div>;
    }

    if (error) {
        return <div className="error-state">{error}</div>;
    }

    return (
        <div className="edit-container">
            <h2 className="edit-title">Edit Blog Post</h2>
            <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="body">Content</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Write your post content here..."
                        required
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Your name"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Update Post
                    </button>
                </div>
            </form>
        </div>
    );
}