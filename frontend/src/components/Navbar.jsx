import smallIcon from '../assets/images/small-icon.png';

import { TbMoonFilled, TbSunFilled, TbMenu2 } from 'react-icons/tb';

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CgCloseR } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';

import Dropdown from './Dropdown';
import Avatar from './Avatar';

import useStoredAvatar from '../hooks/useStoredAvatar';

const Navbar = ({ isDropdownOpen, setIsDropdownOpen }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [fullName, setFullName] = useState('');
	const [role, setRole] = useState('');
	const [email, setEmail] = useState('');
	const { avatar, name, email: storedEmail } = useStoredAvatar();
	const navigate = useNavigate();
	const menuRef = useRef(null);

	const updateLoginState = () => {
		const userToken = localStorage.getItem('accessToken');
		const userFullName = localStorage.getItem('fullName');
		const userRole = localStorage.getItem('role');
		const userEmail = localStorage.getItem('email');

		if (userToken && (userRole === 'artist' || userRole === 'collector')) {
			setIsLoggedIn(true);
			setFullName(userFullName || '');
			setRole(userRole || '');
			setEmail(userEmail || '');
		} else {
			setIsLoggedIn(false);
		}
	};

	useEffect(() => {
		updateLoginState();
	}, []);

	// Do not render the Navbar for admins
	if (role === 'admin') return null;

	useEffect(() => {
		const handleStorageChange = () => updateLoginState();
		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, []);

	useEffect(() => {
		console.log('isLoggedIn changed:', isLoggedIn);
	}, [isLoggedIn]);

	useEffect(() => {
		updateLoginState();

		const handleStorageChange = event => {
			if (
				event.key === 'accessToken' ||
				event.key === 'avatar' ||
				event.key === 'fullName' ||
				event.key === 'email'
			) {
				updateLoginState();
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	useEffect(() => {
		const handleClickOutside = event => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
				setIsDropdownOpen(false); // Close dropdown when clicking outside
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.documentElement.classList.toggle('dark', !isDarkMode);
	};

	const handleLogout = () => {
		localStorage.clear();
		setIsLoggedIn(false);
		navigate('/home');
	};
	const handleLinkClick = () => {
		setIsMenuOpen(false);
		setIsDropdownOpen(false); // Ensure dropdown is closed on navigation
	};

	const options = [{ label: fullName, value: 'dashboard' }];

	return (
		<nav
			className='bg-gray-100 font-custom dark:bg-gray-800 text-gray-800 dark:text-white lg:px-5 px-2 border-b border-gray-300 dark:border-gray-700 drop-shadow'
			ref={menuRef}
		>
			<div className='flex gap-x-3 sm:gap-x-5 sm:px-3 xl:gap-x-20 py-2 px-2 relative'>
				<div className='shrink-0 flex'>
					<Link
						to='/home'
						onClick={handleLinkClick}
						className='flex items-center font-extrabold font-ranchers text-xl '
					>
						<div className='flex gap-1'>
							<div className=''>
								<img src={smallIcon} alt='logo' className='h-auto w-6 sm:w-7' />
							</div>
							<div className='hidden leading-[1.1rem] sm:flex flex-col justify-center'>
								<p className='text-cyan-600'>ETHEREAL</p>
								<p>CANVAS</p>
							</div>
						</div>
					</Link>
				</div>

				<div className='relative flex items-center w-full'>
					<span className='absolute inset-y-0 right-51 flex items-center pl-3'>
						<CiSearch className='h-5 w-5 text-gray-500' />
					</span>
					<input
						type='text'
						className='w-full pl-10 pr-4 py-1 border text-sm border-gray-300 rounded-md'
						placeholder='Search...'
					/>
				</div>

				<div className='lg:flex items-center lg:gap-4 xl:gap-10 hidden'>
					{['Home', 'Artists', 'Artworks', 'Marketplace', 'About'].map(link => (
						<Link
							key={link}
							to={`/${link.toLowerCase()}`}
							className='text-sm font-custom font-extrabold dark:text-white text-slate-700 hover:text-blue-500 dark:hover:text-blue-400'
							onClick={handleLinkClick}
						>
							{link}
						</Link>
					))}
				</div>

				{/* Avatar and Dark Mode */}
				<div className='shrink-0 flex items-center'>
					{isLoggedIn && (role === 'artist' || role === 'collector') ? (
						<div className='hidden lg:flex items-center gap-5'>
							{/* AVATAR DROPDOWN */}
							<Dropdown
								label={fullName}
								options={options}
								logout={handleLogout}
								avatar={<Avatar src={avatar} name={name || fullName} alt='User Avatar' />}
								role={role}
								setIsDropdownOpen={setIsDropdownOpen} // Pass the function
							/>

							<button
								onClick={toggleDarkMode}
								className='hidden lg:flex text-xl'
								aria-label='Toggle Dark Mode'
							>
								{isDarkMode ? <TbSunFilled /> : <TbMoonFilled />}
							</button>
						</div>
					) : (
						<div className='flex gap-4'>
							<Link
								to='/login'
								onClick={handleLinkClick}
								className='hidden lg:block px-3 py-1 rounded-lg text-xs bg-blue-500 text-white 
							transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 
							hover:bg-indigo-500 duration-300'
							>
								Login / Register
							</Link>

							<button
								onClick={toggleDarkMode}
								className='hidden lg:flex text-xl'
								aria-label='Toggle Dark Mode'
							>
								{isDarkMode ? <TbSunFilled /> : <TbMoonFilled />}
							</button>
						</div>
					)}

					<button
						className='lg:hidden text-xl'
						onClick={() => {
							setIsMenuOpen(!isMenuOpen);
							setIsDropdownOpen(!isDropdownOpen); // Sync dropdown state
						}}
					>
						{isMenuOpen ? <CgCloseR /> : <TbMenu2 />}
					</button>
				</div>
			</div>

			{/* DROPDOWN */}
			<div
				className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden absolute bg-gray-100 w-full left-0 right-0`}
			>
				{['Home', 'Artists', 'Artworks', 'Marketplace', 'About'].map(link => (
					<div
						key={link}
						className='hover:bg-zinc-200 hover:border-l-4 hover:border-l-orange-400 hover:rounded hover:ml-1 text-sm'
					>
						<Link
							to={`/${link.toLowerCase()}`}
							className='block py-2 pl-3 font-custom font-medium'
							onClick={handleLinkClick}
						>
							{link}
						</Link>
					</div>
				))}

				{isLoggedIn ? (
					<div className='border-t grid grid-cols-3 font-custom px-3 py-5'>
						<div className='flex items-center col-span-2'>
							<Avatar src={avatar} name={fullName} alt='User Avatar' />
							<div className='pl-1'>
								<p className='text-xs text-slate-800'>{fullName}</p>
								<p className='text-[10px] text-slate-500'>{email}</p>
							</div>
						</div>

						<div className='flex items-center justify-end col-span-1'>
							<button
								onClick={() => {
									handleLogout();
									handleLinkClick();
								}}
								className='text-xs px-3 py-1 rounded-md text-white bg-red-600'
							>
								Logout
							</button>
						</div>
					</div>
				) : (
					<div className='border-t flex items-center justify-between px-3 py-5'>
						<Link
							to='/login'
							onClick={handleLinkClick}
							className='px-3 py-1 rounded-lg text-xs bg-blue-500 text-white 
							transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 
							hover:bg-indigo-500 duration-300'
						>
							Login / Register
						</Link>
						<button
							onClick={toggleDarkMode}
							className='flex text-2xl'
							aria-label='Toggle Dark Mode'
						>
							{isDarkMode ? <TbSunFilled /> : <TbMoonFilled />}
						</button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
