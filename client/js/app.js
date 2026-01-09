// Main application utilities - Browser Compatible
(function(global) {
  'use strict';

  var api = global.api;
  var auth = global.auth;

  // DOM utilities
  function showLoading(container) {
    container.innerHTML = '<div class="loading"><div class="loading-spinner"></div><p>Loading...</p></div>';
  }

  function showError(container, message) {
    container.innerHTML = '<div class="alert alert-error">' + escapeHtml(message) + '</div>';
  }

  function showEmpty(container, message) {
    message = message || 'No posts found';
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📝</div>' +
      '<h3 class="empty-state-title">' + message + '</h3>' +
      '<p>Be the first to create a post!</p></div>';
  }

  // Format date
  function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Truncate text
  function truncate(text, maxLength) {
    maxLength = maxLength || 150;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  // Create post card HTML
  function createPostCard(post) {
    return '<div class="card post-card" onclick="window.location.href=\'/post.html?id=' + post._id + '\'">' +
      '<h3 class="post-title">' + escapeHtml(post.title) + '</h3>' +
      '<p class="post-excerpt">' + escapeHtml(truncate(post.content, 200)) + '</p>' +
      '<div class="post-meta"><span class="post-author">By ' + escapeHtml(post.authorName) + '</span>' +
      '<span class="post-date">' + formatDate(post.createdAt) + '</span></div></div>';
  }

  // Create single post HTML
  function createSinglePostHTML(post, isOwner) {
    var html = '<article class="single-post">' +
      '<h1 class="single-post-title">' + escapeHtml(post.title) + '</h1>' +
      '<div class="single-post-meta"><span>By ' + escapeHtml(post.authorName) + '</span>' +
      '<span>' + formatDate(post.createdAt) + '</span>';
    
    if (post.updatedAt !== post.createdAt) {
      html += '<span>Updated: ' + formatDate(post.updatedAt) + '</span>';
    }
    
    html += '</div><div class="single-post-content">' + escapeHtml(post.content) + '</div>';
    
    if (isOwner) {
      html += '<div class="post-actions" style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border-color);">' +
        '<button onclick="editPost(\'' + post._id + '\')" class="btn btn-secondary">Edit Post</button>' +
        '<button onclick="deletePost(\'' + post._id + '\')" class="btn btn-danger">Delete Post</button></div>';
    }
    
    html += '</article>';
    return html;
  }

  // Create comments section HTML
  function createCommentsHTML(comments, currentUser) {
    if (!comments || comments.length === 0) {
      return '<div class="comments-section"><h3 class="comments-title">Comments</h3>' +
        '<p style="color: var(--text-light);">No comments yet. Be the first to comment!</p></div>';
    }

    var commentsList = comments.map(function(comment) {
      var html = '<div class="comment" id="comment-' + comment._id + '">' +
        '<div class="comment-header"><span class="comment-author">' + escapeHtml(comment.authorName) + '</span>' +
        '<span class="comment-date">' + formatDate(comment.createdAt) + '</span></div>' +
        '<p class="comment-text">' + escapeHtml(comment.text) + '</p>';
      
      if (currentUser && (currentUser._id === comment.author || currentUser._id === comment.author)) {
        html += '<button onclick="deleteComment(\'' + comment._id + '\')" class="btn btn-danger btn-small" style="margin-top: 8px;">Delete</button>';
      }
      
      html += '</div>';
      return html;
    }).join('');

    return '<div class="comments-section"><h3 class="comments-title">Comments (' + comments.length + ')</h3>' +
      '<div class="comment-list">' + commentsList + '</div></div>';
  }

  // Show alert message
  function showAlert(message, type) {
    type = type || 'info';
    // Remove existing alerts
    var existingAlert = document.querySelector('.alert');
    if (existingAlert) {
      existingAlert.remove();
    }

    var alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-' + type;
    alertDiv.textContent = message;

    var container = document.querySelector('.container');
    if (container) {
      container.insertBefore(alertDiv, container.firstChild);
      
      // Auto remove after 5 seconds
      setTimeout(function() {
        alertDiv.remove();
      }, 5000);
    }
  }

  // Get URL parameter
  function getUrlParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Navigation to page
  function navigateTo(page) {
    window.location.href = page;
  }

  // Edit post (redirect to dashboard with edit param)
  function editPost(postId) {
    window.location.href = '/dashboard.html?edit=' + postId;
  }

  // Delete post with confirmation
  function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    api.deletePost(postId)
      .then(function() {
        showAlert('Post deleted successfully', 'success');
        setTimeout(function() {
          window.location.href = '/dashboard.html';
        }, 1000);
      })
      .catch(function(error) {
        showAlert(error.message, 'error');
      });
  }

  // Delete comment
  function deleteComment(postId, commentId) {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    api.deleteComment(postId, commentId)
      .then(function() {
        showAlert('Comment deleted', 'success');
        // Remove from DOM
        var commentEl = document.getElementById('comment-' + commentId);
        if (commentEl) {
          commentEl.remove();
        }
      })
      .catch(function(error) {
        showAlert(error.message, 'error');
      });
  }

  // Helper to escape HTML
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Export functions
  global.app = {
    showLoading: showLoading,
    showError: showError,
    showEmpty: showEmpty,
    formatDate: formatDate,
    truncate: truncate,
    createPostCard: createPostCard,
    createSinglePostHTML: createSinglePostHTML,
    createCommentsHTML: createCommentsHTML,
    showAlert: showAlert,
    getUrlParam: getUrlParam,
    navigateTo: navigateTo
  };

  // Expose functions globally for inline handlers
  global.editPost = editPost;
  global.deletePost = deletePost;
  global.deleteComment = deleteComment;

})(this);

