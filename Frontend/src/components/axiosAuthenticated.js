import axios from 'axios';

let user = JSON.parse(localStorage.getItem('user'));

var authToken = "";
if (user && user.token)
  authToken = 'Bearer ' + user.token;

axios.defaults.headers.common = {'Authorization': `${authToken}`}

export default axios;