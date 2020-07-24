const spinner = document.getElementById('spinner');
const getParty = async () => {
  const partyTable = document.getElementById('partyTable');
  const url = 'http://localhost:8080/api/v1/parties';
  const token = window.localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: { 'x-auth-token': token },
  };
  spinner.removeAttribute('hidden');
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.status === 401) {
    window.localStorage.removeItem('token');
    window.location.href = '../login.html';
  }
  if (json.status === 404) {
    partyTable.innerHTML = `${json.error}`;
    setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
  }
  json.data.forEach((info) => {
    const tr = document.createElement('tr');
    const logoUrl = document.createElement('td');
    const name = document.createElement('td');
    const hqAddress = document.createElement('td');
    name.textContent = info.name;
    hqAddress.textContent = info.hqaddress;
    logoUrl.innerHTML = `<img src="${info.logourl}" alt="party logo">`;
    tr.appendChild(logoUrl);
    tr.appendChild(name);
    tr.appendChild(hqAddress);
    partyTable.appendChild(tr);
    setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
  });
};
window.onload = getParty();
