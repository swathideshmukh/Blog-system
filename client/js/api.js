// API utility for making HTTP requests - Browser Compatible
(function(global) {
  'use strict';

  var API_BASE_URL = '/api';

  function Api() {
    this.token = localStorage.getItem('token');
  }

  // Get headers for authenticated requests
  Api.prototype.getHeaders = function() {
    var headers = {
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
    }

    return headers;
  };

  // Set authentication token
  Api.prototype.setToken = function(token) {
    this.token = token;
    localStorage.setItem('token', token);
  };

  // Remove authentication token
  Api.prototype.removeToken = function() {
    this.token = null;
    localStorage.removeItem('token');
  };

  // Check if user is authenticated
  Api.prototype.isAuthenticated = function() {
    return !!this.token;
  };

  // Generic request method
  Api.prototype.request = function(endpoint, options) {
    var self = this;
    options = options || {};
    var url = API_BASE_URL + endpoint;
    var config = {
      method: options.method || 'GET',
      headers: Object.assign({}, this.getHeaders(), options.headers || {})
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    return fetch(url, config)
      .then(function(response) {
        return response.json().then(function(data) {
          if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
          }
          return data;
        });
      })
      .catch(function(error) {
        console.error('API Error:', error);
        throw error;
      });
  };

  // ===== Auth Endpoints =====

  Api.prototype.signup = function(username, email, password) {
    var self = this;
    return this.request('/auth/signup', {
      method: 'POST',
      body: { username: username, email: email, password: password }
    }).then(function(data) {
      if (data.token) {
        self.setToken(data.token);
      }
      return data;
    });
  };

  Api.prototype.login = function(email, password) {
    var self = this;
    return this.request('/auth/login', {
      method: 'POST',
      body: { email: email, password: password }
    }).then(function(data) {
      if (data.token) {
        self.setToken(data.token);
      }
      return data;
    });
  };

  Api.prototype.logout = function() {
    this.removeToken();
  };

  Api.prototype.getMe = function() {
    return this.request('/auth/me');
  };

  // ===== Post Endpoints =====

  Api.prototype.getPosts = function() {
    return this.request('/posts');
  };

  Api.prototype.getPost = function(id) {
    return this.request('/posts/' + id);
  };

  Api.prototype.createPost = function(title, content) {
    return this.request('/posts', {
      method: 'POST',
      body: { title: title, content: content }
    });
  };

  Api.prototype.updatePost = function(id, title, content) {
    return this.request('/posts/' + id, {
      method: 'PUT',
      body: { title: title, content: content }
    });
  };

  Api.prototype.deletePost = function(id) {
    return this.request('/posts/' + id, {
      method: 'DELETE'
    });
  };

  Api.prototype.getMyPosts = function() {
    return this.request('/posts/user/me');
  };

  // ===== Comment Endpoints =====

  Api.prototype.addComment = function(postId, text) {
    return this.request('/posts/' + postId + '/comments', {
      method: 'POST',
      body: { text: text }
    });
  };

  Api.prototype.deleteComment = function(postId, commentId) {
    return this.request('/posts/' + postId + '/comments/' + commentId, {
      method: 'DELETE'
    });
  };

  // Export singleton instance
  var api = new Api();

  // Also export class for testing
  global.Api = Api;
  global.api = api;

})(typeof window !== 'undefined' ? window : this);

