import getCookie from './Csrf';

function logout() {
var csrftoken = getCookie('csrftoken');
const requestOptions = {
    method: 'POST',
    mode: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
} 
fetch('/rest-auth/logout/', requestOptions)
.then(response => {
    if(response.ok){
        navigate('/rest-auth/login/');
    }});
}


export default logout;