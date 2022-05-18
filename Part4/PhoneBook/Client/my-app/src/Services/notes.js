import axios from "axios";
const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (newObj) => {
    const request = axios.post(baseUrl, newObj);
    console.log('This is the requset inside notes: ',request)
    return request.then(response => response.data);
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`);

}

export default { getAll, create, remove }