import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/EC-logo.png';
import { TbMoonFilled, TbSunFilled, TbMenu2, TbSearch } from 'react-icons/tb';
import { CgCloseR } from 'react-icons/cg';
import Dropdown from './Dropdown';
import Avatar from './Avatar';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [fullName, setFullName] = useState('');
	const navigate = useNavigate();
	const menuRef = useRef(null);

	const updateLoginState = () => {
		const token = localStorage.getItem('accessToken');
		const storedFullName = localStorage.getItem('fullName');
		setIsLoggedIn(!!token); // if token is null/empty = false, else = true
		setFullName(storedFullName || '');
	};

	useEffect(() => {
		updateLoginState();
		window.addEventListener('storage', updateLoginState);
		return () => {
			window.removeEventListener('storage', updateLoginState);
		};
	}, []);

	useEffect(() => {
		const handleClickOutside = event => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
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
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('fullName');
		setIsLoggedIn(false);
		setFullName('');
		navigate('/home');
	};

	const handleLinkClick = () => setIsMenuOpen(false);

	const options = [{ label: fullName, value: 'dashboard' }];

	return (
		<nav
			className='bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white lg:px-5 px-5 border-b border-gray-300 dark:border-gray-700 drop-shadow'
			ref={menuRef}
		>
			{/* UPPER NAV */}
			<div className='container max-w-7xl mx-auto py-3 flex justify-between lg:border-b lg:border-gray-300 lg:dark:border-gray-700'>
				<Link to='/home' onClick={handleLinkClick}>
					<img className='h-14' src={Logo} alt='Ethereal Canvas Logo' />
				</Link>

				<div className='hidden grow px-10 md:flex items-center justify-center'>
					<div className='relative w-full lg:w-3/4'>
						<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
							<TbSearch className='h-5 w-5 text-gray-500' />
						</span>
						<input
							type='text'
							className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md'
							placeholder='Search...'
						/>
					</div>
				</div>
				<div className='shrink-0 flex items-center'>
					{isLoggedIn ? (
						<div className='hidden lg:flex'>
							<Dropdown
								label={fullName}
								options={options}
								logout={handleLogout}
								avatar={<Avatar src={null} name={fullName} alt='User Avatar' />}
							/>
						</div>
					) : (
						<Link to='/login' className='hidden lg:flex px-3 font-custom'>
							Login / Register
						</Link>
					)}
					<button
						onClick={toggleDarkMode}
						className='hidden lg:flex text-3xl pl-3 py-3'
						aria-label='Toggle Dark Mode'
					>
						{isDarkMode ? <TbSunFilled /> : <TbMoonFilled />}
					</button>
					<button
						className='lg:hidden text-3xl pl-3 py-3'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <CgCloseR /> : <TbMenu2 />}
					</button>
				</div>
			</div>

			{/* LOWER NAV */}
			<div
				className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:justify-evenly py-3 container max-w-7xl mx-auto`}
			>
				<div className='block md:hidden px-5'>
					<div className='relative w-full'>
						<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
							<TbSearch className='h-5 w-5 text-gray-500' />
						</span>
						<input
							type='text'
							className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md'
							placeholder='Search...'
						/>
					</div>
				</div>

				{['Home', 'Artists', 'Artworks', 'Marketplace', 'About'].map(link => (
					<Link
						key={link}
						to={`/${link.toLowerCase()}`}
						className='block lg:inline-block mt-2 lg:mt-0 text-lg font-medium hover:text-blue-500 dark:hover:text-blue-400'
						onClick={handleLinkClick}
					>
						{link}
					</Link>
				))}

				{isLoggedIn ? (
					<div className='block lg:hidden mt-2 lg:mt-0 text-lg font-medium'>
						<div className='mt-4 lg:mt-0'>
							<span>User: {fullName}</span>
						</div>
						<div className='mt-2 lg:mt-0'>
							<button
								onClick={() => {
									handleLogout();
									handleLinkClick();
								}}
								className='text-red-500 hover:text-red-700'
							>
								Logout
							</button>
						</div>
					</div>
				) : (
					<Link
						to='/login'
						className='block lg:hidden mt-4 lg:mt-0 text-lg font-medium hover:text-blue-500 dark:hover:text-blue-400'
						onClick={handleLinkClick}
					>
						Login / Register
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
