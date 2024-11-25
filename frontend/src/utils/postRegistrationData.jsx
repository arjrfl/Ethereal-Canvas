const postData = async (url, data) => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			throw new Error(errorResponse.error || 'Server error');
		}

		return await response.json();
	} catch (error) {
		console.error(`Error in POST request to ${url}:`, error.message);
		throw error;
	}
};

export default postData;
