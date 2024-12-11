import { useState, useEffect, useRef } from 'react';
import useFetchData from '../hooks/useFetchDataPrivateRoute';
import { MdKeyboardArrowDown } from 'react-icons/md';

import logo from '../assets/images/logo-ec.svg';

const DashboardAdminArtistList = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const storedName = localStorage.getItem('fullName');
		const storedEmail = localStorage.getItem('email');
		setName(storedName || '');
		setEmail(storedEmail || '');
	}, []);

	const avatarLetter = name ? name.charAt(0).toUpperCase() : '?';

	const handleClickOutside = event => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		// Clear localStorage and redirect to login page
		localStorage.clear();
		window.location.href = '/login';
	};

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

	// Calculate age based on date of birth
	const calculateAge = dob => {
		const birthDate = new Date(dob);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();
		if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
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
			<nav className='border-b border-gray-300 drop-shadow lg:block hidden mb-10'>
				{/* SMALL SCREEN NAV */}
				<div className='font-custom flex items-center justify-between pb-2'>
					<img src={logo} alt='logo' className='h-auto w-[7rem]' />

					{/* Avatar */}
					<div className='relative' ref={dropdownRef}>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className='w-9 h-9 rounded-lg bg-blue-500 text-white font-bold text-md flex items-center justify-center'
							title={name}
						>
							{avatarLetter}
						</button>

						{isOpen && (
							<div className='absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50 drop-shadow-lg'>
								<ul className='py-1'>
									<li>
										<button
											onClick={handleLogout}
											className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
										>
											Logout
										</button>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</nav>

			{/* Loading State */}
			{loading && <p>Loading artists...</p>}

			{/* Error State */}
			{error && <p className='text-red-500'>{error}</p>}

			{/* ARTIST LIST */}
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
						<MdKeyboardArrowDown></MdKeyboardArrowDown>
					</span>
				</div>
			</div>

			{/* Scrollable Artist List */}
			<div className='text-sm overflow-y-auto lg:max-h-[587px] xl:max-h-[586px] rounded-lg scrollbar-none'>
				{artists?.map(artist => (
					<div
						key={artist._id}
						className='border-b grid grid-cols-3 bg-white sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-12 items-center py-3 px-2'
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
						<p className='hidden md:block col-span-2 pl-6 lg:pl-8 xl:pl-0'>{artist.gender}</p>
						<p className='hidden lg:block col-span-2'>{artist.location}</p>
						<p className='hidden xl:block col-span-2'>{artist.phoneNumber}</p>
						<p className='hidden xl:block col-span-1'>{calculateAge(artist.dateOfBirth)}</p>{' '}
						{/* Display age */}
						{/* Status */}
						<p className='text-center'>{artist.status}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default DashboardAdminArtistList;
