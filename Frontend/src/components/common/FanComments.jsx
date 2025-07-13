import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Trash2,
  Pencil,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Smile,
  Frown,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [feedbackPopup, setFeedbackPopup] = useState({ show: false, type: '', message: '', position: { x: 0, y: 0 } });
  const [likeAnimation, setLikeAnimation] = useState({ show: false, commentId: null, type: '' });

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

  const showFeedbackPopup = (type, message, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setFeedbackPopup({
      show: true,
      type,
      message,
      position: { x: rect.left + rect.width / 2, y: rect.top - 10 }
    });
    
    setTimeout(() => {
      setFeedbackPopup({ show: false, type: '', message: '', position: { x: 0, y: 0 } });
    }, 2000);
  };

  const handleLike = async (commentId, event) => {
    if (!isAuthenticated) {
      showFeedbackPopup('error', 'Please login to like comments', event);
      return;
    }

    const comment = comments.find(c => c._id === commentId);
    const wasLiked = hasLiked(comment);
    const wasDisliked = hasDisliked(comment);

    try {
      if (wasLiked) {
        // If already liked, withdraw the like
        await likeComment(commentId, 'withdraw');
        showFeedbackPopup('info', 'Like removed', event);
      } else {
        // If not liked, add like
        await likeComment(commentId);
        
        // Show like animation
        setLikeAnimation({ show: true, commentId, type: 'like' });
        setTimeout(() => setLikeAnimation({ show: false, commentId: null, type: '' }), 1000);
        
        showFeedbackPopup('success', 'Comment liked!', event);
      }
    } catch (error) {
      showFeedbackPopup('error', 'Failed to like comment', event);
    }
  };

  const handleDislike = async (commentId, event) => {
    if (!isAuthenticated) {
      showFeedbackPopup('error', 'Please login to dislike comments', event);
      return;
    }

    const comment = comments.find(c => c._id === commentId);
    const wasDisliked = hasDisliked(comment);
    const wasLiked = hasLiked(comment);

    try {
      if (wasDisliked) {
        // If already disliked, withdraw the dislike
        await dislikeComment(commentId, 'withdraw');
        showFeedbackPopup('info', 'Dislike removed', event);
      } else {
        // If not disliked, add dislike
        await dislikeComment(commentId);
        
        // Show dislike animation
        setLikeAnimation({ show: true, commentId, type: 'dislike' });
        setTimeout(() => setLikeAnimation({ show: false, commentId: null, type: '' }), 1000);
        
        showFeedbackPopup('success', 'Comment disliked', event);
      }
    } catch (error) {
      showFeedbackPopup('error', 'Failed to dislike comment', event);
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
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Feedback Popup */}
      <AnimatePresence>
        {feedbackPopup.show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-50 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm border ${
              feedbackPopup.type === 'success' 
                ? 'bg-green-500/90 border-green-400 text-white' 
                : feedbackPopup.type === 'error'
                ? 'bg-red-500/90 border-red-400 text-white'
                : feedbackPopup.type === 'info'
                ? 'bg-blue-500/90 border-blue-400 text-white'
                : 'bg-purple-500/90 border-purple-400 text-white'
            }`}
            style={{
              left: feedbackPopup.position.x - 100,
              top: feedbackPopup.position.y,
            }}
          >
            <div className="flex items-center gap-2">
              {feedbackPopup.type === 'success' && <CheckCircle className="w-4 h-4" />}
              {feedbackPopup.type === 'error' && <XCircle className="w-4 h-4" />}
              {feedbackPopup.type === 'info' && <Smile className="w-4 h-4" />}
              <span className="text-sm font-medium">{feedbackPopup.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Fan Comments for {title}
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {!isAuthenticated ? (
          <div className="text-center py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl">
            <p className="text-white font-semibold text-sm sm:text-base">Please log in to comment</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs sm:text-sm text-gray-300 font-semibold">
                Commenting as: {user?.username}
              </span>
            </div>
            <textarea
              placeholder="Write your thoughts..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium text-sm sm:text-base"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-bold text-sm sm:text-base"
            >
              Post Comment
            </motion.button>
          </>
        )}
      </form>

      {/* Comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-white text-sm sm:text-base">{getUsername(comment)}</h4>
                <p className="text-xs sm:text-sm text-gray-300">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
              <div className="flex gap-1 sm:gap-2">
                {canDelete(comment) && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setEditingId(comment._id);
                        setEditMessage(comment.message);
                      }}
                      className="hover:opacity-70 transition-opacity p-1 rounded bg-white/10 hover:bg-white/20"
                    >
                      <Pencil className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteComment(comment._id)}
                      className="hover:opacity-70 transition-opacity p-1 rounded bg-red-500 hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {editingId === comment._id ? (
              <>
                <textarea
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-white/20 rounded bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUpdate(comment._id)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-4 py-1 rounded hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-semibold text-xs sm:text-sm"
                  >
                    Update
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditingId(null)}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 sm:px-4 py-1 rounded hover:bg-white/20 transition-all duration-300 font-semibold text-xs sm:text-sm"
                  >
                    Cancel
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <p className="text-white mt-1 mb-2 font-medium text-sm sm:text-base leading-relaxed">{comment.message}</p>
                
                {/* Like/Dislike Animation Overlay */}
                <AnimatePresence>
                  {likeAnimation.show && likeAnimation.commentId === comment._id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: -20 }}
                      exit={{ opacity: 0, scale: 0, y: -40 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.5, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 0.8 }}
                        className={`text-4xl ${
                          likeAnimation.type === 'like' ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {likeAnimation.type === 'like' ? '👍' : '👎'}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-1.5 transition-all duration-300 p-2.5 sm:p-3 rounded-xl ${
                      hasLiked(comment) 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25' 
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:shadow-md hover:border-green-400/50'
                    }`}
                    onClick={(e) => handleLike(comment._id, e)}
                    disabled={!isAuthenticated}
                    title={hasLiked(comment) ? 'Click to withdraw like' : 'Click to like'}
                  >
                    <motion.div
                      animate={hasLiked(comment) ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <ThumbsUp className={`w-4 h-4 sm:w-5 sm:h-5 ${hasLiked(comment) ? 'fill-current' : ''}`} />
                    </motion.div>
                    <span className="font-semibold text-sm sm:text-base">{comment.likes?.length || 0}</span>
                    
                    {/* Like pulse effect */}
                    {hasLiked(comment) && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-green-400/20"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-1.5 transition-all duration-300 p-2.5 sm:p-3 rounded-xl ${
                      hasDisliked(comment) 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' 
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:shadow-md hover:border-red-400/50'
                    }`}
                    onClick={(e) => handleDislike(comment._id, e)}
                    disabled={!isAuthenticated}
                    title={hasDisliked(comment) ? 'Click to withdraw dislike' : 'Click to dislike'}
                  >
                    <motion.div
                      animate={hasDisliked(comment) ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <ThumbsDown className={`w-4 h-4 sm:w-5 sm:h-5 ${hasDisliked(comment) ? 'fill-current' : ''}`} />
                    </motion.div>
                    <span className="font-semibold text-sm sm:text-base">{comment.dislikes?.length || 0}</span>
                    
                    {/* Dislike pulse effect */}
                    {hasDisliked(comment) && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-red-400/20"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
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
