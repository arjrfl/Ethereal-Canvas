import { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';

import { showToast } from '../utils/toastUtils';

import useFetchData from '../hooks/useFetchDataPrivateRoute';
import usePostData from '../hooks/usePostData';
import useCalculateAge from '../hooks/useCalAge';
import useRandomColor from '../hooks/useRandomColor';

import Navbar from './NavbarAdminDashboard';

const DashboardAdminArtistList = () => {
	const [selectedArtist, setSelectedArtist] = useState(null);
	const [reason, setReason] = useState('');
	const [refetchTrigger, setRefetchTrigger] = useState(0);
	const artistModalRef = useRef(null);
	const artistAge = dob => useCalculateAge(dob);
	const { postData, isPosting, postError, postResponse } = usePostData();
	const [filters, setFilters] = useState({ status: '' });
	const {
		responseData: artists,
		loading,
		error,
	} = useFetchData('/admin/artists', filters, refetchTrigger);

	const { generateColorArray } = useRandomColor();
	const randomColorsRef = useRef([]);
	useEffect(() => {
		if (artists && artists.length > 0 && randomColorsRef.current.length === 0) {
			randomColorsRef.current = generateColorArray(artists.length);
		}
	}, [artists, generateColorArray]);

	const handleApprove = async artistId => {
		if (!artistId) {
			showToast.error('Artist ID is missing');
			return;
		}

		try {
			showToast.info('Processing approval...');
			const { responseData, error } = await postData(
				`/admin/approve-artist/${artistId}`,
				{},
				'PATCH'
			);
			if (!error) {
				showToast.success('Artist approved successfully!');
				setRefetchTrigger(prev => prev + 1);
			} else {
				showToast.error('Approval failed');
				console.error('Approval failed:', error);
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
				`/admin/reject-artist/${selectedArtist._id}`,
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
				`/admin/disable-artist/${selectedArtist._id}`,
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

	const handleFilterChange = e => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	const getInitials = name => {
		if (!name) return '';
		const nameParts = name.split(' ');
		const initials = nameParts.map(part => part[0]).join('');
		return initials.toUpperCase().slice(0, 2);
	};

	const handleArtistClick = artist => {
		setSelectedArtist(artist);
	};

	useEffect(() => {
		if (selectedArtist) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';

		return () => (document.body.style.overflow = 'auto');
	}, [selectedArtist]);

	const [checkboxes, setCheckboxes] = useState({
		Name: false,
		Email: false,
		Gender: false,
		Location: false,
		Number: false,
		Age: false,
		About: false,
		DriveLink: false,
		Workspace: false,
		WithWorkspace: false,
		ValidId: false,
		WithValidId: false,
	});

	const allChecked = Object.values(checkboxes).every(checked => checked);

	const handleCheckboxChange = e => {
		const { name, checked } = e.target;
		setCheckboxes(prevState => ({
			...prevState,
			[name]: checked,
		}));
	};

	return (
		<div className='container mx-auto font-custom'>
			<Navbar />

			{loading && <p>Loading artists...</p>}
			{error && <p className='text-red-500'>{error}</p>}

			{/* HEADERS */}
			<div className='grid grid-cols-3 text-sm font-medium pb-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 lg:px-2 xl:grid-cols-12'>
				<p className='col-span-2'>Name</p>
				<p className='hidden sm:block col-span-2'>Email</p>
				<p className='hidden md:block col-span-2 pl-6 lg:pl-8 xl:pl-0'>Gender</p>
				<p className='hidden lg:block col-span-2'>Location</p>
				<p className='hidden xl:block col-span-2'>Number</p>
				<p className='hidden xl:block col-span-1'>Age</p>
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

			{/* ARTIST LIST */}
			<div className='text-xs overflow-y-auto lg:max-h-[587px] xl:max-h-[586px] rounded-lg scrollbar-none'>
				{artists?.map((artist, index) => (
					<div
						key={artist._id}
						className='border-b grid grid-cols-3 bg-white sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12 items-center py-3 px-2'
					>
						<div className='col-span-2 flex items-center'>
							{artist.avatar ? (
								<img
									src={artist.avatar}
									alt='artist avatar'
									className='w-7 h-7 rounded-md object-cover'
								/>
							) : (
								// FALLBACK AVATAR
								<div
									className='w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-semibold'
									style={{ backgroundColor: randomColorsRef.current[index] }}
								>
									{getInitials(artist.fullName)}
								</div>
							)}
							<p
								className='pl-3 cursor-pointer text-blue-500'
								onClick={() => handleArtistClick(artist)}
							>
								{artist.fullName}
							</p>
						</div>
						<p className='hidden sm:block col-span-2 sm:text-gray-500'>{artist.email}</p>
						<p className='hidden md:block col-span-2 pl-6 lg:pl-8 xl:pl-0'>{artist.gender}</p>
						<p className='hidden lg:block col-span-2'>{artist.location}</p>
						<p className='hidden xl:block col-span-2'>{artist.phoneNumber}</p>
						<p className='hidden xl:block col-span-1'>{artistAge(artist.dateOfBirth)}</p>
						<div className='flex justify-center'>
							<span
								className={`text-xs font-medium px-2 py-1 rounded-md ${
									artist.status === 'approve'
										? 'bg-green-100 text-green-600'
										: artist.status === 'reject'
											? 'bg-red-100 text-red-600'
											: artist.status === 'pending'
												? 'bg-yellow-100 text-yellow-600'
												: 'bg-gray-100 text-gray-600'
								}`}
							>
								{artist.status}
							</span>
						</div>
					</div>
				))}
			</div>

			{/* MODAL */}
			{selectedArtist && (
				<div
					ref={artistModalRef}
					className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center'
				>
					<div className='grid grid-cols-3 overflow-y-auto bg-white relative rounded-xl shadow-lg max-w-[59rem] w-full h-[89vh]'>
						<button
							className='absolute top-4 right-4 cursor-pointer text-xl'
							onClick={() => {
								setSelectedArtist(null);
								setReason('');
								setCheckboxes({
									Name: false,
									Email: false,
									Gender: false,
									Location: false,
									Number: false,
									Age: false,
									About: false,
									DriveLink: false,
									Workspace: false,
									WithWorkspace: false,
									ValidId: false,
									WithValidId: false,
								});
							}}
						>
							<CgClose />
						</button>

						<div className='overflow-y-auto col-span-2 text-sm scrollbar-none'>
							<div className='inline-block p-1 px-2 mt-2 ml-2 rounded-md'>
								<span
									className={`text-xs font-medium px-4 py-1 rounded-md ${
										selectedArtist.status === 'approve'
											? 'bg-green-100 text-green-500'
											: selectedArtist.status === 'reject'
												? 'bg-red-100 text-red-500'
												: selectedArtist.status === 'pending'
													? 'bg-yellow-100 text-yellow-500'
													: 'bg-gray-100 text-gray-600'
									}`}
								>
									{selectedArtist.status}
								</span>
							</div>

							<h1 className='text-base font-semibold px-3 pt-6 pb-3 md:px-5 md:text-lg'>
								Artist Details
							</h1>

							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Name</p>
								<p className='text-gray-600'>{selectedArtist.fullName}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Email</p>
								<p className='text-gray-600'>{selectedArtist.email}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Gender</p>
								<p className='text-gray-600'>{selectedArtist.gender}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Location</p>
								<p className='text-gray-600'>{selectedArtist.location}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Number</p>
								<p className='text-gray-600'>{selectedArtist.phoneNumber}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Age</p>
								<p className='text-gray-600'>{useCalculateAge(selectedArtist.dateOfBirth)}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>About</p>
								<p className='text-gray-600 text-pretty'>{selectedArtist.aboutYourself}</p>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>
									Drive link{' '}
									<small className='text-slate-500 text-xs font-light'>(Click the link)</small>
								</p>
								<a href={selectedArtist.sharedDrive} target='_blank'>
									<p className='text-blue-600 text-sm text-pretty line-clamp-4'>
										{selectedArtist.sharedDrive}
									</p>
								</a>
							</div>

							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>Workspace</p>
								<a
									href={selectedArtist.images.workspace}
									target='_blank'
									className='flex justify-center'
								>
									<img
										src={selectedArtist.images.workspace}
										alt='workspace'
										className='h-auto w-56 rounded-xl'
									/>
								</a>
							</div>

							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>With Workspace</p>
								<a
									href={selectedArtist.images.selfieWithWorkspace}
									target='_blank'
									className='flex justify-center'
								>
									<img
										src={selectedArtist.images.selfieWithWorkspace}
										alt='workspace'
										className='h-auto w-56 rounded-xl'
									/>
								</a>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>validId</p>
								<a
									href={selectedArtist.images.validId}
									target='_blank'
									className='flex justify-center'
								>
									<img
										src={selectedArtist.images.validId}
										alt='workspace'
										className='h-auto w-56 rounded-xl'
									/>
								</a>
							</div>
							<div className='border-b px-4 grid grid-cols-2 py-4'>
								<p className='text-gray-900 font-medium'>selfieWithId</p>
								<a
									href={selectedArtist.images.selfieWithId}
									target='_blank'
									className='flex justify-center'
								>
									<img
										src={selectedArtist.images.selfieWithId}
										alt='workspace'
										className='h-auto w-72 rounded-xl'
									/>
								</a>
							</div>
						</div>

						<div className='bg-slate-200 flex flex-col justify-between p-5 text-sm'>
							<div>
								{selectedArtist.status === 'pending' && (
									<>
										<form className='mb-3'>
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

										{!allChecked && (
											<div className='flex flex-col gap-1'>
												<label htmlFor='rejectReason'>Provide reasons for rejection</label>
												<textarea
													id='rejectReason'
													placeholder='Additional information...'
													value={reason}
													onChange={e => setReason(e.target.value)}
													className='rounded w-full p-2 text-sm'
												></textarea>
											</div>
										)}
									</>
								)}
							</div>

							{selectedArtist.status === 'pending' && (
								<div className=' grid grid-cols-2 gap-5'>
									{/* APPROVE */}
									<button
										className={`px-4 py-2 rounded-lg ${
											allChecked
												? 'text-white bg-green-500 cursor-pointer'
												: 'text-gray-400 bg-green-300 cursor-not-allowed'
										}`}
										onClick={() => {
											handleApprove(selectedArtist._id);
											setSelectedArtist(null);
											setCheckboxes({
												Name: false,
												Email: false,
												Gender: false,
												Location: false,
												Number: false,
												Age: false,
												About: false,
												DriveLink: false,
												Workspace: false,
												WithWorkspace: false,
												ValidId: false,
												WithValidId: false,
											});
										}}
										disabled={!allChecked}
									>
										Approve
									</button>

									{/* REJECT */}
									<button
										className='px-4 py-2 text-white bg-red-500 rounded-lg'
										onClick={() => {
											handleReject(selectedArtist._id);
											setSelectedArtist(null);
											setReason('');
											setCheckboxes({
												Name: false,
												Email: false,
												Gender: false,
												Location: false,
												Number: false,
												Age: false,
												About: false,
												DriveLink: false,
												Workspace: false,
												WithWorkspace: false,
												ValidId: false,
												WithValidId: false,
											});
										}}
									>
										Reject
									</button>
								</div>
							)}

							{selectedArtist.status === 'approve' && (
								<div className='flex flex-col gap-3'>
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
											handleDisable(selectedArtist._id);
											setSelectedArtist(null);
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

export default DashboardAdminArtistList;
