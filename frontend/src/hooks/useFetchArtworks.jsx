import { useState, useEffect } from 'react';
import { axiosInstancePublic } from '../utils/axiosConfig';

const useFetchArtworks = (display = null) => {
	const [artworks, setArtworks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArtworks = async () => {
			setLoading(true);
			setError(null);

			try {
				// Build the API URL with query parameters if display is provided
				const url = display ? `/artworks?display=${display}` : '/artworks';

				// Use the public Axios instance for fetching data
				const response = await axiosInstancePublic.get(url);
				setArtworks(response.data.data);
			} catch (err) {
				setError(err.response?.data?.message || 'Failed to fetch artworks');
			} finally {
				setLoading(false);
			}
		};

		fetchArtworks();
	}, [display]);

	return { artworks, loading, error };
};

export default useFetchArtworks;
