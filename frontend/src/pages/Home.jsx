import React, { useEffect, useState } from 'react';

const Home = () => {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Shuffle function to randomize the array
	const shuffleArray = array => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]; // Swap elements
		}
		return array;
	};

	// Function to fetch approved artists with their recent artwork
	const fetchArtists = async () => {
		try {
			const response = await fetch('http://localhost:5000/artists'); // Use full URL
			if (!response.ok) {
				throw new Error(`Server error: ${response.status} ${response.statusText}`);
			}
			const data = await response.json();
			if (data.success) {
				// Shuffle the artists before setting state
				setArtists(shuffleArray(data.data));
			} else {
				console.error('Failed to fetch artists:', data.message);
			}
		} catch (error) {
			console.error('Error:', error.message);
		} finally {
			setLoading(false);
		}
	};

	// Fetch artists on component mount
	useEffect(() => {
		fetchArtists();
	}, []);

	// Automatic sliding effect
	useEffect(() => {
		if (artists.length === 0) return;

		// Set interval to change the current index every 2 seconds
		const interval = setInterval(() => {
			setCurrentIndex(prevIndex => (prevIndex + 1) % artists.length);
		}, 2000);

		return () => clearInterval(interval); // Cleanup on unmount
	}, [artists]);

	if (loading) {
		return <p className='text-center text-xl font-semibold'>Loading...</p>;
	}

	return (
		<div className='relative mx-auto max-w-screen-lg p-4'>
			<h1 className='text-3xl font-bold text-center mb-6'>Featured Artists</h1>

			<div className='relative w-full overflow-hidden'>
				<div
					className='flex transition-transform duration-700 ease-in-out'
					style={{
						transform: `translateX(-${currentIndex * 100}%)`,
					}}
				>
					{artists.map(artist => (
						<div
							key={artist.artistId}
							className='w-full flex-shrink-0 p-4 bg-white rounded-lg shadow-lg'
						>
							<img
								src={artist.recentArtwork?.images?.frontView}
								alt={artist.recentArtwork?.title || 'Artwork'}
								className='w-full h-52 object-cover rounded-t-lg'
							/>
							<div className='p-4 text-center'>
								<img
									src={artist.avatar}
									alt={artist.fullName}
									className='w-16 h-16 rounded-full mx-auto mb-3 border-2 border-indigo-500'
								/>
								<h2 className='text-xl font-semibold'>{artist.fullName}</h2>
								<p className='text-gray-500 text-sm'>{artist.email}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
