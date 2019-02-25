const newPassword = () => {
  const passwordValue = document.getElementById('password');
  const passwordAgainValue = document.getElementById('passwordAgain');
  const div = document.getElementById('err');
  const success = document.getElementById('success');
  const spinner = document.getElementById('spinner');
  const password = passwordValue.value;
  const passwordAgain = passwordAgainValue.value;
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const url = 'http://localhost:8080/api/v1/auth/reset';
  const data = { password, passwordAgain, token };
  const options = {
    method: 'PATCH',
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
    spinner.setAttribute('hidden', '');
    div.innerHTML = '';
    if (json.status !== 202) {
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
    } else {
      div.style.display = 'none';
      success.style.display = 'block';
      success.innerHTML = `<p> ${json.message} </p>`;
      setTimeout(() => window.location.assign('login.html'), 2000);
    }
  };
  request();
};
const btn = document.querySelector('.btn');
btn.addEventListener('click', (event) => {
  event.preventDefault();
  newPassword();
});
