const fetchApi = async (url, method = 'GET', data = '', isFormData = false, headers = '') => {
  const options = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    referrer: 'no-referrer',
  };
  options.headers = headers;
  if (isFormData) {
    options.body = data;
  } else if (data) {
    options.headers = {
      'Content-Type': 'application/json',
    };
    options.body = JSON.stringify(data);
  }
  console.log(options);
  const response = await fetch(`http://localhost:8080/api/v1${url}`, options);
  const json = await response.json();
  return json;
};
