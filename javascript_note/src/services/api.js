//Arquivo onde iremos configurar o  AXIOS para chamada de API
//API roda na porta 3001
import axios from 'axios'
const Api = axios.create({baseURL: process.env.REACT_APP_BASE_API});
export default Api;

