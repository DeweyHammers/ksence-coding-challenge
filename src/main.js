const root = document.querySelector(".root");
const API = "https://jsonplaceholder.typicode.com";

const fetchUsers = () => {
  /* 
    Handle fetching all users from the API and creating a new User objects.
    Each User object is stored inside a static all method to be called through the app.
  */

  return fetch(`${API}/users`)
    .then((response) => response.json())
    .then((json) => json.map((user) => new User(user)));
};

const fetchPosts = () => {
  /* 
    Handle fetching all Posts from the API and creating a new Posts objects.
    Each Posts object is stored inside a static all method to be called through the app.
  */

  return fetch(`${API}/posts`)
    .then((response) => response.json())
    .then((json) => json.map((post) => new Post(post)));
};

const removeAllChildNodes = (parent) => {
  // This callback function is used to handle remove all the elements from the DOM.

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const run = async () => {
  // Call this function to execute the app.

  await fetchUsers();
  await fetchPosts();
  User.renderAllUsers();
};

run();
