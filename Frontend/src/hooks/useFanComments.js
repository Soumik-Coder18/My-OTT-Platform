import { useState, useEffect } from 'react';

export const useFanComments = (title = 'default') => {
  const localStorageKey = `fan-comments-${title}`;
  
  const [comments, setComments] = useState(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    // Migrate old data: convert likes/dislikes from number to array
    return parsed.map(c => ({
      ...c,
      likes: Array.isArray(c.likes) ? c.likes : [],
      dislikes: Array.isArray(c.dislikes) ? c.dislikes : [],
    }));
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(comments));
  }, [comments, localStorageKey]);

  const addComment = (author, message) => {
    const newComment = {
      id: Date.now(),
      author,
      message,
      updatedAt: Date.now(),
      likes: [],
      dislikes: [],
    };
    setComments(prev => [newComment, ...prev]);
  };

  const updateComment = (id, message) => {
    setComments(prev =>
      prev.map(c =>
        c.id === id ? { ...c, message, updatedAt: Date.now() } : c
      )
    );
  };

  const deleteComment = (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const likeComment = (id, action, user) => {
    setComments(prev =>
      prev.map(c => {
        if (c.id !== id) return c;

        const hasLiked = c.likes.includes(user);
        const hasDisliked = c.dislikes.includes(user);

        let updatedLikes = [...c.likes];
        let updatedDislikes = [...c.dislikes];

        if (action === 'add') {
          if (!hasLiked) {
            updatedLikes.push(user);
            if (hasDisliked) {
              updatedDislikes = updatedDislikes.filter(u => u !== user);
            }
          }
        } else if (action === 'remove') {
          updatedLikes = updatedLikes.filter(u => u !== user);
        }

        return {
          ...c,
          likes: updatedLikes,
          dislikes: updatedDislikes,
        };
      })
    );
  };

  const dislikeComment = (id, action, user) => {
    setComments(prev =>
      prev.map(c => {
        if (c.id !== id) return c;

        const hasLiked = c.likes.includes(user);
        const hasDisliked = c.dislikes.includes(user);

        let updatedLikes = [...c.likes];
        let updatedDislikes = [...c.dislikes];

        if (action === 'add') {
          if (!hasDisliked) {
            updatedDislikes.push(user);
            if (hasLiked) {
              updatedLikes = updatedLikes.filter(u => u !== user);
            }
          }
        } else if (action === 'remove') {
          updatedDislikes = updatedDislikes.filter(u => u !== user);
        }

        return {
          ...c,
          likes: updatedLikes,
          dislikes: updatedDislikes,
        };
      })
    );
  };

  return {
    comments,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    dislikeComment,
  };
};
