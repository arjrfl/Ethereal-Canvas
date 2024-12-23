import { useState, useEffect } from 'react';
import { axiosInstancePublic } from '../utils/axiosConfig';

const useFetchArtworks = (display = null, medium = null) => {
	const [artworks, setArtworks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArtworks = async () => {
			setLoading(true);
			setError(null);

			try {
				const params = {};
				if (display) {
					params.display = display;
				}
				if (medium) {
					params.medium = medium; // Add the medium to the query
				}

				const url = '/artworks';
				const response = await axiosInstancePublic.get(url, { params });

				setArtworks(response.data.data);
			} catch (err) {
				setError(err.response?.data?.message || 'Failed to fetch artworks');
			} finally {
				setLoading(false);
			}
		};

		fetchArtworks();
	}, [display, medium]); // Trigger re-fetch when display or medium changes

	return { artworks, loading, error };
};

export default useFetchArtworks;
