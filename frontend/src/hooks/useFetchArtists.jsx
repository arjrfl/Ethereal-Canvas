import { useState, useEffect } from 'react';
import { axiosInstancePublic } from '../utils/axiosConfig';

const useFetchArtists = (letter = null) => {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArtists = async () => {
			setLoading(true);
			setError(null);

			try {
				const params = {};
				if (letter) {
					params.letter = letter; // Add the letter to the query
				}

				const url = '/approve-artists';
				const response = await axiosInstancePublic.get(url, { params });

				setArtists(response.data.data);
			} catch (err) {
				setError(err.response?.data?.message || 'Failed to fetch artists');
			} finally {
				setLoading(false);
			}
		};

		fetchArtists();
	}, [letter]); // Trigger re-fetch when the letter changes

	return { artists, loading, error };
};

export default useFetchArtists;
