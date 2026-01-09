// Authentication handling module - Browser Compatible
(function(global) {
  'use strict';

  var api = global.api;
  var currentUser = null;

  // Check if user is logged in
  function isLoggedIn() {
    return api.isAuthenticated();
  }

  // Get current user
  function getCurrentUser() {
    return currentUser;
  }

  // Login user
  function login(email, password) {
    return api.login(email, password)
      .then(function(user) {
        currentUser = {
          _id: user._id,
          username: user.username,
          email: user.email
        };
        return { success: true, user: currentUser };
      })
      .catch(function(error) {
        return { success: false, error: error.message };
      });
  }

  // Signup user
  function signup(username, email, password) {
    return api.signup(username, email, password)
      .then(function(user) {
        currentUser = {
          _id: user._id,
          username: user.username,
          email: user.email
        };
        return { success: true, user: currentUser };
      })
      .catch(function(error) {
        return { success: false, error: error.message };
      });
  }

  // Logout user
  function logout() {
    api.logout();
    currentUser = null;
    window.location.href = '/index.html';
  }

  // Initialize auth state
  function initAuth() {
    return new Promise(function(resolve) {
      if (api.isAuthenticated()) {
        api.getMe()
          .then(function(user) {
            currentUser = user;
            resolve(true);
          })
          .catch(function(error) {
            // Token invalid, logout
            logout();
            resolve(false);
          });
      } else {
        resolve(false);
      }
    });
  }

  // Update navigation based on auth state
  function updateNav(isLoggedIn, user) {
    var navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    if (isLoggedIn && user) {
      navContainer.innerHTML = '<span class="user-name">Welcome, ' + escapeHtml(user.username) + '</span>' +
        '<a href="/dashboard.html" class="btn btn-secondary btn-small">Dashboard</a>' +
        '<button id="logout-btn" class="btn btn-secondary btn-small">Logout</button>';

      var logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
      }
    } else {
      navContainer.innerHTML = '<a href="/login.html" class="btn btn-secondary btn-small">Login</a>' +
        '<a href="/signup.html" class="btn btn-primary btn-small">Sign Up</a>';
    }
  }

  // Helper to escape HTML
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Export functions
  global.auth = {
    isLoggedIn: isLoggedIn,
    getCurrentUser: getCurrentUser,
    login: login,
    signup: signup,
    logout: logout,
    initAuth: initAuth,
    updateNav: updateNav,
    escapeHtml: escapeHtml
  };

})(this);

