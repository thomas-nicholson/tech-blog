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
          document.location.replace('/');
      } else {
          alert(response.statusText);
      }
  }
};

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