const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
};
  
const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};
  
const newBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const body = document.querySelector('#blog-body').value.trim();

  if (title && body) {
      const response = await fetch('/api/newpost', {
          method: 'POST',
          body: JSON.stringify({ title, body }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert(response.statusText);
      }
  }
};

const logOutHandler = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.replace('/login');
  } else {
      alert(response.statusText);
  }
};

const newComment = async (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const body = document.querySelector('#comment-box').value.trim();
    const response = await fetch('/api/newcomment', {
        method: 'POST',
        body: JSON.stringify({ body, blog_id: event.target.getAttribute("data-blog-id")}),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
  }
};

const updateBlogHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#blog-title').value.trim();
  const body = document.querySelector('#blog-body').value.trim();
  const id =   event.target.getAttribute("data-blog-id");

  if (title && body) {
      const response = await fetch('/api/updatepost', {
          method: 'PUT',
          body: JSON.stringify({ title, body, id }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert(response.statusText);
      }
  }
};

const deletePost = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("data-blog-id");
  var bool = confirm("Are you sure you want to delete this post?");
  if (bool) {
    const response = await fetch('/api/deletepost', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert(response.statusText);
  }
  }
}

if (document.querySelector('#login-button')) {
  document
    .querySelector('#login-button')
    .addEventListener('click', loginFormHandler);
}

if (document.querySelector('#signup-button')) {
  document
    .querySelector('#signup-button')
    .addEventListener('click', signupFormHandler);
}

if (document.querySelector('#new-blog-button')) {
  document
    .querySelector('#new-blog-button')
    .addEventListener('click', newBlogHandler);
}

if (document.querySelector('#logout')) {
  document
    .querySelector('#logout')
    .addEventListener('click', logOutHandler);
}

if (document.querySelector('#comment-box')) {
  document
    .querySelector('#comment-box')
    .addEventListener('keydown', newComment);
}

if (document.querySelector('#update-blog-button')) {
  document
    .querySelector('#update-blog-button')
    .addEventListener('click', updateBlogHandler);
}

if (document.querySelector('#delete-button')) {
  document
    .querySelector('#delete-button')
    .addEventListener('click', deletePost);
}