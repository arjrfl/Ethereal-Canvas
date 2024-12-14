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
	const [responseData, setResponseData] = useState(null); // Holds the fetched data
	const [statusSummary, setStatusSummary] = useState(null); // Holds the status summary
	const [loading, setLoading] = useState(true); // Tracks if the request is still in progress
	const [error, setError] = useState(null); // Holds any error messages
	const navigate = useNavigate();

	// Helper function to refresh access token
	const refreshAccessToken = async () => {
		const refreshToken = localStorage.getItem('refreshToken');
		try {
			const response = await axios.post('http://localhost:5000/refresh-token', { refreshToken });
			const newAccessToken = response.data.accessToken;

			// Update localStorage with the new access token
			localStorage.setItem('accessToken', newAccessToken);
			return newAccessToken;
		} catch (error) {
			console.error('Failed to refresh token:', error);
			return null;
		}
	};

	// Function to check if access token is expired
	const isAccessTokenExpired = accessToken => {
		if (!accessToken) return true;
		const [, payload] = accessToken.split('.');
		const decoded = JSON.parse(atob(payload));
		const expiration = decoded.exp;
		return expiration * 1000 < Date.now(); // Expiration is in seconds
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				let accessToken = localStorage.getItem('accessToken');

				// If access token is expired, try to refresh it
				if (isAccessTokenExpired(accessToken)) {
					accessToken = await refreshAccessToken();
					if (!accessToken) {
						setError('Session expired. Please log in again.');
						localStorage.clear();
						setLoading(false);
						navigate('/login');
						return;
					}
				}

				// Base URL for the API
				const baseURL = 'http://localhost:5000/api';

				// Make the GET request using Axios
				const response = await axios.get(`${baseURL}${endpoint}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					params: data, // Passing filters (or parameters) as query params
				});

				// Assuming the response includes "data" and "statusSummary"
				setResponseData(response.data.data);

				// Calculate and set the status summary if available in response
				if (response.data.statusSummary) {
					setStatusSummary(response.data.statusSummary);
				} else {
					// Fallback logic to compute status counts locally from the fetched data
					const counts = response.data.data.reduce((summary, item) => {
						const { status } = item;
						if (status) {
							summary[status] = (summary[status] || 0) + 1;
						}
						return summary;
					}, {});

					setStatusSummary(counts);
				}

				setLoading(false);
				setError(null); // Clear any previous errors
			} catch (err) {
				// Handle errors by setting the error state
				setError('Failed to load data');
				setLoading(false);
			}
		};

		fetchData(); // Fetch data when dependencies change
	}, [endpoint, data, refetchTrigger]); // Add `refetchTrigger` to the dependency array

	return { responseData, statusSummary, loading, error }; // Return data, statusSummary, loading state, and error
};

export default useFetchData;
