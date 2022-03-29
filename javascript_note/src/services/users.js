//Onde é concetrado todas as chamados onde o EndPoint tem o user

import Api from './api';

const UserService ={
    register: (params) => Api.post('/users/register', params)
}

//Realizar como teste

//const instance = axios.create({
//    baseURL: 'https://some-domain.com/api/',
//    timeout: 1000,
//    headers: {'X-Custom-Header': 'foobar'}
//  });


export default UserService;