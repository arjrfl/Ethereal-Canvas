import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (endpoint, data, refetchTrigger = 0) => {
	const [responseData, setResponseData] = useState(null); // Holds the fetched data
	const [loading, setLoading] = useState(true); // Tracks if the request is still in progress
	const [error, setError] = useState(null); // Holds any error messages

	useEffect(() => {
		const fetchData = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token

				// Base URL for the API
				const baseURL = 'http://localhost:5000/api';

				// Make the GET request using Axios
				const response = await axios.get(`${baseURL}${endpoint}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					params: data, // Passing filters (or parameters) as query params
				});

				// Set the fetched data to responseData and stop loading
				setResponseData(response.data.data);
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

	return { responseData, loading, error }; // Return the data, loading state, and error
};

export default useFetchData;
