import { useState, useEffect } from 'react';
import axios from 'axios';

import useTokenHandler from './useTokenHandler';

const useFetchUserData = (endpoint, refetchTrigger = 0) => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { refreshAccessToken, isAccessTokenExpired } = useTokenHandler();

	const api = axios.create({
		baseURL: 'http://localhost:5000/api',
	});

	useEffect(() => {
		// Set up the interceptors
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
			// Clean up interceptors when component is unmounted
			api.interceptors.request.eject(requestInterceptor);
			api.interceptors.response.eject(responseInterceptor);
		};
	}, [api, refreshAccessToken, isAccessTokenExpired]);

	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);

			try {
				const response = await api.get(endpoint);
				setUserData(response.data); // Assuming response contains the user data directly

				setError(null);
			} catch (err) {
				console.error('Error fetching user data:', err);
				setError('Failed to load user data');
			} finally {
				setLoading(false);
			}
		};

		// Only fetch user data if refetchTrigger changes
		if (refetchTrigger !== null) {
			fetchUserData();
		}
	}, [endpoint, refetchTrigger]); // Refetch when `refetchTrigger` changes

	return { userData, loading, error };
};

export default useFetchUserData;
