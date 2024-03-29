//Onde é concetrado todas as chamados onde o EndPoint tem o user

//vou armazenar no localStorage para armazenar dados do usuario e o token

import Api from './api';

const UserService ={
    register: (params) => Api.post('/users/register', params),
    login: async(params) =>{
        const response = await Api.post('/users/login', params);
        //JSON.stringify -> transformar em string 
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    },
    logout: () =>{
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    },
    updateUser: (id, params)  => Api.put(`/users/edit/${id}` ,params, {
       
    }),
    index: (id)=> Api.get(`/users/${id}`,{
       
    }),
}


export default UserService;