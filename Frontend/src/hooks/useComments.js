import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { commentsApi } from '../services/commentsApi';

export const useComments = (mediaId, mediaType = 'movie') => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  // Load comments from backend
  useEffect(() => {
    const loadComments = async () => {
      if (!mediaId) return;
      
      try {
        setLoading(true);
        const backendComments = await commentsApi.getComments(mediaId);
        setComments(backendComments);
      } catch (error) {
        console.error('Failed to load comments:', error);
        showToast('Failed to load comments', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [mediaId]);

  const addComment = async (message) => {
    if (!isAuthenticated) {
      showToast('Please log in to comment', 'error');
      return;
    }

    if (!message.trim()) {
      showToast('Please enter a comment', 'error');
      return;
    }

    try {
      const newComment = await commentsApi.addComment(mediaId, mediaType, message.trim());
      setComments(prev => [newComment, ...prev]);
      showToast('Comment added successfully', 'success');
    } catch (error) {
      console.error('Failed to add comment:', error);
      showToast('Failed to add comment', 'error');
    }
  };

  const deleteComment = async (commentId) => {
    if (!isAuthenticated) {
      showToast('Please log in to delete comments', 'error');
      return;
    }

    try {
      await commentsApi.deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment._id !== commentId));
      showToast('Comment deleted successfully', 'success');
    } catch (error) {
      console.error('Failed to delete comment:', error);
      showToast('Failed to delete comment', 'error');
    }
  };

  const likeComment = async (commentId) => {
    if (!isAuthenticated) {
      showToast('Please log in to like comments', 'error');
      return;
    }

    try {
      await commentsApi.likeComment(commentId);
      // Refresh comments to get updated like count
      const updatedComments = await commentsApi.getComments(mediaId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Failed to like comment:', error);
      showToast('Failed to like comment', 'error');
    }
  };

  const dislikeComment = async (commentId) => {
    if (!isAuthenticated) {
      showToast('Please log in to dislike comments', 'error');
      return;
    }

    try {
      await commentsApi.dislikeComment(commentId);
      // Refresh comments to get updated dislike count
      const updatedComments = await commentsApi.getComments(mediaId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Failed to dislike comment:', error);
      showToast('Failed to dislike comment', 'error');
    }
  };

  const hasLiked = (comment) => {
    if (!isAuthenticated || !user) return false;
    return comment.likes.some(like => like === user.id || like._id === user.id);
  };

  const hasDisliked = (comment) => {
    if (!isAuthenticated || !user) return false;
    return comment.dislikes.some(dislike => dislike === user.id || dislike._id === user.id);
  };

  const canDelete = (comment) => {
    if (!isAuthenticated || !user) return false;
    return comment.userId === user.id || comment.userId._id === user.id;
  };

  return {
    comments,
    loading,
    addComment,
    deleteComment,
    likeComment,
    dislikeComment,
    hasLiked,
    hasDisliked,
    canDelete,
    isAuthenticated,
  };
}; 