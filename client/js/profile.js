const name = document.getElementById('name');
const email = document.getElementById('email');
const profileImg = document.getElementById('profileImg');
const profileName = document.getElementById('profileName');
const phoneNumber = document.getElementById('phoneNumber');
const userId = localStorage.getItem('userid');
const spinner = document.getElementById('spinner');

const getUserDetails = async () => {
  const url = `https://politico-kell.herokuapp.com/api/v1/users/${userId}`;
  const token = window.localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      'x-auth-token': token,
    },
  };
  spinner.removeAttribute('hidden');
  const response = await fetch(url, options);
  const json = await response.json();
  console.log(json.data);
  if (json.status === 401) {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userid');
    window.localStorage.removeItem('admin');
    window.localStorage.removeItem('profileimg');
    window.localStorage.removeItem('firstname');
    window.location.href = '../login.html';
  }
  if (json.status === 500) {
    spinner.setAttribute('hidden', '');
  }
  setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
  profileImg.src = `${json.data.passporturl}`;
  profileName.textContent = json.data.firstname;
  name.textContent = `${json.data.firstname} ${json.data.lastname} ${json.data.othername}`;
  email.textContent = json.data.email;
  phoneNumber.textContent = json.data.phonenumber;
};
window.onload = getUserDetails();
