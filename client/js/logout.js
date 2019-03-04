const logout = document.querySelector('.logout');

logout.addEventListener('click', () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('userid');
  window.localStorage.removeItem('admin');
  window.localStorage.removeItem('profileimg');
  window.localStorage.removeItem('firstname');
});
