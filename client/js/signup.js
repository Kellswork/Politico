
const signUp = () => {
  const div = document.getElementById('err');
  const signupForm = document.getElementById('signupForm');
  const spinner = document.getElementById('spinner');
  const formData = new FormData(signupForm);
  const url = 'http://localhost:8080/api/v1/auth/signup';
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    referrer: 'no-referrer',
    body: formData,
  };
  const request = async () => {
    spinner.removeAttribute('hidden');
    const response = await fetch(url, options);
    const json = await response.json();
    div.innerHTML = '';
    spinner.setAttribute('hidden', '');
    if (json.status === 400) {
      json.error.forEach((element) => {
        const content = `<p>${element}</p>`;
        div.style.display = 'block';
        div.style.color = 'red';
        div.innerHTML += content;
      });
    }
    if (json.status === 201) {
      div.style.display = 'none';
      window.localStorage.setItem('token', json.data.token);
      window.localStorage.setItem('userid', json.data.user.id);
      window.localStorage.setItem('firstname', json.data.user.firstName);
      window.location.replace = 'user/dashboard.html';
    }
  };

  request();
};

const signupbtn = document.querySelector('.btn');
signupbtn.addEventListener('click', (event) => {
  event.preventDefault();
  signUp();
});