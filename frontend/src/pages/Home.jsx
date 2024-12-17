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
		<div className='mt-5 relative -z-50 font-custom'>
			{/* carousel */}
			<div className='overflow-hidden'>
				<div
					className='flex transition-transform duration-700 ease-in-out'
					style={{
						transform: `translateX(-${currentIndex * 100}%)`,
					}}
				>
					{artists.map(artist => (
						<div key={artist.artistId} className='w-full flex-shrink-0 px-3'>
							{/* Artist */}
							<div className='grid grid-cols-2 min-[480px]:grid-cols-4 sm:grid-cols-6 sm:grid-rows-2 gap-4'>
								{/* AVATAR */}
								<div className='w-full h-fit aspect-square col-span-2 rounded-xl shadow-md'>
									<img
										src={artist.avatar}
										alt={artist.fullName}
										className='w-full h-full object-cover rounded-xl'
									/>
								</div>

								{/* RECENT ARTWORK*/}
								<div
									className='hidden min-[480px]:flex drop-shadow-md col-span-2 rounded-xl relative sm:order-last sm:col-span-4'
									style={{
										backgroundImage: `url(${artist.recentArtwork?.images?.frontView})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
									}}
								>
									<p className='text-[8px] font-bold tracking-widest bg-[#ffdabc] px-3 py-[1px] rounded-lg rounded-e-none rounded-tl-none rounded-tr-xl inline-block absolute right-0'>
										RECENT
									</p>

									<div className='backdrop-blur-xl backdrop-brightness-105 mt-auto w-full rounded-b-xl px-4 py-3'>
										<p className='text-base font-semibold text-white'>
											{artist.recentArtwork?.title}
										</p>
										<p className='text-xs text-slate-300 font-medium'>
											<span className='italic'>{artist.recentArtwork?.display}</span>,{' '}
											{artist.recentArtwork?.yearCreated}
										</p>
										<p></p>
									</div>
								</div>

								{/* RECENT ARTWORK GRID IMAGES */}
								<div className='bg-slate-500 hidden order-last col-span-2 rounded-xl sm:grid sm:grid-cols-2 sm:grid-rows-2'>
									<div className=''>
										<img
											src={artist.recentArtwork?.images?.angleOne}
											alt=''
											className='w-full h-full object-cover rounded-tl-xl'
										/>
									</div>

									<div className=''>
										<img
											src={artist.recentArtwork?.images?.frontView}
											alt=''
											className='w-full h-full object-cover rounded-tr-xl'
										/>
									</div>

									<div>
										<img
											src={artist.recentArtwork?.images?.angleTwo}
											alt=''
											className='w-full h-full object-cover rounded-bl-xl'
										/>
									</div>

									<div>
										<img
											src={artist.recentArtwork?.images?.angleThree}
											alt=''
											className='w-full h-full object-cover rounded-br-xl'
										/>
									</div>
								</div>

								{/* ARTIST LABEL */}
								<div className='text-left px-3 py-3	bg-[#67afda] flex items-center justify-between rounded-xl col-span-2 min-[480px]:col-span-4 sm:col-span-4'>
									<div className='text-white'>
										<h2 className='text-base sm:text-2xl font-semibold'>{artist.fullName}</h2>
										<p className='text-[10px] sm:text-xs'>{artist.email}</p>
									</div>
									<button className='text-[10px] sm:text-xs bg-[#e75600] font-bold text-gray-200 px-3 py-1 rounded-md'>
										CLICK ARTIST
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;

{
	/* <div
	className='hidden min-[480px]:block'
	style={{
		backgroundImage: `url(${artist.avatar})`,
		backgroundSize: 'cover', // Optional, ensures the image covers the entire div
		backgroundPosition: 'center', // Optional, centers the image
	}}
>
<h3 className='text-xs'>Recent:</h3>
</div> */
}

{
	/* <img
	src={artist.recentArtwork?.images?.frontView}
	alt={artist.recentArtwork?.title || 'Artwork'}
	className='w-full h-52 object-cover'
/> */
}
