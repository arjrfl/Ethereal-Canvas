import { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';

import useFetchData from '../hooks/useFetchDataPrivateRoute';
import usePostData from '../hooks/usePostData';
import useCalculateAge from '../hooks/useCalAge';

import Navbar from './NavbarAdminDashboard';

const DashboardAdminArtistList = () => {
	const [selectedArtist, setSelectedArtist] = useState(null);
	const [reason, setReason] = useState(''); // Reason for rejection
	const [showRejectionForm, setShowRejectionForm] = useState(false); // Show rejection reason form

	const artistModalRef = useRef(null);

	const artistAge = dob => useCalculateAge(dob);

	const { postData, isPosting, postError, postResponse } = usePostData();

	const handleApprove = async artistId => {
		if (!artistId) return console.error('Artist ID is missing');

		try {
			const { responseData, error } = await postData(
				`/admin/approve-artist/${artistId}`,
				{},
				'PATCH'
			);
			if (!error) {
				console.log('Artist approved successfully!', responseData);
			} else {
				console.error('Approval failed:', error);
			}
		} catch (error) {
			console.error('Unexpected error:', error);
		}
	};

	const handleReject = async () => {
		if (!reason.trim()) {
			return alert('Please provide a reason for rejection');
		}

		try {
			const { responseData, error } = await postData(
				`/admin/reject-artist/${selectedArtist._id}`,
				{ reason },
				'PATCH'
			);
			if (!error) {
				console.log('Artist rejected successfully!', responseData);
			} else {
				console.error('Rejection failed:', error);
			}
		} catch (error) {
			console.error('Unexpected error:', error);
		}
		setShowRejectionForm(false);
		setReason(''); // Clear the reason after rejection
	};

	const [filters, setFilters] = useState({
		status: '',
	});

	const { responseData: artists, loading, error } = useFetchData('/admin/artists', filters);

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
		if (selectedArtist) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [selectedArtist]);

	return (
		<div className='container mx-auto'>
			<Navbar />

			{loading && <p>Loading artists...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			<div className='grid grid-cols-3 text-sm font-medium pb-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 lg:px-2 xl:grid-cols-12'>
				<p className='col-span-2'>Name</p>
				<p className='hidden sm:block col-span-2'>Email</p>
				<p className='hidden md:block col-span-2 pl-6 lg:pl-8 xl:pl-0'>Gender</p>
				<p className='hidden lg:block col-span-2'>Location</p>
				<p className='hidden xl:block col-span-2'>Number</p>
				<p className='hidden xl:block col-span-1'>Age</p>
				<div className='relative inline-block w-24 mx-auto text-center'>
					<select
						name='status'
						value={filters.status}
						onChange={handleFilterChange}
						className='rounded-sm w-24 text-center appearance-none bg-transparent'
					>
						<option value=''>All Status</option>
						<option value='approve'>Approve</option>
						<option value='pending'>Pending</option>
						<option value='reject'>Reject</option>
					</select>
					<span className='absolute right-0 lg:right-1 top-1/2 transform -translate-y-1/2 pointer-events-none'>
						<MdKeyboardArrowDown />
					</span>
				</div>
			</div>
			<div className='text-sm overflow-y-auto lg:max-h-[587px] xl:max-h-[586px] rounded-lg scrollbar-none'>
				{artists?.map(artist => (
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
								<div className='w-7 h-7 rounded-md bg-gray-300 flex items-center justify-center text-white text-xs font-semibold'>
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
								className={`text-xs font-medium px-2 py-1 rounded-full ${
									artist.status === 'approve'
										? 'bg-green-100 text-green-600'
										: artist.status === 'reject'
											? 'bg-red-100 text-red-600'
											: 'bg-yellow-100 text-yellow-600'
								}`}
							>
								{artist.status}
							</span>
						</div>
					</div>
				))}
			</div>

			{selectedArtist && (
				<div
					ref={artistModalRef}
					className='fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'
				>
					<div className='bg-white rounded-lg w-[450px] p-5 relative'>
						<h2 className='font-bold text-lg mb-3'>{selectedArtist.fullName}</h2>
						<p className='mb-4'>{selectedArtist.email}</p>
						<div className='mb-4'>
							<p className='text-gray-600'>Gender: {selectedArtist.gender}</p>
							<p className='text-gray-600'>Location: {selectedArtist.location}</p>
							<p className='text-gray-600'>Phone: {selectedArtist.phoneNumber}</p>
							{/* Make sure the age is correctly calculated */}
							<p className='text-gray-600'>Age: {useCalculateAge(selectedArtist.dateOfBirth)}</p>
						</div>
						{selectedArtist.status === 'pending' && (
							<div className='flex justify-end gap-4'>
								<button
									onClick={() => handleApprove(selectedArtist._id)}
									className='px-4 py-2 text-white bg-green-500 rounded-lg'
								>
									Approve
								</button>
								<button
									onClick={() => setShowRejectionForm(true)} // Show rejection form
									className='px-4 py-2 text-white bg-red-500 rounded-lg'
								>
									Reject
								</button>
							</div>
						)}

						{/* Show rejection reason form */}
						{showRejectionForm && (
							<div className='mt-4'>
								<textarea
									className='w-full p-2 border border-gray-300 rounded-md'
									rows='4'
									placeholder='Enter rejection reason...'
									value={reason}
									onChange={e => setReason(e.target.value)}
								></textarea>
								<div className='mt-2 flex justify-end gap-4'>
									<button
										onClick={handleReject}
										className='px-4 py-2 text-white bg-red-500 rounded-lg'
									>
										Confirm Reject
									</button>
									<button
										onClick={() => setShowRejectionForm(false)}
										className='px-4 py-2 text-white bg-gray-500 rounded-lg'
									>
										Cancel
									</button>
								</div>
							</div>
						)}

						<CgClose
							className='absolute top-2 right-2 cursor-pointer'
							onClick={() => setSelectedArtist(null)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardAdminArtistList;
