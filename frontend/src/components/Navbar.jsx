import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbMoonFilled, TbSunFilled, TbMenu2 } from 'react-icons/tb';
import { CgCloseR } from 'react-icons/cg';
import Dropdown from './Dropdown';
import Avatar from './Avatar';
import { CiSearch } from 'react-icons/ci';

import LogoMobileSize from '../assets/images/EC-logo-mobile-size.svg';
import LogoMediumUpSize from '../assets/images/EC-logo-md-up-screen.svg';

import useStoredAvatar from '../hooks/useStoredAvatar';

const Navbar = () => {
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

		setIsLoggedIn(!!userToken);
		setFullName(userFullName || '');
		setRole(userRole || '');
		setEmail(userEmail || '');
	};

	useEffect(() => {
		updateLoginState();
	}, []);

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
	const handleLinkClick = () => setIsMenuOpen(false);

	const options = [{ label: fullName, value: 'dashboard' }];

	return (
		<nav
			className='bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white lg:px-5 px-2 border-b border-gray-300 dark:border-gray-700 drop-shadow'
			ref={menuRef}
		>
			{/* UPPER NAV */}
			<div className='container max-w-7xl mx-auto py-3 flex justify-between lg:border-b lg:border-gray-300 lg:dark:border-gray-700'>
				<Link to='/home' onClick={handleLinkClick} className='sm:hidden'>
					<img src={LogoMobileSize} className='h-auto w-9' alt='Ethereal Canvas Logo' />
				</Link>

				<Link to='/home' onClick={handleLinkClick} className='hidden sm:flex items-center '>
					<img className='h-auto w-36' src={LogoMediumUpSize} alt='Ethereal Canvas Logo' />
				</Link>

				<div className='grow px-3 lg:px-10 flex items-center justify-center'>
					<div className='relative w-full lg:w-3/4'>
						<span className='absolute inset-y-0 right-51 flex items-center pl-3'>
							<CiSearch className='h-5 w-5 text-gray-500' />
						</span>
						<input
							type='text'
							className='w-full pl-10 pr-4 py-1 border text-sm md:text-base border-gray-300 rounded-md'
							placeholder='Search...'
						/>
					</div>
				</div>

				{/* Avatar and Dark Mode */}
				<div className='shrink-0 flex items-center'>
					{isLoggedIn ? (
						<div className='hidden lg:flex'>
							<Dropdown
								label={fullName}
								options={options}
								logout={handleLogout}
								avatar={<Avatar src={avatar} name={name || fullName} alt='User Avatar' />}
								role={role}
							/>
						</div>
					) : (
						<Link
							to='/login'
							className='hidden lg:flex px-3 font-custom hover:underline hover:decoration-blue-600'
						>
							Login / Register
						</Link>
					)}
					<button
						onClick={toggleDarkMode}
						className='hidden lg:flex text-2xl pl-3 py-3'
						aria-label='Toggle Dark Mode'
					>
						{isDarkMode ? <TbSunFilled /> : <TbMoonFilled />}
					</button>
					<button className='lg:hidden text-2xl' onClick={() => setIsMenuOpen(!isMenuOpen)}>
						{isMenuOpen ? <CgCloseR /> : <TbMenu2 />}
					</button>
				</div>
			</div>

			{/* LOWER NAV DESKTOP */}
			<div className='hidden lg:flex lg:justify-evenly container max-w-7xl mx-auto'>
				{['Home', 'Artists', 'Artworks', 'Marketplace', 'About'].map(link => (
					<Link
						key={link}
						to={`/${link.toLowerCase()}`}
						className='text-base font-custom font-medium py-3 hover:text-blue-500 dark:hover:text-blue-400'
						onClick={handleLinkClick}
					>
						{link}
					</Link>
				))}
			</div>

			{/* LOWER NAV MOBILE */}
			<div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden `}>
				{['Home', 'Artists', 'Artworks', 'Marketplace', 'About'].map(link => (
					<div
						key={link}
						className='hover:bg-zinc-200 hover:border-l-4 hover:border-l-orange-400 hover:rounded my-1 text-sm md:text-base'
					>
						<Link
							to={`/${link.toLowerCase()}`}
							className='block my-1 py-2 pl-3 font-custom font-medium'
							onClick={handleLinkClick}
						>
							{link}
						</Link>
					</div>
				))}

				{isLoggedIn ? (
					<div className='border-t-2 grid grid-cols-2 grid-rows-3 my-3 pt-3 font-custom text-sm md:text-base'>
						<div className='flex items-center'>
							<Avatar src={avatar} name={fullName} alt='User Avatar' />
							<div className='pl-3'>
								<p className='text-base text-slate-800'>{fullName}</p>
								<p className='text-xs text-slate-500'>{email}</p>
							</div>
						</div>

						<div className='flex items-center justify-end'>
							<button
								className='text-blue-600 font-medium pr-2 hover:text-blue-800'
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					</div>
				) : (
					<Link
						to='/login'
						className='flex font-custom text-base text-center px-3 pt-3 hover:underline hover:decoration-blue-600 hover:rounded'
						onClick={handleLinkClick}
					>
						Login / Register
					</Link>
				)}

				<button
					onClick={toggleDarkMode}
					className='flex text-3xl py-3 px-5'
					aria-label='Toggle Dark Mode'
				>
					{isDarkMode ? <TbSunFilled /> : <TbMoonFilled />}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
