import React from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import EditPost from './components/EditPost';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <header className="header">
          <h1>MERN Blog</h1>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/new">New Post</Link>
          </nav>
        </header>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
          <main>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/new" element={<PostForm />} />
              <Route path="/edit/:id" element={<EditPost />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );

}


export default App;