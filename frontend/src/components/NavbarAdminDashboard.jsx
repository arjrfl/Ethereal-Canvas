import { useState, useRef, useEffect } from 'react';
import logo from '../assets/images/logo-ec.svg';

const Navbar = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAvatarOpen, setIsAvatarOpen] = useState(false);
	const avatarRef = useRef(null);

	const avatarLetter = name ? name.charAt(0).toUpperCase() : '?';

	const handleLogout = () => {
		localStorage.clear();
		window.location.href = '/login';
	};

	const handleClickOutside = event => {
		if (avatarRef.current && !avatarRef.current.contains(event.target)) {
			setIsAvatarOpen(false);
		}
	};

	useEffect(() => {
		const storedName = localStorage.getItem('fullName');
		const storedEmail = localStorage.getItem('email');
		setName(storedName || '');
		setEmail(storedEmail || '');
	}, []);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<nav className='border-b border-gray-300 drop-shadow lg:block hidden mb-10'>
			<div className='font-custom flex items-center justify-between pb-2'>
				<img src={logo} alt='logo' className='h-auto w-[7rem]' />

				{/* Avatar */}
				<div className='relative' ref={avatarRef}>
					<button
						onClick={() => setIsAvatarOpen(!isAvatarOpen)}
						className='w-9 h-9 rounded-lg bg-blue-500 text-white font-bold text-md flex items-center justify-center'
						title={name}
					>
						{avatarLetter}
					</button>

					{isAvatarOpen && (
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

export default Navbar;
