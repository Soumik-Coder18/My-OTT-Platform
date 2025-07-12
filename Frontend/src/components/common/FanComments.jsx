import React, { useState } from 'react';
import {
  MessageSquare,
  Trash2,
  Pencil,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useComments } from '../../hooks/useComments';
import { useAuth } from '../../contexts/AuthContext';

const FanComments = ({ mediaId, mediaType = 'movie', title = 'default' }) => {
  const { user, isAuthenticated } = useAuth();
  const {
    comments,
    loading,
    addComment,
    deleteComment,
    likeComment,
    dislikeComment,
    hasLiked,
    hasDisliked,
    canDelete,
  } = useComments(mediaId, mediaType);

  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    await addComment(message.trim());
    setMessage('');
  };

  const handleUpdate = async (commentId) => {
    if (!editMessage.trim()) return;
    
    // For now, we'll delete and recreate the comment since the backend doesn't have update
    // In a real implementation, you'd add an update endpoint
    try {
      await deleteComment(commentId);
      await addComment(editMessage.trim());
      setEditingId(null);
      setEditMessage('');
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const handleLike = async (commentId) => {
    if (hasLiked(comments.find(c => c._id === commentId))) {
      // If already liked, withdraw the like
      await likeComment(commentId, 'withdraw');
    } else {
      // If not liked, add like
      await likeComment(commentId);
    }
  };

  const handleDislike = async (commentId) => {
    if (hasDisliked(comments.find(c => c._id === commentId))) {
      // If already disliked, withdraw the dislike
      await dislikeComment(commentId, 'withdraw');
    } else {
      // If not disliked, add dislike
      await dislikeComment(commentId);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getUsername = (comment) => {
    return comment.userId?.username || 'Anonymous';
  };

  if (loading) {
    return (
      <motion.section 
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            Fan Comments for {title}
          </h3>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
          <p className="text-gray-300 mt-2">Loading comments...</p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">
          Fan Comments for {title}
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {!isAuthenticated ? (
          <div className="text-center py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl">
            <p className="text-white font-semibold">Please log in to comment</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-300 font-semibold">
                Commenting as: {user?.username}
              </span>
            </div>
            <textarea
              placeholder="Write your thoughts..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-bold"
            >
              Post Comment
            </button>
          </>
        )}
      </form>

      {/* Comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-white">{getUsername(comment)}</h4>
                <p className="text-sm text-gray-300">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
              <div className="flex gap-2">
                {canDelete(comment) && (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(comment._id);
                        setEditMessage(comment.message);
                      }}
                      className="hover:opacity-70 transition-opacity p-1 rounded bg-white/10 hover:bg-white/20"
                    >
                      <Pencil className="w-4 h-4 text-white" />
                    </button>
                    <button 
                      onClick={() => deleteComment(comment._id)}
                      className="hover:opacity-70 transition-opacity p-1 rounded bg-red-500 hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {editingId === comment._id ? (
              <>
                <textarea
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-white/20 rounded bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleUpdate(comment._id)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-1 rounded hover:bg-white/20 transition-all duration-300 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-white mt-1 mb-2 font-medium">{comment.message}</p>
                <div className="flex items-center gap-4">
                  <button
                    className={`flex items-center gap-1 transition-all duration-300 p-2 rounded-lg ${
                      hasLiked(comment) 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:shadow-md'
                    }`}
                    onClick={() => handleLike(comment._id)}
                    disabled={!isAuthenticated}
                    title={hasLiked(comment) ? 'Click to withdraw like' : 'Click to like'}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-semibold">{comment.likes?.length || 0}</span>
                  </button>
                  <button
                    className={`flex items-center gap-1 transition-all duration-300 p-2 rounded-lg ${
                      hasDisliked(comment) 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:shadow-md'
                    }`}
                    onClick={() => handleDislike(comment._id)}
                    disabled={!isAuthenticated}
                    title={hasDisliked(comment) ? 'Click to withdraw dislike' : 'Click to dislike'}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="font-semibold">{comment.dislikes?.length || 0}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-300 italic font-medium">
            No comments yet. Be the first to share!
          </p>
        </div>
      )}
    </motion.section>
  );
};

export default FanComments;
