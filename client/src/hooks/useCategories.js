// useCategories.js - Custom hook for managing categories

import { useState, useEffect } from 'react';
import { categoryService } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (categoryData) => {
    try {
      const response = await categoryService.createCategory(categoryData);
      setCategories(prev => [...prev, response.data]);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const refreshCategories = () => {
    fetchCategories();
  };

  return {
    categories,
    loading,
    error,
    createCategory,
    refreshCategories,
  };
};

