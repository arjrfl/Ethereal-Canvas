import { useState } from 'react';
import useFetchData from '../hooks/useFetchDataPrivateRoute';
import { MdKeyboardArrowDown } from 'react-icons/md';

const DashboardAdminArtistList = () => {
	// Set initial filter state for 'status'
	const [filters, setFilters] = useState({
		status: '',
	});

	// Fetch artist data based on the status filter
	const { responseData: artists, loading, error } = useFetchData('/admin/artists', filters);

	// Handle filter changes for the status
	const handleFilterChange = e => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	// Generate initials from the full name
	const getInitials = name => {
		if (!name) return '';
		const nameParts = name.split(' ');
		const initials = nameParts.map(part => part[0]).join('');
		return initials.toUpperCase().slice(0, 2); // Limit to 2 characters
	};

	return (
		<div className='container mx-auto'>
			<h1 className='text-xl font-bold mb-4'>Artist List</h1>

			{/* Loading State */}
			{loading && <p>Loading artists...</p>}

			{/* Error State */}
			{error && <p className='text-red-500'>{error}</p>}

			{/* Table header */}
			<div className='grid grid-cols-3 pb-3 border-b border-gray-300 drop-shadow sm:grid-cols-5 md:grid-cols-7'>
				<p className='col-span-2'>Name</p>
				<p className='hidden sm:block col-span-2'>Email</p>
				<p className='hidden md:block col-span-2'>Location</p>
				<div className='relative inline-block w-24 mx-auto text-center'>
					<select
						name='status'
						value={filters.status}
						onChange={handleFilterChange}
						className='text-sm rounded-sm w-24 text-center appearance-none bg-transparent'
					>
						<option value=''>All Status</option>
						<option value='approve'>Approve</option>
						<option value='pending'>Pending</option>
						<option value='reject'>Reject</option>
					</select>
					<span className='absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none'>
						<MdKeyboardArrowDown></MdKeyboardArrowDown>
					</span>
				</div>
			</div>

			{/* Artists Display */}
			<div className=''>
				{artists?.map(artist => (
					<div
						key={artist._id}
						className='border-b text-sm lg:text-base grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 items-center py-3'
					>
						{/* Avatar with fallback */}
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

							<p className='pl-3'>{artist.fullName}</p>
						</div>

						<p className='hidden sm:block col-span-2 sm:text-gray-500'>{artist.email}</p>

						<p className='hidden md:block col-span-2'>{artist.location}</p>

						{/* Status */}
						<p className='text-center'>{artist.status}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default DashboardAdminArtistList;
