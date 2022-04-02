//Onde é concetrado todas as chamados onde o EndPoint tem o user

//vou armazenar no localStorage para armazenar dados do usuario e o toke

import Api from './api';

const UserService ={
    register: (params) => Api.post('/users/register', params),
    login: async(params) =>{
        const response = await Api.post('/users/login', params);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    }
}


export default UserService;