import React, { useState } from 'react';
import useFetchData from '../hooks/useFetchDataPrivateRoute';

const DashboardArtistArtworks = () => {
	const [filters, setFilters] = useState({
		display: '',
		status: '',
	});
	const [selectedArtwork, setSelectedArtwork] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		responseData: artworks,
		loading,
		error,
	} = useFetchData('/artist/dashboard-retrieve-artworks', filters);

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

	// Close modal when clicked outside of the modal
	const handleBackdropClick = e => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	// Prevent body scroll when modal is open
	React.useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = 'hidden'; // Disable scrolling
		} else {
			document.body.style.overflow = 'auto'; // Enable scrolling again
		}

		// Cleanup on component unmount or when modal is closed
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isModalOpen]);

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
				{artworks?.length === 0 ? (
					<p>No artworks available.</p>
				) : (
					artworks?.map(artwork => (
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

							{/* Conditionally render the price if the display is "marketplace" */}
							{filters.display === 'marketplace' && artwork.price && (
								<p className='text-sm font-semibold text-gray-900 mt-2'>Price: ${artwork.price}</p>
							)}
						</div>
					))
				)}
			</div>

			{/* Modal */}
			{isModalOpen && selectedArtwork && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
					onClick={handleBackdropClick} // Close modal when backdrop is clicked
				>
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

						{/* Display price if it's a marketplace artwork or display filter is not set */}
						{(filters.display === 'marketplace' || filters.display === '') &&
							selectedArtwork.price && (
								<p className='text-sm font-semibold text-gray-900 mt-2'>
									Price: ${selectedArtwork.price}
								</p>
							)}

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
