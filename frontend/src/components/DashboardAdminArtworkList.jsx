import { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';

import { showToast } from '../utils/toastUtils';

import useFetchData from '../hooks/useFetchDataPrivateRoute';
import usePostData from '../hooks/usePostData';

import NavbarAdmin from './NavbarAdmin';

const DashboardAdminArtworkList = () => {
	const artworkModalRef = useRef(null);
	const [selectedArtwork, setSelectedArtwork] = useState(null);
	const [reason, setReason] = useState('');
	const [refetchTrigger, setRefetchTrigger] = useState(0);
	const [filters, setFilters] = useState({ status: '' });
	const imageLabels = {
		frontView: 'Front view',
		artworkWithMaterials: 'With artwork Materials',
		selfieWithArtwork: 'With artwork selfie',
		angleOne: 'Angle one',
		angleTwo: 'Angle two',
		angleThree: 'Ange three',
	};
	const [checkboxes, setCheckboxes] = useState({
		Title: false,
		Name: false,
		Year: false,
		Medium: false,
		Dimension: false,
		Description: false,
		Display: false,
		Price: false,
		FrontView: false,
		ArtworkWithMaterials: false,
		SelfieWithArtwork: false,
		AngleOne: false,
		AngleTwo: false,
		AngleThree: false,
	});

	const {
		responseData: artworks,
		statusSummary,
		loading,
		error,
	} = useFetchData('/admin/artworks', filters, refetchTrigger);

	const { postData, isPosting, postError, postResponse } = usePostData();

	const handleFilterChange = e => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const allChecked = Object.values(checkboxes).every(checked => checked);

	const handleApprove = async artworkId => {
		if (!artworkId) {
			showToast.error('Artist ID is missing');
			return;
		}

		try {
			showToast.info('Processing approval...');
			const { responseData, error } = await postData(
				`/admin/approve-artwork/${artworkId}`,
				{},
				'PATCH'
			);

			if (!error) {
				showToast.success('Artist approved successfully!');
				setRefetchTrigger(prev => prev + 1);
			} else {
				showToast.error('Approval failed');
				console.error('Approval failed:', error);
				setRefetchTrigger(prev => prev + 1);
			}
		} catch (error) {
			showToast.error('Unexpected error occurred');
			console.error('Unexpected error:', error);
		}
	};

	const handleReject = async () => {
		if (!reason.trim()) {
			showToast.error('Please provide a reason for rejection');
			return;
		}

		try {
			showToast.info('Processing rejection...');
			const { responseData, error } = await postData(
				`/admin/reject-artwork/${selectedArtist._id}`,
				{ reason },
				'PATCH'
			);

			if (!error) {
				showToast.success('Artist rejected successfully!');
				setRefetchTrigger(prev => prev + 1);
			} else {
				showToast.error('Rejection failed');
				console.error('Rejection failed:', error);
			}
		} catch (error) {
			showToast.error('Unexpected error occurred');
			console.error('Unexpected error:', error);
		}
		setReason('');
	};

	const handleDisable = async () => {
		if (!reason.trim()) {
			showToast.error('Please provide a reason for disabling the artist');
			return;
		}

		try {
			showToast.info('Processing disabling...');
			const { responseData, error } = await postData(
				`/admin/disable-artwork/${selectedArtwork._id}`,
				{ reason },
				'PATCH'
			);

			if (!error) {
				showToast.success('Artist disabled successfully!');
				setRefetchTrigger(prev => prev + 1);
			} else {
				showToast.error('Disabling failed');
				console.error('Disabling failed:', error);
			}
		} catch (error) {
			showToast.error('Unexpected error occurred');
		}
		setReason('');
	};

	const handleArtworkClick = artist => setSelectedArtwork(artist);

	const handleCheckboxChange = e => {
		const { name, checked } = e.target;
		setCheckboxes(prevState => ({
			...prevState,
			[name]: checked,
		}));
	};

	useEffect(() => {
		if (selectedArtwork) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';

		return () => (document.body.style.overflow = 'auto');
	}, [selectedArtwork]);

	return (
		<div className='container mx-auto font-custom'>
			<div className='hidden lg:block'>
				<NavbarAdmin />
			</div>

			{/* SUM OF EACH STATUS */}
			<div className='text-sm px-2 mb-3 grid grid-cols-2 grid-rows-2 gap-3 md:grid-cols-4 md:grid-rows-1 md:px-3 xl:px-0 '>
				<div className='bg-blue-200 rounded-xl flex flex-col px-4 py-5 gap-2 lg:py-5 xl:py-4'>
					<p className='w-8 h-8 xl:w-10 xl:h-10 bg-blue-500 text-white rounded-lg flex justify-center items-center text-lg xl:text-2xl font-semibold'>
						{statusSummary?.approve || 0}
					</p>
					<p className='text-blue-500 font-bold'>Artwork Approved</p>
				</div>

				<div className='bg-yellow-200 rounded-xl flex flex-col px-4 py-5 gap-2 lg:py-5 xl:py-4'>
					<p className='w-8 h-8 xl:w-10 xl:h-10 bg-yellow-500 text-white rounded-lg flex justify-center items-center text-lg xl:text-2xl font-semibold'>
						{statusSummary?.pending || 0}
					</p>
					<p className='text-yellow-500 font-bold'>Artwork Awaiting Approval</p>
				</div>

				<div className='bg-red-200 rounded-xl flex flex-col px-4 py-5 gap-2 lg:py-5 xl:py-4'>
					<p className='w-8 h-8 xl:w-10 xl:h-10 bg-red-500 text-white rounded-lg flex justify-center items-center text-lg xl:text-2xl font-semibold'>
						{statusSummary?.reject || 0}
					</p>
					<p className='text-red-500 font-bold'>Artwork Declined</p>
				</div>

				<div className='bg-gray-200 rounded-xl flex flex-col px-4 py-5 gap-2 lg:py-5 xl:py-4'>
					<p className='w-8 h-8 xl:w-10 xl:h-10 bg-gray-500 text-white rounded-lg flex justify-center items-center text-lg xl:text-2xl font-semibold'>
						{statusSummary?.disable || 0}
					</p>
					<p className='text-gray-500 font-bold'>Artwork Inactive</p>
				</div>
			</div>

			{/* HEADERS */}
			<div className='text-sm font-medium py-3 px-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 lg:px-2 xl:grid-cols-10'>
				<p className='col-span-2 md:col-span-2'>Title</p>
				<p className='hidden sm:block col-span-1 md:col-span-2'>Artist</p>
				<p className='hidden md:block col-span-1'>Year</p>
				<p className='hidden xl:block col-span-1'>Medium</p>
				<p className='hidden xl:block col-span-1'>Dimension</p>
				<p className='hidden lg:block col-span-1'>Display</p>
				<p className='hidden lg:block col-span-1'>Price</p>
				<div className='relative flex items-center col-span-1'>
					<select
						name='status'
						value={filters.status}
						onChange={handleFilterChange}
						className='appearance-none bg-transparent flex-1 text-center pr-2'
					>
						<option value=''>All Status</option>
						<option value='approve'>Approve</option>
						<option value='pending'>Pending</option>
						<option value='reject'>Reject</option>
						<option value='disable'>Disable</option>
					</select>
					<MdKeyboardArrowDown className='absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none' />
				</div>
			</div>

			{loading && <p>Loading artists...</p>}
			{error && <p className='text-red-500'>{error}</p>}

			{/* ARTWORK LIST */}
			<div className='text-xs overflow-y-auto lg:max-h-[320px] xl:max-h-[460px] rounded-lg scrollbar-none'>
				{artworks?.length > 0 ? (
					artworks.map(artwork => (
						<div
							key={artwork._id}
							className='border-b grid grid-cols-3 bg-white sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 items-center py-3 px-2'
						>
							<p
								className='col-span-2 md:col-span-2 cursor-pointer text-blue-500 truncate'
								onClick={() => handleArtworkClick(artwork)}
							>
								{artwork.title}
							</p>
							<p className='col-span-1 hidden sm:block truncate md:col-span-2'>
								{artwork.artistName}
							</p>
							<p className='col-span-1 hidden md:block'>{artwork.yearCreated}</p>
							<p className='col-span-1 hidden xl:block truncate'>{artwork.medium}</p>
							<p className='col-span-1 hidden xl:block'>{artwork.dimension}</p>
							<p className='col-span-1 hidden lg:block'>{artwork.display}</p>
							<p className='col-span-1 hidden lg:block'>{artwork.price}</p>
							<div className='flex justify-center'>
								<span
									className={`text-xs font-medium px-2 py-1 rounded-md ${
										artwork.status === 'approve'
											? 'bg-blue-100 text-blue-600'
											: artwork.status === 'reject'
												? 'bg-red-100 text-red-600'
												: artwork.status === 'pending'
													? 'bg-yellow-100 text-yellow-600'
													: 'bg-gray-100 text-gray-600'
									}`}
								>
									{artwork.status}
								</span>
							</div>
						</div>
					))
				) : (
					<p>No artworks found.</p>
				)}
			</div>

			{/* MODAL */}
			{selectedArtwork && (
				<div
					ref={artworkModalRef}
					className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center'
				>
					<div className='grid grid-cols-3 overflow-y-auto bg-white relative rounded-xl shadow-lg max-w-[59rem] w-full h-[89vh]'>
						<button
							className='absolute top-4 right-4 cursor-pointer text-xl'
							onClick={() => {
								setSelectedArtwork(null);
								setReason('');
								setCheckboxes({
									Title: false,
									Name: false,
									Year: false,
									Medium: false,
									Dimension: false,
									Description: false,
									Display: false,
									Price: false,
									FrontView: false,
									ArtworkWithMaterials: false,
									SelfieWithArtwork: false,
									AngleOne: false,
									AngleTwo: false,
									AngleThree: false,
								});
							}}
						>
							<CgClose />
						</button>

						{/* LEFT */}
						<div className='overflow-y-auto col-span-2 text-sm scrollbar-none'>
							<div className='inline-block p-1 px-2 mt-2 ml-2 rounded-md'>
								<span
									className={`text-xs font-medium px-4 py-1 rounded-md ${
										selectedArtwork.status === 'approve'
											? 'bg-green-100 text-green-500'
											: selectedArtwork.status === 'reject'
												? 'bg-red-100 text-red-500'
												: selectedArtwork.status === 'pending'
													? 'bg-yellow-100 text-yellow-500'
													: 'bg-gray-100 text-gray-600'
									}`}
								>
									{selectedArtwork.status}
								</span>
							</div>

							<div className='inline-block p-1 px-2 mt-2 ml-2 rounded-md'>
								<span
									className={`text-xs font-medium px-4 py-1 rounded-md ${
										selectedArtwork.display === 'marketplace'
											? 'bg-cyan-100 text-cyan-500'
											: 'bg-purple-100 text-purple-600'
									}`}
								>
									{selectedArtwork.display}
								</span>
							</div>

							<h1 className='text-base font-semibold px-3 pt-6 pb-3 md:px-5 md:text-lg'>
								Artwork Details
							</h1>

							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Title</p>
								<p className='text-gray-600'>{selectedArtwork.title}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Artist Name</p>
								<p className='text-gray-600'>{selectedArtwork.artistName}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Year</p>
								<p className='text-gray-600'>{selectedArtwork.yearCreated}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Medium</p>
								<p className='text-gray-600'>{selectedArtwork.medium}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Dimension</p>
								<p className='text-gray-600'>{selectedArtwork.dimension}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Description</p>
								<p className='text-gray-600'>{selectedArtwork.description}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Display</p>
								<p className='text-gray-600'>{selectedArtwork.display}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Price</p>
								<p className='text-gray-600'>{selectedArtwork.price}</p>
							</div>

							{selectedArtwork.images &&
								Object.entries(selectedArtwork.images).map(([key, url]) => (
									<div key={key} className='border-b px-4 grid grid-cols-2 py-4'>
										<p className='text-gray-900 font-medium'>{imageLabels[key] || 'Unknown'}</p>
										<a href={url} target='_blank' className='flex justify-center'>
											<img src={url} alt={key} className='h-auto w-56 rounded-xl' />
										</a>
									</div>
								))}
						</div>

						{/* RIGHT */}
						<div className='bg-slate-200 p-5 text-sm flex flex-col'>
							{selectedArtwork.status === 'pending' && (
								<div className='flex flex-col justify-between h-full'>
									<div className=''>
										<h1 className='pb-1 text-base'>Validate Content</h1>
										<form className=''>
											{Object.keys(checkboxes).map(key => (
												<div key={key} className='flex gap-2 pb-1'>
													<input
														type='checkbox'
														id={key}
														name={key}
														checked={checkboxes[key]}
														onChange={handleCheckboxChange}
													/>
													<label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1')}</label>
												</div>
											))}
										</form>
									</div>

									{!allChecked && (
										<div className='gap-3'>
											<label htmlFor='rejectReason'>Reason</label>
											<textarea
												id='rejectReason'
												placeholder='Input reasons...'
												value={reason}
												onChange={e => setReason(e.target.value)}
												className='rounded w-full p-2 text-sm'
												rows='7'
											></textarea>
										</div>
									)}
								</div>
							)}

							{selectedArtwork.status === 'pending' && (
								<div className='grid grid-cols-2 gap-5'>
									{/* APPROVE */}
									<button
										disabled={!allChecked} // Add this line
										className={`px-4 py-2 rounded-lg ${
											allChecked
												? 'text-white bg-green-500 cursor-pointer'
												: 'text-gray-400 bg-green-300 cursor-not-allowed'
										}`}
										onClick={() => {
											handleApprove(selectedArtwork._id);
											setSelectedArtwork(null);
											setCheckboxes({
												Title: false,
												Name: false,
												Year: false,
												Medium: false,
												Dimension: false,
												Description: false,
												Display: false,
												Price: false,
												FrontView: false,
												ArtworkWithMaterials: false,
												SelfieWithArtwork: false,
												AngleOne: false,
												AngleTwo: false,
												AngleThree: false,
											});
										}}
									>
										Approve
									</button>

									<button
										className='px-4 py-2 text-white bg-red-500 rounded-lg'
										onClick={() => {
											handleReject(selectedArtwork._id);
											setSelectedArtist(null);
											setReason('');
											setCheckboxes({
												Title: false,
												Name: false,
												Year: false,
												Medium: false,
												Dimension: false,
												Description: false,
												Display: false,
												Price: false,
												FrontView: false,
												ArtworkWithMaterials: false,
												SelfieWithArtwork: false,
												AngleOne: false,
												AngleTwo: false,
												AngleThree: false,
											});
										}}
									>
										Reject
									</button>
								</div>
							)}

							{selectedArtwork.status === 'approve' && (
								<div className='flex flex-col gap-3 mt-auto'>
									<div className='flex flex-col gap-1'>
										<label htmlFor='rejectReason'>Provide reasons</label>
										<textarea
											className='rounded w-full p-2 text-sm'
											rows='10'
											placeholder='Additional information...'
											id='rejectReason'
											value={reason}
											onChange={e => setReason(e.target.value)}
										></textarea>
									</div>

									<button
										className='px-4 py-2 text-white bg-red-500 rounded-lg'
										onClick={() => {
											handleDisable(selectedArtwork._id);
											setSelectedArtwork(null);
											setReason('');
										}}
									>
										Disable
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardAdminArtworkList;
