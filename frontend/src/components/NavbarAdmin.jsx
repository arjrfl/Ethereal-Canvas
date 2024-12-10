import { useState, useEffect, useRef } from 'react';

const NavbarAdmin = () => {
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

	return (
		<nav className='border-b border-gray-300 drop-shadow'>
			{/* SMALL SCREEN NAV */}
			<div className='font-custom flex items-center justify-between p-2'>
				<p className='text-xl font-extrabold'>Admin Dashboard</p>

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
	);
};

export default NavbarAdmin;
