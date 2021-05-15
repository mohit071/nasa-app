import axios from 'axios';
const http = {
    get : axios.get,
    post: axios.post,
    put : axios.put,
    delete : axios.delete,
    patch : axios.patch,
    request : axios.request
};
export default http;