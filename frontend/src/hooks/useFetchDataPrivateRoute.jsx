// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useFetchData = (endpoint, data, refetchTrigger = 0) => {
// 	const [responseData, setResponseData] = useState(null); // Holds the fetched data
// 	const [statusSummary, setStatusSummary] = useState(null); // Holds the status summary
// 	const [loading, setLoading] = useState(true); // Tracks if the request is still in progress
// 	const [error, setError] = useState(null); // Holds any error messages

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

// 				// Base URL for the API
// 				const baseURL = 'http://localhost:5000/api';

// 				// Make the GET request using Axios
// 				const response = await axios.get(`${baseURL}${endpoint}`, {
// 					headers: {
// 						Authorization: `Bearer ${accessToken}`,
// 					},
// 					params: data, // Passing filters (or parameters) as query params
// 				});

// 				// Assuming the response includes "data" and "statusSummary"
// 				setResponseData(response.data.data);

// 				// Calculate and set the status summary if available in response
// 				if (response.data.statusSummary) {
// 					setStatusSummary(response.data.statusSummary);
// 				} else {
// 					// Fallback logic to compute status counts locally from the fetched data
// 					const counts = response.data.data.reduce((summary, item) => {
// 						const { status } = item;
// 						if (status) {
// 							summary[status] = (summary[status] || 0) + 1;
// 						}
// 						return summary;
// 					}, {});

// 					setStatusSummary(counts);
// 				}

// 				setLoading(false);
// 				setError(null); // Clear any previous errors
// 			} catch (err) {
// 				// Handle errors by setting the error state
// 				setError('Failed to load data');
// 				setLoading(false);
// 			}
// 		};

// 		fetchData(); // Fetch data when dependencies change
// 	}, [endpoint, data, refetchTrigger]); // Add `refetchTrigger` to the dependency array

// 	return { responseData, statusSummary, loading, error }; // Return data, statusSummary, loading state, and error
// };

// export default useFetchData;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useFetchData = (endpoint, data, refetchTrigger = 0) => {
	const [responseData, setResponseData] = useState(null);
	const [statusSummary, setStatusSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	let refreshTimer; // Timer for refreshing token

	// Helper function to refresh access token
	const refreshAccessToken = async () => {
		const refreshToken = localStorage.getItem('refreshToken');
		try {
			const response = await axios.post('http://localhost:5000/refresh-token', { refreshToken });
			const { accessToken, refreshToken: newRefreshToken } = response.data;

			// Update tokens in localStorage
			localStorage.setItem('accessToken', accessToken);
			if (newRefreshToken) {
				localStorage.setItem('refreshToken', newRefreshToken);
			}

			// Decode access token to get expiration
			const decoded = JSON.parse(atob(accessToken.split('.')[1]));
			const expiration = decoded.exp * 1000; // Convert expiration to milliseconds
			const timeRemaining = expiration - Date.now();
			console.log(`Access token expires in ${Math.round(timeRemaining / 1000)} seconds`);

			// Schedule the next token refresh slightly before expiration
			const delay = timeRemaining - 5000; // Refresh 5 seconds before expiry

			if (refreshTimer) clearTimeout(refreshTimer);
			refreshTimer = setTimeout(refreshAccessToken, delay);

			console.log('Access token refreshed.');
			return accessToken;
		} catch (error) {
			console.error('Failed to refresh token:', error);
			handleLogout(); // Log out user if refresh fails
			return null;
		}
	};

	// Helper function to handle logout
	const handleLogout = () => {
		localStorage.clear();
		navigate('/login');
	};

	// Function to check if access token is expired
	const isAccessTokenExpired = accessToken => {
		if (!accessToken) return true;
		const [, payload] = accessToken.split('.');
		const decoded = JSON.parse(atob(payload));
		const expiration = decoded.exp * 1000; // Convert expiration to milliseconds
		const expired = expiration < Date.now();

		if (expired) {
			console.log('Access token has expired.');
		} else {
			const timeRemaining = expiration - Date.now();
			console.log(
				`Access token is valid. Time remaining: ${Math.round(timeRemaining / 1000)} seconds`
			);
		}

		return expired;
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				let accessToken = localStorage.getItem('accessToken');

				// If access token is expired, refresh it
				if (isAccessTokenExpired(accessToken)) {
					accessToken = await refreshAccessToken();
					if (!accessToken) return; // Exit if token refresh fails
				}

				const baseURL = 'http://localhost:5000/api';

				const response = await axios.get(`${baseURL}${endpoint}`, {
					headers: { Authorization: `Bearer ${accessToken}` },
					params: data,
				});

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
				console.error(err);
				setError('Failed to load data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => {
			// Cleanup the refresh timer
			if (refreshTimer) clearTimeout(refreshTimer);
		};
	}, [endpoint, data, refetchTrigger]);

	return { responseData, statusSummary, loading, error };
};

export default useFetchData;
