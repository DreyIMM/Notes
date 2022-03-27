//Arquivo onde iremos configurar o  AXIOS para chamada de API
//API roda na porta 3001
import axios from 'axios'
const Api = axios.create({baseURL: 'http://localhost:3001'});
export default Api;