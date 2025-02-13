import { useState, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';
import { MdKeyboardArrowDown } from 'react-icons/md';

import useFetchData from '../hooks/useFetchDataPrivateRoute';
import { formatPrice } from '../utils/formatPrice';

import { IoCloudUpload } from 'react-icons/io5';
import { FcStackOfPhotos } from 'react-icons/fc';

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

	const handleFilterChange = e => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	const handleArtworkClick = artwork => {
		setSelectedArtwork(artwork);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedArtwork(null);
	};

	const handleBackdropClick = e => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isModalOpen]);

	return (
		<div className='text-sm md:text-base font-custom p-10'>
			<div className='mb-8'>
				<div className='flex items-center gap-x-2 mb-1'>
					<h1 className='text-2xl text-slate-800 font-semibold'>Upload Artwork</h1>
					<p className='text-2xl text-green-500'>
						<FcStackOfPhotos />
					</p>
				</div>

				<p className='text-left text-xs'>Upload an artwork and wait for the admin's approval.</p>
			</div>

			{/* Filters Section */}
			<div className='mb-4 text-sm flex justify-between gap-4 sm:justify-start'>
				<div className='relative inline-block'>
					<select
						name='display'
						value={filters.display}
						onChange={handleFilterChange}
						className='border p-2 pr-8 rounded-md appearance-none'
					>
						<option value=''>Select Display</option>
						<option value='marketplace'>Marketplace</option>
						<option value='museum'>Museum</option>
					</select>
					<span className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
						<MdKeyboardArrowDown />
					</span>
				</div>

				<div className='relative inline-block'>
					<select
						name='status'
						value={filters.status}
						onChange={handleFilterChange}
						className='border p-2 pr-8 rounded-md appearance-none'
					>
						<option value=''>Select Status</option>
						<option value='pending'>Pending</option>
						<option value='approve'>Approve</option>
						<option value='reject'>Reject</option>
					</select>
					<span className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
						<MdKeyboardArrowDown />
					</span>
				</div>
			</div>

			{/* Loading State */}
			{loading && <p>Loading artworks...</p>}

			{/* Error State */}
			{error && <p className='text-red-500'>{error}</p>}

			{/* Artworks Display */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-20'>
				{artworks?.length === 0 ? (
					<p>No artworks available.</p>
				) : (
					artworks?.map(artwork => (
						<div
							key={artwork._id}
							className='border p-4 rounded-xl shadow-sm cursor-pointer bg-white frameSm'
							onClick={() => handleArtworkClick(artwork)}
						>
							<img
								src={artwork.images.frontView}
								alt={artwork.title}
								className='w-full h-48 object-cover mb-4 rounded-lg'
							/>

							<div className='bg-white text-left rounded-lg p-3 truncate'>
								<p className='text-sm truncate'>{artwork.artistName}</p>
								<p className='text-sm truncate'>
									{artwork.title}, <span className='italic'>{artwork.yearCreated}</span>
								</p>

								{filters.display === 'marketplace' && artwork.price && (
									<p className='text-sm'>{formatPrice(artwork.price)}</p>
								)}

								<p
									className={`text-sm inline-block px-2 text-white rounded ${
										artwork.status === 'approve'
											? 'bg-green-600'
											: artwork.status === 'pending'
												? 'bg-yellow-600'
												: 'bg-red-600'
									}`}
								>
									{artwork.status}
								</p>
							</div>
						</div>
					))
				)}
			</div>

			{/* Modal */}
			{isModalOpen && selectedArtwork && (
				<div
					className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center'
					onClick={handleBackdropClick}
				>
					<div className='relative bg-white m-2 rounded-xl shadow-lg max-w-4xl w-full overflow-auto max-h-[80vh] md:w-[700px]'>
						<button className='absolute top-4 right-2 text-2xl text-white' onClick={closeModal}>
							<CgClose />
						</button>

						<h1 className='text-base font-semibold px-3 pt-8 pb-3 md:px-5 md:text-lg'>
							Artwork Details
						</h1>

						<div className='border-b px-3 md:px-5 pb-5 md:grid md:grid-cols-2'>
							<p className='text-gray-900 font-medium pb-1'>Title</p>
							<p className='text-gray-700	'>{selectedArtwork.title}</p>
						</div>

						<div className='border-b px-3 md:px-5 py-5 md:grid md:grid-cols-2'>
							<p className='text-gray-900 font-medium pb-1'>Name</p>
							<p className='text-gray-700	'>{selectedArtwork.artistName}</p>
						</div>

						<div className='border-b px-3 md:px-5 py-5 md:grid md:grid-cols-2'>
							<p className='text-gray-900 font-medium pb-1'>Year</p>
							<p className='text-gray-700'>{selectedArtwork.yearCreated}</p>
						</div>

						<div className='border-b px-3 md:px-5 py-5 md:grid md:grid-cols-2'>
							<p className='text-gray-900 font-medium pb-1'>Medium</p>
							<p className='text-gray-700'>{selectedArtwork.medium}</p>
						</div>

						<div className='border-b px-3 md:px-5 py-5 md:grid md:grid-cols-2'>
							<p className='text-gray-900 font-medium pb-1'>Dimension</p>
							<p className='text-gray-700 break-words'>{selectedArtwork.dimension}</p>
						</div>

						<div className='border-b px-3 md:px-5 py-5 md:grid md:grid-cols-2'>
							<p className='text-gray-900 font-medium pb-1'>Description</p>
							<p className='text-gray-700'>{selectedArtwork.description}</p>
						</div>

						{(filters.display === 'marketplace' || filters.display === '') &&
							selectedArtwork.price && (
								<div className='border-b px-3 md:px-5 py-5 md:grid md:grid-cols-2'>
									<p className='text-gray-900 font-medium pb-1	'>Price</p>
									<p className='text-gray-700'>₱ {selectedArtwork.price}</p>
								</div>
							)}

						<h1 className='text-base font-semibold px-3 md:px-5 pt-8 pb-3 md:text-lg'>
							Artwork Images
						</h1>

						<div className='grid grid-cols-1 px-2 md:px-5 sm:grid-cols-2 sm:mb-4 gap-3 mb-3'>
							{Object.keys(selectedArtwork.images).map(key => (
								<img
									key={key}
									src={selectedArtwork.images[key]}
									alt={key}
									className='w-full rounded-lg'
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
