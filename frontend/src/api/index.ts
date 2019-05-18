import axios from 'axios';

export const startBuildApi = async () => {
    return axios('http://localhost:8080/build', {method: 'POST'});
}