let base64 = require('base-64');

let url = 'http://eu.httpbin.org/basic-auth/user/passwd';

let username = 'user';
let password = 'passwd';

let headers = new Headers();

//headers.append('Content-Type', 'text/json');
headers.append('Authorization', 'Basic' + base64.encode(username + ":" + password));

fetch(url, {method:'GET',
        headers: headers,
        //credentials: 'user:passwd'
       })
.then(response => response.json())
.then(json => console.log(json));
//.done();
