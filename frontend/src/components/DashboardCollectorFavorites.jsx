import useFetchUserData from '../hooks/useFetchUserData';

const CollectorFavorites = () => {
	// Use the custom hook to fetch the data
	const { userData, loading, error } = useFetchUserData('/collector/favorites');

	// Check if the data is still loading or if there is an error
	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	// If there are no favorites, display a message
	if (userData.favorites && userData.favorites.length === 0) {
		return <div>No favorites yet.</div>;
	}

	// Render the list of favorite artworks
	return (
		<div>
			<ul className='grid grid-cols-4 gap-3'>
				{userData.favorites.map(artwork => (
					<li key={artwork._id} className='bg-red-100'>
						<h3>{artwork.title}</h3>
						<p>{artwork.artistName}</p>
						<p>{artwork.yearCreated}</p>
						<p>{artwork.medium}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CollectorFavorites;
