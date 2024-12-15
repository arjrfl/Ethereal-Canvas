import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useTokenHandler = () => {
	const navigate = useNavigate();
	let refreshTimer;

	const handleLogout = () => {
		console.log('Logging out the user. Clearing tokens.');
		localStorage.clear();
		navigate('/login');
	};

	const isAccessTokenExpired = accessToken => {
		if (!accessToken) {
			console.log('No access token found. Token is considered expired.');
			return true;
		}

		const [, payload] = accessToken.split('.');
		const decoded = JSON.parse(atob(payload));
		const expiration = decoded.exp * 1000;
		const expired = expiration < Date.now();

		// if (expired) {
		// 	console.log('Access token has expired.');
		// } else {
		// 	const timeRemaining = expiration - Date.now();
		// 	console.log(
		// 		`Access token is still valid. Time remaining: ${Math.round(timeRemaining / 1000)} seconds.`
		// 	);
		// }

		return expired;
	};

	const refreshAccessToken = async () => {
		console.log('Attempting to refresh the access token...');
		const refreshToken = localStorage.getItem('refreshToken');

		if (!refreshToken) {
			console.log('No refresh token available. Cannot refresh access token.');
			handleLogout();
			return null;
		}

		try {
			const response = await axios.post('http://localhost:5000/refresh-token', { refreshToken });
			const { accessToken, refreshToken: newRefreshToken } = response.data;

			localStorage.setItem('accessToken', accessToken);
			if (newRefreshToken) {
				localStorage.setItem('refreshToken', newRefreshToken);
			}

			const decoded = JSON.parse(atob(accessToken.split('.')[1]));
			const expiration = decoded.exp * 1000;
			const timeRemaining = expiration - Date.now();

			const delay = timeRemaining - 5000;
			if (refreshTimer) clearTimeout(refreshTimer);
			refreshTimer = setTimeout(refreshAccessToken, delay);

			return accessToken;
		} catch (error) {
			console.error('Failed to refresh token:', error);
			handleLogout();
			return null;
		}
	};

	useEffect(() => {
		return () => {
			if (refreshTimer) {
				console.log('Clearing the refresh token timer.');
				clearTimeout(refreshTimer);
			}
		};
	}, []);

	return { refreshAccessToken, isAccessTokenExpired, handleLogout };
};

export default useTokenHandler;
