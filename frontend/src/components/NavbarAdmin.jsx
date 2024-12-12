import { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo-ec.svg';

const NavbarAdmin = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [nameModalOpen, setNameModalOpen] = useState(false); // State for the name modal
	const dropdownRef = useRef(null);
	const nameRef = useRef(null); // Ref for name to handle its click event separately

	useEffect(() => {
		const storedName = localStorage.getItem('fullName');
		const storedEmail = localStorage.getItem('email');
		setName(storedName || '');
		setEmail(storedEmail || '');
	}, []);

	const avatarLetter = name ? name.charAt(0).toUpperCase() : '?';

	const handleClickOutside = event => {
		// Close the avatar dropdown if clicked outside
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}

		// Close the name modal if clicked outside
		if (nameRef.current && !nameRef.current.contains(event.target)) {
			setNameModalOpen(false);
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

	const handleNameClick = () => {
		setNameModalOpen(!nameModalOpen); // Toggle the name modal when clicked
	};

	return (
		<nav className='border-b border-gray-300 drop-shadow lg:hidden'>
			{/* SMALL SCREEN NAV */}
			<div className='font-custom flex items-center justify-between p-2'>
				{/* <p className='text-xl font-extrabold'>Admin Dashboard</p> */}
				<img src={logo} alt='logo' className='h-auto w-[6rem]' />

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

				{/* Artist Name */}
				<div ref={nameRef} className='cursor-pointer'>
					<p onClick={handleNameClick} className='text-blue-500'>
						{name}
					</p>

					{/* Name Modal */}
					{nameModalOpen && (
						<div className='absolute top-12 right-0 w-48 bg-white border rounded-lg shadow-lg z-50 drop-shadow-lg'>
							<ul className='py-1'>
								<li>
									<p className='w-full text-left px-4 py-2 text-sm text-gray-700'>Name: {name}</p>
								</li>
								<li>
									<p className='w-full text-left px-4 py-2 text-sm text-gray-700'>Email: {email}</p>
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
