import axios from 'axios';

export const axiosInstancePublic = axios.create({
	baseURL: 'http://localhost:5000',
});

export const axiosInstancePrivate = axios.create({
	baseURL: 'http://localhost:5000/api',
});
