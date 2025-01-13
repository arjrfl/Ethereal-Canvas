import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import marketBanner from '../assets/images/label-images/cover2.jpg';
import useFetchArtworks from '../hooks/useFetchArtworks';

import { formatPrice } from '../utils/formatPrice';

import '../styles/CustomFrameSmall.css';

// Utility function to shuffle an array
const shuffleArray = array => {
	return array
		.map(item => ({ item, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ item }) => item);
};

const Marketplace = () => {
	const { isDropdownOpen } = useOutletContext();
	const [selectedMedium, setSelectedMedium] = useState(null);
	const { artworks, loading, error } = useFetchArtworks('marketplace', selectedMedium);
	const [displayedArtworks, setDisplayedArtworks] = useState([]);

	// Apply filtering and shuffle whenever artworks or selectedMedium changes
	useEffect(() => {
		if (artworks && artworks.length > 0) {
			const filteredArtworks = selectedMedium
				? artworks.filter(artwork => artwork.medium === selectedMedium)
				: artworks;
			setDisplayedArtworks(shuffleArray(filteredArtworks));
		}
	}, [artworks, selectedMedium]);

	const handleFilterChange = medium => {
		setSelectedMedium(medium === 'All' ? null : medium);
		console.log(`Filter changed to: ${medium}`);
	};

	return (
		<div
			className={`font-custom container max-w-[90rem] mx-auto mt-5 px-4 relative ${isDropdownOpen ? '-z-50' : ''}`}
		>
			{/* Banner */}
			<div
				className='bg-cover bg-center py-10 px-10 relative rounded-2xl mb-7'
				style={{
					backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0) 70%), url(${marketBanner})`,
				}}
			>
				<h2 className='text-white text-4xl font-bold tracking-widest'>Marketplace</h2>
			</div>

			{/* Filter */}
			<div className='mb-10 grid grid-cols-3 text-sm'>
				<div className='col-span-1'>
					<h3 className='font-semibold text-slate-700 tracking-widest'>Mediums</h3>
				</div>
				<ul className='flex flex-wrap col-span-2 gap-x-3 gap-y-2 text-xs font-medium text-gray-800'>
					{[
						'All',
						'Acrylic',
						'Chalk',
						'Charcoal',
						'Colored Pencils',
						'Graphite Pencils',
						'Oil Paint',
						'Oil Pastels',
						'Pen and Ink',
						'Soft Pastels',
						'Tempera',
						'Watercolor',
					].map(medium => (
						<li key={medium}>
							<button
								onClick={() => handleFilterChange(medium)}
								className={`px-4 py-1 border border-white rounded-lg text-white font-medium tracking-wider ${
									selectedMedium === medium ? 'bg-[#67afda]' : 'bg-cyan-600'
								}`}
							>
								{medium}
							</button>
						</li>
					))}
				</ul>
			</div>

			{/* Artworks */}
			<div className='grid grid-cols-2 gap-x-20 gap-y-28'>
				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<p className='text-red-500'>{error}</p>
				) : displayedArtworks.length === 0 ? (
					<p>No artworks found with the selected medium.</p>
				) : (
					displayedArtworks.map(artwork => (
						<Link
							to={`/artwork-market/${artwork._id}`}
							key={artwork._id}
							className='grid grid-cols-2 grid-rows-1 rounded-xl'
						>
							<div className='h-40 w-40 aspect-square frameSm'>
								<img
									src={artwork.images.frontView}
									alt='artwork'
									className='w-full h-full object-cover rounded-lg'
								/>
							</div>

							<div className='flex items-center pl-6'>
								<div className='bg-white py-6 px-8 rounded-xl drop-shadow-lg flex-1'>
									<div className='flex items-center gap-x-2 mb-2'>
										<img
											src={artwork.user?.avatar}
											alt={artwork.user?.fullName}
											className='h-8 w-8 aspect-square object-cover rounded-md'
										/>
										<div className='truncate'>
											<p className='truncate text-lg leading-tight font-medium tracking-wide'>
												{artwork.user?.fullName || 'Unknown'}
											</p>
											<p className='text-xs italic'>{artwork.user?.location || 'Unknown'}</p>
										</div>
									</div>

									<p className='text-base truncate text-pretty'>
										<span className='font-semibold'>{artwork.title || 'Untitled'}</span>,{' '}
										<span className='tracking-widest'>{artwork.yearCreated || 'Unknown'}</span>
									</p>
									<p className='mb-2'>{artwork.medium || 'Unknown'}</p>
									<p className='mb-2 font-semibold'>{formatPrice(artwork.price)}</p>

									<p className='underline italic'>View artwork</p>
								</div>
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
};

export default Marketplace;
