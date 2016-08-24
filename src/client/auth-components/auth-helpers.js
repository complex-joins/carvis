// TODO: dont just look for presence of token but send to server to validate
// when logging in via uber/lyft, call this.onChange(true) and do the other things that happen in login from example

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