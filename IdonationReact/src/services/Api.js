import axios from 'axios';
import { url } from '../Url';


const Api = axios.create({ baseURL: 'https://back-idonation.herokuapp.com/api/', });
//const Api = axios.create({ baseURL: 'http://localhost:8080/api/' });

export default Api;