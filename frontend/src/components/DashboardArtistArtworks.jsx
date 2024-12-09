import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardArtistArtworks = () => {
	const [artworks, setArtworks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filters, setFilters] = useState({
		display: '',
		status: '',
	});
	const [selectedArtwork, setSelectedArtwork] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Fetch the artworks when the component mounts or when filters change
	useEffect(() => {
		const fetchArtworks = async () => {
			setLoading(true);
			try {
				const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
				const response = await axios.get(
					'http://localhost:5000/api/artist/dashboard-retrieve-artworks', // Using GET method
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						params: filters, // Send filters as query parameters
					}
				);
				console.log(response.data); // Log the full response to inspect
				setArtworks(response.data.data); // Access data property for the artworks
			} catch (err) {
				setError('Failed to load artworks');
			} finally {
				setLoading(false);
			}
		};

		fetchArtworks();
	}, [filters]); // Run effect when filters change

	// Handle filter changes
	const handleFilterChange = e => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	// Handle artwork click to open modal
	const handleArtworkClick = artwork => {
		setSelectedArtwork(artwork); // Set the selected artwork
		setIsModalOpen(true); // Open the modal
	};

	// Close modal
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedArtwork(null); // Clear the selected artwork when modal closes
	};

	return (
		<div className='text-sm md:text-base font-custom'>
			<div className='mb-8'>
				<h1 className='text-base md:text-lg lg:text-xl pb-1'>Uploaded Artworks</h1>
				<p className='text-xs font-light text-slate-600'>View all your uploaded artworks</p>
			</div>

			{/* Filters Section */}
			<div className='mb-4 flex gap-4'>
				<select
					name='display'
					value={filters.display}
					onChange={handleFilterChange}
					className='border p-2 rounded'
				>
					<option value=''>Select Display</option>
					<option value='marketplace'>Marketplace</option>
					<option value='museum'>Museum</option>
				</select>

				<select
					name='status'
					value={filters.status}
					onChange={handleFilterChange}
					className='border p-2 rounded'
				>
					<option value=''>Select Status</option>
					<option value='pending'>Pending</option>
					<option value='approve'>Approve</option>
					<option value='reject'>Reject</option>
				</select>
			</div>

			{/* Loading State */}
			{loading && <p>Loading artworks...</p>}

			{/* Error State */}
			{error && <p className='text-red-500'>{error}</p>}

			{/* Artworks Display */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{artworks.length === 0 ? (
					<p>No artworks available.</p>
				) : (
					artworks.map(artwork => (
						<div
							key={artwork._id}
							className='border p-4 rounded-lg shadow-lg cursor-pointer'
							onClick={() => handleArtworkClick(artwork)} // Open modal when artwork is clicked
						>
							<img
								src={artwork.images.frontView}
								alt={artwork.title}
								className='w-full h-48 object-cover mb-4'
							/>
							<h2 className='font-semibold text-lg'>{artwork.title}</h2>
							<p className='text-sm text-gray-600'>{artwork.artistName}</p>
							<p className='text-sm'>{artwork.yearCreated}</p>
							<p className='text-sm'>{artwork.status}</p>
						</div>
					))
				)}
			</div>

			{/* Modal */}
			{isModalOpen && selectedArtwork && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-auto max-h-[80vh]'>
						<button className='absolute top-4 right-4 text-xl text-gray-600' onClick={closeModal}>
							&times;
						</button>
						<h2 className='text-xl font-semibold'>{selectedArtwork.title}</h2>
						<p className='text-sm text-gray-600'>{selectedArtwork.artistName}</p>
						<p className='text-sm'>{selectedArtwork.yearCreated}</p>
						<p className='text-sm'>{selectedArtwork.medium}</p>
						<p className='text-sm'>{selectedArtwork.dimension}</p>
						<p className='text-sm'>{selectedArtwork.description}</p>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
							{Object.keys(selectedArtwork.images).map(key => (
								<img
									key={key}
									src={selectedArtwork.images[key]}
									alt={key}
									className='w-full mb-4' // Keep original size of images
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardArtistArtworks;
