class User {
  static all = [];

  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.address = user.address;
    this.phone = user.phone;
    this.website = user.website;
    this.company = user.company;
    User.all = [...User.all, this];
  }

  static all() {
    // Use this class method to get all the Users that have been pulled from the API.

    return all;
  }

  static renderAllUsers() {
    /* 
        This class method will append a new table to the root div displaying all the users.
        When a user clickes on one of the users within the table a onClick event will be 
        fired calling the the renderUserPost class method from Post passing in the user 
        and will call removeAllChildNodes within the method removeing the user table from 
        the DOM and rendering a new table containing all the posts belonging to the user that was clicked.
    */

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    thead.innerHTML = `
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Website</th>
      </tr>
    `;

    User.all.map((user) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.website}</td>
      `;

      tr.addEventListener("click", () => Post.renderUserPosts(user));
      tr.className = "users-table";
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    root.appendChild(table);
  }
}
