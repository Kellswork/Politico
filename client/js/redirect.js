const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const options = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  referrer: 'no-referrer',
  body: JSON.stringify({
    token,
  }),
};
const request = async () => {
  const url = 'http://localhost:8080/api/v1/auth/forgot';
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.status === 401) {
    window.location.href = (`forgot_password.html?err=${json.error}`);
  }
};

request();
