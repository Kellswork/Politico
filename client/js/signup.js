
const signUp = () => {
  const div = document.getElementById('err');
  const signupForm = document.getElementById('signupForm');
  const spinner = document.getElementById('spinner');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
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

    if (json.status === 400) {
      json.error.forEach((element) => {
        const content = `<p>${element}</p>`;
        div.style.display = 'block';
        div.style.color = 'red';
        spinner.setAttribute('hidden', '');
        div.innerHTML += content;
      });
    }
    if (json.status === 201) {
      div.style.display = 'none';
      spinner.setAttribute('hidden', '');
      window.localStorage.setItem('email', email);
      window.localStorage.setItem('password', password);
      window.location.href = 'user/dashboard.html';
    }
  };

  request();
};

const signupbtn = document.querySelector('.btn');
signupbtn.addEventListener('click', (event) => {
  event.preventDefault();
  signUp();
});
