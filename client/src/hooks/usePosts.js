// usePosts.js - Custom hook for managing posts

import { useState, useEffect } from 'react';
import { postService } from '../services/api';

export const usePosts = (page = 1, limit = 10, category = null, search = null) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await postService.getAllPosts(page, limit, category, search);
      setPosts(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, limit, category, search]);

  const createPost = async (postData) => {
    try {
      const response = await postService.createPost(postData);
      setPosts(prev => [response.data, ...prev]);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const response = await postService.updatePost(id, postData);
      setPosts(prev => prev.map(post => 
        post._id === id ? response.data : post
      ));
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(prev => prev.filter(post => post._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const refreshPosts = () => {
    fetchPosts();
  };

  return {
    posts,
    loading,
    error,
    pagination,
    createPost,
    updatePost,
    deletePost,
    refreshPosts,
  };
};

export const usePost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await postService.getPost(id);
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const addComment = async (commentData) => {
    try {
      const response = await postService.addComment(id, commentData);
      setPost(prev => ({
        ...prev,
        comments: response.data,
      }));
      return response;
    } catch (err) {
      throw err;
    }
  };

  return {
    post,
    loading,
    error,
    addComment,
  };
};

