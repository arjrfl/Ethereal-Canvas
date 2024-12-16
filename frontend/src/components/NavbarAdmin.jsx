import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const NavbarAdmin = () => {
	const [name, setName] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Get the current path
	const location = useLocation();

	// Map routes to section titles
	const sectionTitles = {
		'/admin/dashboard/list-artist': 'ARTISTS',
		'/admin/dashboard/list-artwork': 'ARTWORKS',
		'/admin/dashboard/list-collector': 'COLLECTORS',
		'/admin/dashboard/list-transaction': 'TRANSACTIONS',
	};

	// Get the section title based on the current path
	const currentSection = sectionTitles[location.pathname] || 'Unknown Section';

	useEffect(() => {
		const storedName = localStorage.getItem('fullName');
		setName(storedName || '');
	}, []);

	const avatarLetter = name ? name.charAt(0).toUpperCase() : '?';

	const handleClickOutside = event => {
		// Close the avatar dropdown if clicked outside
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

	return (
		<nav className='border-b border-gray-300 drop-shadow px-2 py-2 mb-3'>
			<div className='font-custom flex items-center justify-between'>
				{/* Section */}
				<h1 className='text-3xl font-extrabold'>{currentSection}</h1>

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
							<ul>
								<li className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
									Settings
								</li>
								<li>
									<button
										onClick={handleLogout}
										className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100'
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
	);
};

export default NavbarAdmin;
