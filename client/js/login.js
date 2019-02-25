async function login() {
  const div = document.getElementById('err');
  const spinner = document.getElementById('spinner');
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const url = 'http://localhost:8080/api/v1/auth/login';

  const data = {
    email,
    password,
  };

  // const json = await fetchCall('/auth/login', 'POST', data);
  // console.log(json);

  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  };
  const request = async () => {
    spinner.removeAttribute('hidden');
    const response = await fetch(url, options);
    const json = await response.json();
    div.innerHTML = '';
    spinner.setAttribute('hidden', '');
    if (json.status !== 200) {
      if (Array.isArray(json.error)) {
        json.error.forEach((element) => {
          const content = `<p>${element}</p>`;
          div.style.display = 'block';
          div.innerHTML += content;
        });
      } else {
        div.style.display = 'block';
        div.innerHTML = `<p> ${json.error} </p>`;
      }
    }
    if (json.status === 200) {
      div.style.display = 'none';
      window.localStorage.setItem('token', json.data.token);
      window.localStorage.setItem('userid', json.data.user.id);
      window.localStorage.setItem('admin', json.data.user.isAdmin);
      if (json.data.user.isAdmin === true) {
        window.location.replace('admin/dashboard.html');
      } else {
        window.location.replace('user/dashboard.html');
      }
    }
  };
  request();
}

const loginbtn = document.querySelector('.btn');
loginbtn.addEventListener('click', (event) => {
  event.preventDefault();
  login();
});
