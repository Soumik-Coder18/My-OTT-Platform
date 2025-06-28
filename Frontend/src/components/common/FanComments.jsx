import React, { useState } from 'react';
import {
  MessageSquare,
  Trash2,
  Pencil,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { useFanComments } from '../../hooks/useFanComments';

const FanComments = ({ title = 'default' }) => {
  const {
    comments,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    dislikeComment,
  } = useFanComments(title);

  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;
    addComment(author.trim(), message.trim());
    setAuthor('');
    setMessage('');
  };

  const handleUpdate = (id) => {
    if (!editMessage.trim()) return;
    updateComment(id, editMessage.trim());
    setEditingId(null);
    setEditMessage('');
  };

  const hasLiked = (comment) => comment.likes.includes(author.trim());
  const hasDisliked = (comment) => comment.dislikes.includes(author.trim());

  const handleLike = (id) => {
    const comment = comments.find((c) => c.id === id);
    if (!author.trim()) return alert("Please enter your name to react.");

    if (hasLiked(comment)) {
      likeComment(id, 'remove', author.trim());
    } else {
      if (hasDisliked(comment)) {
        dislikeComment(id, 'remove', author.trim());
      }
      likeComment(id, 'add', author.trim());
    }
  };

  const handleDislike = (id) => {
    const comment = comments.find((c) => c.id === id);
    if (!author.trim()) return alert("Please enter your name to react.");

    if (hasDisliked(comment)) {
      dislikeComment(id, 'remove', author.trim());
    } else {
      if (hasLiked(comment)) {
        likeComment(id, 'remove', author.trim());
      }
      dislikeComment(id, 'add', author.trim());
    }
  };

  const formatDate = (ts) => new Date(ts).toLocaleString();

  return (
    <section className="bg-[#DED3C4] p-6 rounded-2xl shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="text-[#555879] w-6 h-6" />
        <h3 className="text-2xl font-semibold text-[#555879]">
          Fan Comments for {title}
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-[#bbb] bg-[#F4EBD3] text-[#555879] focus:outline-none focus:ring-2 focus:ring-[#555879]"
        />
        <textarea
          placeholder="Write your thoughts..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 rounded-xl border border-[#bbb] bg-[#F4EBD3] text-[#555879] focus:outline-none focus:ring-2 focus:ring-[#555879]"
        />
        <button
          type="submit"
          className="bg-[#555879] text-[#F4EBD3] px-6 py-2 rounded-xl hover:opacity-90"
        >
          Post Comment
        </button>
      </form>

      {/* Comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-[#F4EBD3] rounded-xl p-4 border mb-4 shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-[#555879]">{comment.author}</h4>
                <p className="text-sm text-[#888da8]">
                  Last updated: {formatDate(comment.updatedAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditMessage(comment.message);
                  }}
                >
                  <Pencil className="w-4 h-4 text-[#555879]" />
                </button>
                <button onClick={() => deleteComment(comment.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

            {editingId === comment.id ? (
              <>
                <textarea
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded bg-[#DED3C4] text-[#555879]"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleUpdate(comment.id)}
                    className="bg-[#555879] text-white px-4 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-[#bbb] px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-[#555879] mt-1 mb-2">{comment.message}</p>
                <div className="flex items-center gap-4">
                  <button
                    className={`flex items-center gap-1 ${
                      hasLiked(comment) ? 'text-green-600' : 'text-[#555879]'
                    }`}
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes.length}</span>
                  </button>
                  <button
                    className={`flex items-center gap-1 ${
                      hasDisliked(comment) ? 'text-red-600' : 'text-[#555879]'
                    }`}
                    onClick={() => handleDislike(comment.id)}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>{comment.dislikes.length}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-[#888da8] italic">No comments yet. Be the first to share!</p>
      )}
    </section>
  );
};

export default FanComments;
