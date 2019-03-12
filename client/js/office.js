const spinner = document.getElementById('spinner');
const getOffice = async () => {
  const partyTable = document.getElementById('partyTable');
  const url = 'https://politico-kell.herokuapp.com/api/v1/offices';
  const token = window.localStorage.getItem('token');
  const myHeaders = new Headers({
    'x-auth-token': token,
  });
  const options = {
    method: 'GET',
    headers: myHeaders,
  };
  spinner.removeAttribute('hidden');
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.status === 401) {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userid');
    window.localStorage.removeItem('admin');
    window.localStorage.removeItem('profileimg');
    window.localStorage.removeItem('firstname');
    window.location.href = '../login.html';
  }
  if (json.status === 404) {
    partyTable.innerHTML = `${json.error}`;
    setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
  }
  json.data.forEach((info) => {
    const tr = document.createElement('tr');
    const viewCandidate = document.createElement('td');
    const name = document.createElement('td');
    const office = document.createElement('td');
    name.textContent = info.name;
    office.textContent = info.type;
    viewCandidate.innerHTML = '<a href="../user/candidates.html">View Candidate';
    tr.appendChild(office);
    tr.appendChild(name);
    tr.appendChild(viewCandidate);
    partyTable.appendChild(tr);
    setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
  });
};
window.onload = getOffice();

const createOffice = async () => {
  const div = document.getElementById('err');
  const success = document.getElementById('success');
  const token = window.localStorage.getItem('token');
  const name = document.getElementById('name').value;
  const type = document.getElementById('type');
  const text = type.options[type.selectedIndex].value;
  const url = 'https://politico-kell.herokuapp.com/api/v1/offices';
  const data = { name, type: text };
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

  div.innerHTML = '';
  spinner.setAttribute('hidden', '');
  if (json.status === 401) {
    window.localStorage.removeItem('token');
    window.location.href = '../login.html';
  }
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
    success.innerHTML = '<p>Political Office has been created successfully</p>';
    name.value = '';
    setTimeout(() => location.reload(), 1500);
  }
};

const createPartybtn = document.querySelector('#modal-btn');
createPartybtn.addEventListener('click', (event) => {
  event.preventDefault();
  createOffice();
});
