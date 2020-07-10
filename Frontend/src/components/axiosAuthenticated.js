import axios from 'axios';
import { createBrowserHistory } from 'history';

let user = JSON.parse(localStorage.getItem('user'));

var authToken = "";
if (user && user.token)
  authToken = 'Bearer ' + user.token;

axios.defaults.headers.common = {'Authorization': `${authToken}`}

const UNAUTHORIZED = 401;
// axios.interceptors.response.use(
//   response => respose, 
  
//   error => {
//     const {status} = error.response;
//     if (status === UNAUTHORIZED) {
//       createBrowserHistory().push('/');
//       window.location.reload();
//     }
//     return Promise.reject(error);
//  }
  
  
  

// );

axios.interceptors.response.use(
  response => response,
  error => {
    const {status} = error.response;
    if (status === UNAUTHORIZED) {
      createBrowserHistory().push('/');
      window.location.reload();
    }
    return Promise.reject(error);
 }
);

export default axios;