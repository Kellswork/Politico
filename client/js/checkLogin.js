const isAdmin = window.localStorage.getItem('admin');
const token = window.localStorage.getItem('token');

if (token) {
  if (isAdmin === 'true') window.location.replace('admin/dashboard.html');
  if (isAdmin === 'false') window.location.replace('user/dashboard.html');
}
