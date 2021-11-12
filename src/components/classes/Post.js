class Post {
  static all = [];

  constructor(post) {
    this.userId = post.userId;
    this.id = post.id;
    this.title = post.title;
    this.body = post.body;
    Post.all = [...Post.all, this];
  }

  static all() {
    // Use this class method to get all the Posts that have been pulled from the API.

    return all;
  }

  static renderUserPosts(user) {
    /*  
      When this class method is called it will call removeAllChildNodes removing the user table
      and rendering a new posts table containing all the posts that blong to the user.
      There is a filter feature included to help the user sort out which posts they wish to see by name. 
      When button is clicked it will call removeAllChildNodes removing the posts table and
      call renderAllUsers class method from Users rendering a users table containing all 
      the users to the DOM.
    */

    removeAllChildNodes(root);
    const posts = Post.all.filter((post) => post.userId === user.id);
    const button = document.createElement("button");
    const h1 = document.createElement("h1");
    const input = document.createElement("input");
    const div = document.createElement("div");

    button.innerText = "Back to users";
    button.addEventListener("click", () => {
      removeAllChildNodes(root);
      User.renderAllUsers();
    });
    button.id = "back-button";
    input.id = "filter-input";
    input.type = "text";
    input.placeholder = "Filter Posts";
    input.addEventListener("keydown", (event) => {
      event.preventDefault();
      const checkForKey = event.code.includes("Key");
      const checkForNum = event.code.includes("Digit");

      if (event.key === "Backspace") {
        input.value = input.value.slice(0, -1);
      } else if (checkForKey || checkForNum) {
        input.value = `${input.value}` + event.key;
      }

      const filterPosts = posts.filter((post) =>
        post.title.includes(input.value)
      );

      filterPosts.length > 0 ? renderPosts(filterPosts) : renderPosts(posts);
    });
    h1.innerText = `All of ${user.name} posts`;
    h1.id = "post-owner";
    div.id = "post-tables";

    root.appendChild(button);
    root.appendChild(h1);
    root.appendChild(input);
    root.appendChild(div);

    const renderPosts = (posts) => {
      removeAllChildNodes(div);
      posts.map((post) => {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        thead.innerHTML = `
        <tr>
          <th>
            <h3>${post.title}</h3>
          </th>
        </tr>
        `;

        tbody.innerHTML = `
        <tr>
          <td>
           <p>${post.body}</p>
          </td>
        </tr>
        `;

        table.className = "post-table";
        table.appendChild(thead);
        table.appendChild(tbody);
        div.appendChild(table);
        root.appendChild(div);
      });
    };

    renderPosts(posts);
  }
}
