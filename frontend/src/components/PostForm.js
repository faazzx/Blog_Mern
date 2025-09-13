import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function PostForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await API.post('/posts', { title, body, author });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to create post');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Create New Blog Post</h2>
            <form onSubmit={handleSubmit} className="post-form">
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}