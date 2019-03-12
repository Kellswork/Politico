const getNominees = async () => {
  const requestTable = document.getElementById('request');
  const mobileView = document.getElementById('mobileView');
  const manifestoModal = document.querySelector('.manifesto-modal');
  const viewManifesto = (manifesto) => {
    manifestoModal.classList.toggle('show-modal');
    document.querySelector('.manifesto-text').innerHTML = manifesto;
    errMsg.style.display = 'none';
  };
  const closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', () => {
    manifestoModal.classList.toggle('show-modal');
  });
  const url = 'http://localhost:8080/api/v1/offices/nominees';
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
    const action = document.createElement('td');
    const accept = document.createElement('button');
    const reject = document.createElement('button');

    image.classList.add('result');
    image.innerHTML = `<img src="${info.image}" alt="party image">`;
    name.textContent = `${info.firstname} ${info.lastname}`;
    party.textContent = info.party;
    office.textContent = info.office;
    manifesto.classList.add('view-manifesto');
    manifesto.id = info.id;
    manifesto.textContent = 'View Manifesto';
    manifesto.onclick = () => {
      viewManifesto(info.manifesto);
    };

    accept.type = 'submit';
    accept.id = 'accept';
    accept.dataset.id = info.id;
    accept.textContent = 'accept';
    action.appendChild(accept);

    reject.type = 'submit';
    reject.id = 'reject';
    reject.dataset.id = info.id;
    reject.textContent = 'reject';
    action.appendChild(reject);

    tr.appendChild(image);
    tr.appendChild(name);
    tr.appendChild(party);
    tr.appendChild(office);
    tr.appendChild(manifesto);
    tr.appendChild(action);
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

    const mobileAccept = document.createElement('button');
    mobileAccept.type = 'submit';
    mobileAccept.id = 'accept';
    mobileAccept.textContent = 'accept';
    partyAction.appendChild(mobileAccept);

    const mobileReject = document.createElement('button');
    mobileReject.type = 'submit';
    mobileReject.id = 'reject';
    mobileReject.textContent = 'reject';
    partyAction.appendChild(mobileReject);

    partyCard.classList.add('party-card');
    partyCard.appendChild(partyAction);
    mobileView.appendChild(partyCard);
    // setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
  });

  window.addEventListener('click', (event) => {
    if (event.target === manifestoModal) {
      manifestoModal.classList.toggle('show-modal');
    }
  });
};
window.onload = getNominees();

const registerCandidate = async () => {
  const office = document.querySelector('.election-office');
  const electionDetails = document.querySelector('.election-details');
  const deletePartyModal = document.createElement('div');
  deletePartyModal.classList.add('deletePartyModal');

  const editModal = document.createElement('div');
  editModal.classList.add('edit-modal');
  deletePartyModal.appendChild(editModal);

  const h3 = document.createElement('h3');
  editModal.appendChild(h3);

  const errMsg = document.createElement('div');
  errMsg.setAttribute('id', 'err');
  editModal.appendChild(errMsg);

  const successMsg = document.createElement('div');
  successMsg.setAttribute('id', 'success');
  editModal.appendChild(successMsg);

  const modalButtons = document.createElement('div');
  modalButtons.classList.add('modal-actions');
  editModal.appendChild(modalButtons);

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.classList.add('btn-cancel');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', () => {
    deletePartyModal.classList.toggle('show-modal');
  });
  modalButtons.appendChild(cancelButton);

  const confirmButton = document.createElement('button');
  confirmButton.type = 'button';
  confirmButton.classList.add('btn-confirm');
  confirmButton.textContent = 'confirm';
  modalButtons.appendChild(confirmButton);

  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'accept') {
      editModal.id = e.target.dataset.id;
      confirmButton.dataset.status = 'accepted';
      h3.textContent = 'Are You sure You want to register this user as a candidate?';
      deletePartyModal.classList.toggle('show-modal');
    } else if (e.target && e.target.id === 'reject') {
      editModal.id = e.target.dataset.id;
      confirmButton.dataset.status = 'rejected';
      h3.textContent = 'Are You sure You want to reject this user as a candidate?';
      deletePartyModal.classList.toggle('show-modal');
    }
  });
  window.addEventListener('click', (event) => {
    if (event.target === deletePartyModal) {
      deletePartyModal.classList.toggle('show-modal');
      errMsg.style.display = 'none';
    }
  });

  electionDetails.insertBefore(deletePartyModal, office);

  const updateRecord = async (status) => {
    const url = `http://localhost:8080/api/v1/offices/${editModal.id}/register`;
    const token = window.localStorage.getItem('token');
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ status }),
    };
    const response = await fetch(url, options);
    const json = await response.json();
    if (json.status === 401) {
      window.localStorage.removeItem('token');
      window.location.href = '../login.html';
    }
    if (json.status !== 200) {
      if (Array.isArray(json.error)) {
        json.error.forEach((element) => {
          const content = `<p>${element}</p>`;
          errMsg.style.display = 'block';
          errMsg.innerHTML += content;
        });
      } else {
        errMsg.style.display = 'block';
        errMsg.innerHTML = `<p> ${json.error} </p>`;
      }
    } else {
      errMsg.style.display = 'none';
      successMsg.innerHTML = `<p> ${json.message} </p>`;
      modalButtons.style.visibility = 'hidden';
      successMsg.style.display = 'block';
      setTimeout(() => location.reload(), 1500);
    }
  };

  confirmButton.addEventListener('click', () => {
    updateRecord(confirmButton.dataset.status);
  });
};
window.onload = registerCandidate();
