const spinner = document.getElementById('spinner');
const div = document.getElementById('err');
const success = document.getElementById('success');
const imagePreview = document.getElementById('imagePreview');
imagePreview.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('logoUrl').click();
});
document.getElementById('logoUrl').addEventListener('change', (event) => {
  const url = URL.createObjectURL(event.target.files[0]);
  imagePreview.src = url;
  URL.revokeObjectURL(url);
});

const createParty = async () => {
  const token = window.localStorage.getItem('token');
  const myHeaders = new Headers({
    'x-auth-token': token,
  });
  const partyForm = document.getElementById('partyForm');
  const formData = new FormData(partyForm);
  const name = document.getElementById('name');
  const hqAddress = document.getElementById('hqAddress');
  const logoUrl = document.getElementById('logoUrl');
  const url = 'http://localhost:8080/api/v1/parties';
  const options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    referrer: 'no-referrer',
    body: formData,
    headers: myHeaders,
  };
  spinner.removeAttribute('hidden');
  const response = await fetch(url, options);
  const json = await response.json();

  div.innerHTML = '';
  spinner.setAttribute('hidden', '');
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
    success.innerHTML = '<p>Political Party has been created successfully</p>';
    name.value = '';
    hqAddress.value = '';
    logoUrl.value = '';
    setTimeout(() => location.reload(), 1500);
  }
};

const createPartybtn = document.querySelector('#modal-btn');
createPartybtn.addEventListener('click', (event) => {
  event.preventDefault();
  createParty();
});

const getParty = async () => {
  const partyTable = document.getElementById('partyTable');
  const mobileView = document.getElementById('mobileView');
  const url = 'http://localhost:8080/api/v1/parties';
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
    window.location.href = '../login.html';
  }
  json.data.forEach((info) => {
    const tr = document.createElement('tr');
    const logoUrl = document.createElement('td');
    const name = document.createElement('td');
    const hqAddress = document.createElement('td');
    const action = document.createElement('td');
    const editIcon = document.createElement('span');
    name.textContent = info.name;
    hqAddress.textContent = info.hqaddress;
    logoUrl.innerHTML = `<img src="${info.logourl}" alt="party logo">`;
    action.innerHTML = `<span><i data-id="${info.id}" id="edit" class="far fa-edit"></i></span></i><span><i data-id="${info.id}" id="delete" class="far fa-trash-alt"></i></span>`;
    tr.appendChild(logoUrl);
    tr.appendChild(name);
    tr.appendChild(hqAddress);
    tr.appendChild(action);
    partyTable.appendChild(tr);

    const partyCard = document.createElement('div');
    const partyLogo = document.createElement('div');
    const partyAction = document.createElement('div');
    const imageMobile = document.createElement('img');
    editIcon.innerHTML = '<i id="edit" class="far fa-edit"></i>';
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const editMobile = document.createElement('span');
    const deleteMobile = document.createElement('span');
    imageMobile.setAttribute('src', info.logourl);
    imageMobile.setAttribute('alt', 'party logo');
    editMobile.classList.add('edit');
    editMobile.innerHTML = '<i id="edit" class="far fa-edit"></i>';
    deleteMobile.innerHTML = '<i id="delete" class="far fa-trash-alt"></i>';
    partyCard.classList.add('party-card');
    partyLogo.classList.add('party-logo');
    partyAction.classList.add('party-action');
    partyLogo.appendChild(imageMobile);
    h3.textContent = info.name;
    p.textContent = info.hqaddress;
    partyAction.appendChild(editMobile);
    partyAction.appendChild(deleteMobile);
    partyCard.appendChild(partyLogo);
    partyCard.appendChild(h3);
    partyCard.appendChild(p);
    partyCard.appendChild(partyAction);
    mobileView.appendChild(partyCard);
    setTimeout(() => spinner.setAttribute('hidden', ''), 1000);
  });
};
window.onload = getParty();

const patchParty = () => {
  const office = document.querySelector('.election-office');
  const electionDetails = document.querySelector('.election-details');
  const deletePartyModal = document.createElement('div');
  deletePartyModal.classList.add('deletePartyModal');

  const editModal = document.createElement('div');
  editModal.classList.add('edit-modal');
  deletePartyModal.appendChild(editModal);

  const h2 = document.createElement('h2');
  h2.textContent = 'Enter New Party Name';
  editModal.appendChild(h2);

  const errMsg = document.createElement('div');
  errMsg.setAttribute('id', 'err');
  editModal.appendChild(errMsg);

  const successMsg = document.createElement('div');
  successMsg.setAttribute('id', 'success');
  editModal.appendChild(successMsg);

  const inputName = document.createElement('div');
  inputName.classList.add('inputName');
  editModal.appendChild(inputName);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'name';
  inputName.appendChild(input);

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
  confirmButton.textContent = 'Confirm';

  modalButtons.appendChild(confirmButton);

  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'edit') {
      editModal.id = e.target.dataset.id;
      deletePartyModal.classList.toggle('show-modal');
    }
  });
  window.addEventListener('click', (event) => {
    if (event.target === deletePartyModal) {
      deletePartyModal.classList.toggle('show-modal');
    }
  });

  electionDetails.insertBefore(deletePartyModal, office);
  confirmButton.addEventListener('click', async () => {
    console.log(input.value);
    const url = `http://localhost:8080/api/v1/parties/${editModal.id}/name`;
    const token = window.localStorage.getItem('token');
    const data = { name: input.value };
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    if (json.status === 401) {
      window.localStorage.removeItem('token');
      window.location.href = '../login.html';
    }
    if (json.status === 400) {
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
      setTimeout(() => location.reload(), 1500);
    }
  });
};
window.onload = patchParty();

const deleteParty = () => {
  const office = document.querySelector('.election-office');
  const electionDetails = document.querySelector('.election-details');
  const deletePartyModal = document.createElement('div');
  deletePartyModal.classList.add('deletePartyModal');

  const editModal = document.createElement('div');
  editModal.classList.add('edit-modal');
  deletePartyModal.appendChild(editModal);

  const h3 = document.createElement('h3');
  h3.textContent = 'Are You sure You want to delete this party?';
  editModal.appendChild(h3);

  const errMsg = document.createElement('div');
  errMsg.setAttribute('id', 'err');
  editModal.appendChild(errMsg);

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

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('btn-confirm');
  deleteButton.textContent = 'Delete';
  modalButtons.appendChild(deleteButton);

  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'delete') {
      editModal.id = e.target.dataset.id;
      deletePartyModal.classList.toggle('show-modal');
    }
  });
  window.addEventListener('click', (event) => {
    if (event.target === deletePartyModal) {
      deletePartyModal.classList.toggle('show-modal');
    }
  });

  electionDetails.insertBefore(deletePartyModal, office);
  deleteButton.addEventListener('click', async () => {
    const url = `http://localhost:8080/api/v1/parties/${editModal.id}`;
    const token = window.localStorage.getItem('token');
    const options = {
      method: 'DELETE',
      headers: {
        'x-auth-token': token,
      },
    };
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    if (json.status === 401) {
      window.localStorage.removeItem('token');
      window.location.href = '../login.html';
    }
    if (json.status === 400) {
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
      modalButtons.style.visibility = 'hidden';
      errMsg.style.display = 'none';
      setTimeout(() => { h3.textContent = json.message; }, 1000);

      setTimeout(() => location.reload(), 1500);
    }
  });
};
window.onload = deleteParty();
