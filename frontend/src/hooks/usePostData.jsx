import { useState } from 'react';
import axios from 'axios';

const usePostData = () => {
	const [isPosting, setIsPosting] = useState(false); // Tracks posting status
	const [postError, setPostError] = useState(null); // Stores error message
	const [postResponse, setPostResponse] = useState(null); // Stores response data

	// Function to make API requests
	const postData = async (endpoint, data = {}, method = 'POST') => {
		setIsPosting(true); // Start loading
		setPostError(null); // Clear previous errors
		setPostResponse(null); // Clear previous responses

		const accessToken = localStorage.getItem('accessToken');
		const baseURL = 'http://localhost:5000/api'; // Ensure the base URL is defined

		try {
			// Make the API request
			const response = await axios({
				url: `${baseURL}${endpoint}`,
				method,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data, // Pass the custom data here, such as rejection reason
			});

			// Update response state on success
			setPostResponse(response.data);
			setIsPosting(false);
			return { responseData: response.data, error: null };
		} catch (error) {
			// Update error state on failure
			setPostError(error.response?.data?.error || 'Something went wrong');
			setIsPosting(false);
			return { responseData: null, error };
		}
	};

	return { postData, isPosting, postError, postResponse }; // Provide states and the function
};

export default usePostData;
