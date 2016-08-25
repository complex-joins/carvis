module.exports = {
  login(token) {
    localStorage.token = token;
    this.onChange(true);
  },

  loggedIn() {
    return !!localStorage.token;
  },

  logout() {
    delete localStorage.token;
    this.onChange(false);
  },

  onChange() {}
};