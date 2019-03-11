const getCandidates = async () => {
  const requestTable = document.getElementById('request');
  const mobileView = document.getElementById('mobileView');
  const manifestoModal = document.querySelector('.manifesto-modal');
  const manifestoContent = document.querySelector('.manifesto-content');
  const url = 'https://politico-kell.herokuapp.com/api/v1/candidates';
  const token = window.localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      'x-auth-token': token,
    },
  };
  // spinner.removeAttribute('hidden');
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
  json.data.forEach((info) => {
    const tr = document.createElement('tr');
    const image = document.createElement('td');
    const name = document.createElement('td');
    const party = document.createElement('td');
    const office = document.createElement('td');
    const manifesto = document.createElement('td');

    image.classList.add('result');
    image.innerHTML = `<img src="${info.image}" alt="party image">`;
    name.textContent = `${info.firstname} ${info.lastname}`;
    party.textContent = info.party;
    office.textContent = info.office;
    manifesto.classList.add('view-manifesto');
    manifesto.id = info.id;
    manifesto.textContent = 'View Manifesto';

    tr.appendChild(image);
    tr.appendChild(name);
    tr.appendChild(party);
    tr.appendChild(office);
    tr.appendChild(manifesto);
    requestTable.appendChild(tr);

    const partyCard = document.createElement('div');
    const candidateImg = document.createElement('div');
    candidateImg.classList.add('result');

    const partyAction = document.createElement('div');
    partyAction.classList.add('request-action');
    candidateImg.classList.add('candidate-img');
    candidateImg.innerHTML = `<img src="${info.image}" alt="party image">`;
    partyCard.appendChild(candidateImg);

    const h3 = document.createElement('h3');
    h3.textContent = `${info.firstname} ${info.lastname}`;
    partyCard.appendChild(h3);

    const mobileParty = document.createElement('p');
    mobileParty.textContent = info.party;
    partyCard.appendChild(mobileParty);

    const mobileOffice = document.createElement('p');
    mobileOffice.textContent = info.office;
    partyCard.appendChild(mobileOffice);

    const mobileManifesto = document.createElement('p');
    mobileManifesto.classList.add('view-manifesto');
    mobileManifesto.id = info.id;
    mobileManifesto.textContent = 'View Manifesto';
    partyCard.appendChild(mobileManifesto);


    partyCard.classList.add('party-card');
    partyCard.appendChild(partyAction);
    mobileView.appendChild(partyCard);
    // setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
  });
  document.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'view-manifesto') {
      console.log(e.target.id);
      manifestoContent.id = e.target.id;
      manifestoModal.classList.toggle('show-modal');
    }
  });
  window.addEventListener('click', (event) => {
    if (event.target === manifestoModal) {
      manifestoModal.classList.toggle('show-modal');
    }
  });
};
window.onload = getCandidates();
