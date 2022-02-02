import axios from 'axios';

export const API = axios.create({
	baseURL: 'https://dwf29dja-doplan.herokuapp.com/api/v1',
});
export const setAuthToken = (token) => {
	API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export const jsonConfig = {
	headers: {
		'Content-type': 'application/json',
	},
};
