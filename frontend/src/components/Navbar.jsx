import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import Logo from '../assets/images/EC-logo.png';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [collectorInitials, setCollectorInitials] = useState('');

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		const fullName = localStorage.getItem('fullName');
		if (token && fullName) {
			setIsLoggedIn(true);
			setCollectorInitials(getInitials(fullName));
		}
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
		setCollectorInitials('');
	};

	const getInitials = fullName => {
		const names = fullName.split(' ');
		const initials = names.map(name => name[0]).join('');
		return initials.toUpperCase();
	};

	return (
		<nav className={`bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white`}>
			{/* Upper Section */}
			<div className='container max-w-6xl mx-auto py-7 px-4 sm:px-10 lg:px-10 flex justify-between border-b border-gray-300 dark:border-gray-700'>
				{/* Logo */}
				<Link to='/'>
					<img className='w-52 h-auto' src={Logo} alt='Ethereal Canvas Logo' />
				</Link>

				{/* Search Bar */}
				<div className='hidden lg:flex flex-grow mx-4'>
					<input
						type='text'
						placeholder='Search...'
						className='w-full mx-10 px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none'
					/>
				</div>

				{/* Account Button and Dark Mode Toggle */}
				<div className='flex items-center space-x-4'>
					{isLoggedIn ? (
						<div className='relative inline-flex items-center space-x-2'>
							<div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
								<span className='font-medium text-gray-600 dark:text-gray-300'>
									{collectorInitials}
								</span>
							</div>
							<button
								onClick={handleLogout}
								className='text-sm bg-red-500 text-white px-3 py-1 rounded'
							>
								Logout
							</button>
						</div>
					) : (
						<Link to='/login' className='text-xl bg-blue-500 text-white px-4 py-2 rounded'>
							Login
						</Link>
					)}

					{/* Dark Mode Toggle Button */}
					<button
						onClick={toggleDarkMode}
						className='text-2xl p-2 rounded-full focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-700'
						aria-label='Toggle Dark Mode'
					>
						{isDarkMode ? <FaSun /> : <FaMoon />}
					</button>

					{/* Mobile Menu Toggle */}
					<button className='lg:hidden text-xl' onClick={() => setIsMenuOpen(!isMenuOpen)}>
						☰
					</button>
				</div>
			</div>

			{/* Bottom Section */}
			<div
				className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:justify-evenly py-3 container max-w-6xl mx-auto`}
			>
				<Link
					to='/'
					className='block lg:inline-block mt-2 lg:mt-0 text-lg font-medium hover:text-blue-500 dark:hover:text-blue-400'
				>
					Home
				</Link>
				<Link
					to='/artists'
					className='block lg:inline-block mt-2 lg:mt-0 text-lg font-medium hover:text-blue-500 dark:hover:text-blue-400'
				>
					Artists
				</Link>
				<Link
					to='/artworks'
					className='block lg:inline-block mt-2 lg:mt-0 text-lg font-medium hover:text-blue-500 dark:hover:text-blue-400'
				>
					Artworks
				</Link>
				<Link
					to='/marketplace'
					className='block lg:inline-block mt-2 lg:mt-0 text-lg font-medium hover:text-blue-500 dark:hover:text-blue-400'
				>
					Marketplace
				</Link>
				<Link
					to='/about'
					className='block lg:inline-block mt-2 lg:mt-0 text-lg font-medium hover:text-blue-500 dark:hover:text-blue-400'
				>
					About
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
