import axios from 'axios';
import { createBrowserHistory } from 'history';

let user = JSON.parse(localStorage.getItem('user'));

var authToken = "";
if (user && user.token)
  authToken = 'Bearer ' + user.token;

axios.defaults.headers.common = {'Authorization': `${authToken}`}

axios.interceptors.response.use(response => response, error => {
  
  if(error.response.status === 401){    
    createBrowserHistory().push('/');
    window.location.reload();
  }
  
  return error;
});

export default axios;