//Onde é concetrado todas as chamados onde o EndPoint tem o user

import Api from './api';
import APi from './api';

const UserService ={
    register: (params) => Api.post('/users/register', params)
}


export default UserService;