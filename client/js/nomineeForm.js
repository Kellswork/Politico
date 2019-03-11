const token = window.localStorage.getItem('token');
const spinner = document.getElementById('spinner');
const partyDropDown = async () => {
  const selectParty = document.getElementById('selectParty');
  selectParty.length = 0;

  const defaultOption = document.createElement('option');
  defaultOption.textContent = '--Please choose a party--';
  selectParty.add(defaultOption);
  defaultOption.selectedIndex = 0;
  const url = 'https://politico-kell.herokuapp.com/api/v1/parties';
  const options = {
    method: 'GET',
    headers: {
      'x-auth-token': token,
    },
  };

  const response = await fetch(url, options);
  const json = await response.json();
  if (json.status === 401) {
    window.localStorage.removeItem('token');
    window.location.href = '../login.html';
  }
  if (json.status === 404) {
    const option = document.createElement('option');
    option.textContent = json.error;
    selectParty.add(option);
  }
  json.data.forEach((info) => {
    const option = document.createElement('option');
    option.textContent = info.name;
    option.id = info.id;
    selectParty.add(option);
  });
};
window.onload = partyDropDown();

const officeDropDown = async () => {
  const selectOffice = document.getElementById('selectOffice');
  selectOffice.length = 0;

  const defaultOption = document.createElement('option');
  defaultOption.textContent = '--Please choose an office--';
  selectOffice.add(defaultOption);
  defaultOption.selectedIndex = 0;
  const url = 'https://politico-kell.herokuapp.com/api/v1/offices';
  const options = {
    method: 'GET',
    headers: {
      'x-auth-token': token,
    },
  };
  spinner.removeAttribute('hidden');
  const response = await fetch(url, options);
  const json = await response.json();
  setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
  if (json.status === 404) {
    const option = document.createElement('option');
    option.textContent = json.error;
    selectOffice.add(option);
  }
  json.data.forEach((info) => {
    const option = document.createElement('option');
    option.textContent = info.name;
    option.id = info.id;
    option.value = info.type;
    selectOffice.add(option);
  });
};
window.onload = officeDropDown();

const nomineeForm = async () => {
  const div = document.getElementById('err');
  const success = document.getElementById('success');
  const userId = localStorage.getItem('userid');
  const manifesto = document.getElementById('msg').value;
  const selectParty = document.getElementById('selectParty');
  const partyId = selectParty.options[selectParty.selectedIndex].id;
  const selectOffice = document.getElementById('selectOffice');
  const officeId = selectOffice.options[selectOffice.selectedIndex].id;

  const url = 'https://politico-kell.herokuapp.com/api/v1/offices/nominee';
  const data = {
    officeId,
    partyId,
    userId,
    manifesto,
  };
  console.log(data);
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  spinner.removeAttribute('hidden');
  const response = await fetch(url, options);
  const json = await response.json();
  setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
  if (json.status !== 201) {
    if (Array.isArray(json.error)) {
      success.style.display = 'none';
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
    success.innerHTML = '<p>Your Answers have been submited successfully</p>';
  }
};

const addNomineebtn = document.querySelector('#nominee-btn');
addNomineebtn.addEventListener('click', (event) => {
  event.preventDefault();
  nomineeForm();
});
