const form = document.querySelector('#myForm');
const resetMsg = document.querySelector('#resetInfo');
const para = document.querySelector('#serverInfo');
const div = document.getElementById('err');
const urlParams = new URLSearchParams(window.location.search);
const tokenErr = urlParams.get('err');
if (tokenErr) {
  div.style.display = 'block';
  div.innerHTML = `<p> ${tokenErr} </p>`;
}
function passwordReset() {
  const email = document.getElementById('email').value;
  const spinner = document.getElementById('spinner');
  const url = 'https://politico-kell.herokuapp.com/api/v1/auth/reset';
  const data = { email };
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
    spinner.setAttribute('hidden', '');
    if (json.status === 400) {
      div.style.display = 'block';
      div.innerHTML = `<p> ${json.error} </p>`;
    } else {
      div.style.display = '';
      form.style.display = 'none';
      resetMsg.textContent = 'PASSWORD RESET LINK SENT';
      para.textContent = json.data[0].message;
    }
  };
  request();
}

const resetbtn = document.querySelector('.btn');
resetbtn.addEventListener('click', (event) => {
  event.preventDefault();
  passwordReset();
});
