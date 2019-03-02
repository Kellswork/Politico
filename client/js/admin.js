const isAdmin = window.localStorage.getItem('admin');
const token = window.localStorage.getItem('token');

if (isAdmin === 'false' || (!token)) {
  window.location.replace('../login.html');
}
