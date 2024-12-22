import { useState, useEffect } from 'react';
import axios from 'axios';

import useTokenHandler from './useTokenHandler';

const useFetchData = (endpoint, data, refetchTrigger = 0) => {
	const [responseData, setResponseData] = useState(null);
	const [statusSummary, setStatusSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { refreshAccessToken, isAccessTokenExpired } = useTokenHandler();

	const api = axios.create({
		baseURL: 'http://localhost:5000/api',
	});

	useEffect(() => {
		const requestInterceptor = api.interceptors.request.use(
			async config => {
				let accessToken = localStorage.getItem('accessToken');

				// If access token is expired, refresh it
				if (isAccessTokenExpired(accessToken)) {
					accessToken = await refreshAccessToken();
					if (!accessToken) throw new Error('Token refresh failed');
				}

				if (accessToken) {
					config.headers.Authorization = `Bearer ${accessToken}`;
				}

				return config;
			},
			error => {
				return Promise.reject(error);
			}
		);

		const responseInterceptor = api.interceptors.response.use(
			response => response,
			async error => {
				if (error.response?.status === 401) {
					console.error('Unauthorized! Redirecting to login.');
					localStorage.clear();
					window.location.href = '/login';
				}
				return Promise.reject(error);
			}
		);

		return () => {
			api.interceptors.request.eject(requestInterceptor);
			api.interceptors.response.eject(responseInterceptor);
		};
	}, [api, refreshAccessToken, isAccessTokenExpired]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const response = await api.get(endpoint, { params: data });
				setResponseData(response.data.data);

				if (response.data.statusSummary) {
					setStatusSummary(response.data.statusSummary);
				} else {
					const counts = response.data.data.reduce((summary, item) => {
						const { status } = item;
						if (status) {
							summary[status] = (summary[status] || 0) + 1;
						}
						return summary;
					}, {});
					setStatusSummary(counts);
				}

				setError(null);
			} catch (err) {
				console.error('Error fetching data:', err);
				setError('Failed to load data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [endpoint, data, refetchTrigger]);

	return { responseData, statusSummary, loading, error };
};

export default useFetchData;
