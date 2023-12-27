import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data);
};

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson);
    return request.then((response) => response.data);
};

const dataService = { getAll, create, update };

export default dataService;
