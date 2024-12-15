// import IconArtist from '../assets/images/icon-artist.svg';
// import IconCollector from '../assets/images/icon-investor.svg';
// import IconArtwork from '../assets/images/icon-starry-night.svg';
// import IconTransaction from '../assets/images/icon-transaction.svg';

// import { Link, Outlet, useLocation } from 'react-router-dom';

// const AdminDashboard = () => {
// 	const location = useLocation();

// 	return (
// 		<div className='lg:grid lg:grid-cols-4 lg:fixed lg:overflow-y-auto'>
// 			{/* SMALL SCREEN */}
// 			<div className='min-[640px]:hidden'>
// 				<ul className='grid grid-cols-4 py-1 items-center justify-items-center rounded-xl bg-cyan-600'>
// 					<li
// 						className={`m-1 p-1 px-3 ${
// 							location.pathname === '/admin/dashboard' ||
// 							location.pathname === '/admin/dashboard/list-artist'
// 								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
// 								: 'hover:bg-cyan-400 hover:rounded-lg'
// 						} bg-cyan-700 rounded-lg`}
// 					>
// 						<Link to='/admin/dashboard/list-artist'>
// 							<img src={IconArtist} alt='artist icon' className='h-7 w-7' />
// 						</Link>
// 					</li>

// 					<li
// 						className={`m-1 p-1 px-3 ${
// 							location.pathname === '/admin/dashboard/list-artwork'
// 								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
// 								: 'hover:bg-cyan-400 hover:rounded-lg'
// 						} bg-cyan-700 rounded-lg`}
// 					>
// 						<Link to='/admin/dashboard/list-artwork'>
// 							<img src={IconArtwork} alt='artwork icon' className='h-7 w-7' />
// 						</Link>
// 					</li>

// 					<li
// 						className={`m-1 p-1 px-3 ${
// 							location.pathname === '/admin/dashboard/list-collector'
// 								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
// 								: 'hover:bg-cyan-400 hover:rounded-lg'
// 						} bg-cyan-700 rounded-lg`}
// 					>
// 						<Link to='/admin/dashboard/list-collector'>
// 							<img src={IconCollector} alt='collector icon' className='h-7 w-7' />
// 						</Link>
// 					</li>

// 					<li
// 						className={`m-1 p-1 px-3 ${
// 							location.pathname === '/admin/dashboard/list-transaction'
// 								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
// 								: 'hover:bg-cyan-400 hover:rounded-lg'
// 						} bg-cyan-700 rounded-lg`}
// 					>
// 						<Link to='/admin/dashboard/list-transaction'>
// 							<img src={IconTransaction} alt='transaction icon' className='h-7 w-7' />
// 						</Link>
// 					</li>
// 				</ul>
// 			</div>

// 			{/* MEDIUM SCREEN */}
// 			<div className='hidden min-[640px]:block lg:hidden'>
// 				<ul className='flex justify-around items-center rounded-xl bg-cyan-600 py-1'>
// 					<li
// 						className={`m-1 p-1 px-3 ${
// 							location.pathname === '/admin/dashboard' ||
// 							location.pathname === '/admin/dashboard/list-artist'
// 								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
// 								: 'hover:bg-cyan-400 hover:rounded-lg'
// 						} bg-cyan-700 rounded-lg`}
// 					>
// 						<Link to='/admin/dashboard/list-artist' className='flex'>
// 							<p className='pr-1 font-medium text-gray-100'>Artist</p>
// 							<img src={IconArtist} alt='artist icon' className='h-7 w-7' />
// 						</Link>
// 					</li>

// 					<li
// 						className={`m-1 p-1 px-3 ${
// 							location.pathname === '/admin/dashboard/list-artwork'
// 								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
// 								: 'hover:bg-cyan-400 hover:rounded-lg'
// 						} bg-cyan-700 rounded-lg`}
// 					>
// 						<Link to='/admin/dashboard/list-artwork' className='flex'>
// 							<p className='pr-1 font-medium text-gray-100'>Artwork</p>
// 							<img src={IconArtwork} alt='artwork icon' className='h-7 w-7' />
// 						</Link>
// 					</li>

// 					<li
// 						className={`m-1 p-1 px-3 ${
// 							location.pathname === '/admin/dashboard/list-collector'
// 								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
// 								: 'hover:bg-cyan-400 hover:rounded-lg'
// 						} bg-cyan-700 rounded-lg`}
// 					>
// 						<Link to='/admin/dashboard/list-collector' className='flex'>
// 							<p className='pr-1 font-medium text-gray-100'>Collector</p>
// 							<img src={IconCollector} alt='collector icon' className='h-7 w-7' />
// 						</Link>
// 					</li>

// 					<li
// 						className={`m-1 p-1 px-3 ${
// 							location.pathname === '/admin/dashboard/list-transaction'
// 								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
// 								: 'hover:bg-cyan-400 hover:rounded-lg'
// 						} bg-cyan-700 rounded-lg`}
// 					>
// 						<Link to='/admin/dashboard/list-transaction' className='flex'>
// 							<p className='pr-1 font-medium text-gray-100'>Transaction</p>
// 							<img src={IconTransaction} alt='transaction icon' className='h-7 w-7' />
// 						</Link>
// 					</li>
// 				</ul>
// 			</div>

// 			{/* LARGE SCREEN */}
// 			{/* <ul className='hidden lg:flex lg:fixed lg:left-2 lg:top-2 lg:bottom-2 lg:h-auto lg:w-[10rem] xl:w-52 lg:flex-col rounded-xl bg-cyan-600 p-2'>
// 				<li className='mb-10'>
// 					<p className='font-semibold font-custom text-sm text-center text-white'>ADMIN</p>
// 				</li>

// 				<li
// 					className={`m-1 p-2 px-3 ${
// 						location.pathname === '/admin/dashboard' ||
// 						location.pathname === '/admin/dashboard/list-artist'
// 							? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
// 							: 'hover:bg-cyan-400 hover:rounded-lg'
// 					} bg-cyan-700 rounded-lg`}
// 				>
// 					<Link to='/admin/dashboard/list-artist' className='flex items-center justify-start gap-2'>
// 						<img src={IconArtist} alt='artist icon' className='h-6 w-6' />
// 						<p className='text-sm font-medium text-gray-100'>Artist</p>
// 					</Link>
// 				</li>

// 				<li
// 					className={`m-1 p-2 px-3 ${
// 						location.pathname === '/admin/dashboard/list-artwork'
// 							? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
// 							: 'hover:bg-cyan-400 hover:rounded-lg'
// 					} bg-cyan-700 rounded-lg`}
// 				>
// 					<Link
// 						to='/admin/dashboard/list-artwork'
// 						className='flex items-center justify-start gap-2'
// 					>
// 						<img src={IconArtwork} alt='artwork icon' className='h-6 w-6' />
// 						<p className='text-sm font-medium text-gray-100'>Artwork</p>
// 					</Link>
// 				</li>

// 				<li
// 					className={`m-1 p-2 px-3 ${
// 						location.pathname === '/admin/dashboard/list-collector'
// 							? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
// 							: 'hover:bg-cyan-400 hover:rounded-lg'
// 					} bg-cyan-700 rounded-lg`}
// 				>
// 					<Link
// 						to='/admin/dashboard/list-collector'
// 						className='flex items-center justify-start gap-2'
// 					>
// 						<img src={IconCollector} alt='collector icon' className='h-6 w-6' />
// 						<p className='text-sm font-medium text-gray-100'>Collector</p>
// 					</Link>
// 				</li>

// 				<li
// 					className={`m-1 p-2 px-3 ${
// 						location.pathname === '/admin/dashboard/list-transaction'
// 							? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
// 							: 'hover:bg-cyan-400 hover:rounded-lg'
// 					} bg-cyan-700 rounded-lg`}
// 				>
// 					<Link
// 						to='/admin/dashboard/list-transaction'
// 						className='flex items-center justify-start gap-2'
// 					>
// 						<img src={IconTransaction} alt='transaction icon' className='h-6 w-6' />
// 						<p className='text-sm font-medium text-gray-100'>Transaction</p>
// 					</Link>
// 				</li>

// 				<li className='mt-auto'>team</li>
// 			</ul> */}

// 			{/* CONTENT */}
// 			{/* <div className='right-onl-large-screen lg:ml-[11rem] lg:mr-4 xl:ml-[14rem] lg:h-full lg:flex-1'>
// 				<Outlet />
// 				</div> */}

// 			<div className='left-on-large-screen lg:col-span-1'>
// 				<ul>
// 					<li>dashboard</li>
// 					<li>artist</li>
// 					<li>artwork</li>
// 					<li>collector</li>
// 					<li>transaction</li>
// 				</ul>
// 			</div>

// 			<div className='right-on-large-screen lg:col-span-3 overflow-y-auto'>
// 				<Outlet />
// 			</div>
// 		</div>
// 	);
// };

// export default AdminDashboard;

import { useEffect, useState } from 'react';
import IconArtist from '../assets/images/icon-artist.svg';
import IconCollector from '../assets/images/icon-investor.svg';
import IconArtwork from '../assets/images/icon-starry-night.svg';
import IconTransaction from '../assets/images/icon-transaction.svg';

import useFetchData from '../hooks/useFetchDataPrivateRoute';

import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const { responseData: admins, loading, error } = useFetchData('/admin/admins', null);
	const location = useLocation();

	const avatarLetter = name ? name.charAt(0).toUpperCase() : '?';

	const getInitials = name => {
		if (!name) return '';
		const nameParts = name.split(' ');
		const initials = nameParts.map(part => part[0]).join('');
		return initials.toUpperCase().slice(0, 2);
	};

	useEffect(() => {
		const storedName = localStorage.getItem('fullName');
		const storedEmail = localStorage.getItem('email');
		setName(storedName || '');
		setEmail(storedEmail || '');
	}, []);

	// Avoid rendering before data is loaded
	if (!admins || admins.length === 0) {
		return <p>No admins found.</p>;
	}

	return (
		<div className='lg:grid lg:grid-cols-4 h-screen'>
			{/* SIDEBAR SMALL SCREEN */}
			<div className='min-[640px]:hidden'>
				<ul className='grid grid-cols-4 py-1 items-center justify-items-center rounded-xl bg-cyan-600'>
					{/* Sidebar Links */}
					{[
						{ path: '/admin/dashboard/list-artist', icon: IconArtist },
						{ path: '/admin/dashboard/list-artwork', icon: IconArtwork },
						{ path: '/admin/dashboard/list-collector', icon: IconCollector },
						{ path: '/admin/dashboard/list-transaction', icon: IconTransaction },
					].map((item, index) => (
						<li
							key={index}
							className={`m-1 p-1 px-3 ${
								location.pathname === item.path
									? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
									: 'hover:bg-cyan-400 hover:rounded-lg'
							}`}
						>
							<Link to={item.path}>
								<img src={item.icon} alt={`${item.path} icon`} className='h-7 w-7' />
							</Link>
						</li>
					))}
				</ul>
			</div>

			{/* SIDEBAR MEDIUM SCREEN */}
			<div className='hidden min-[640px]:block lg:hidden'>
				<ul className='flex justify-around items-center rounded-xl bg-cyan-600 py-1'>
					{/* Sidebar Links */}
					{[
						{ path: '/admin/dashboard/list-artist', label: 'Artist', icon: IconArtist },
						{ path: '/admin/dashboard/list-artwork', label: 'Artwork', icon: IconArtwork },
						{ path: '/admin/dashboard/list-collector', label: 'Collector', icon: IconCollector },
						{
							path: '/admin/dashboard/list-transaction',
							label: 'Transaction',
							icon: IconTransaction,
						},
					].map((item, index) => (
						<li
							key={index}
							className={`m-1 p-1 px-3 ${
								location.pathname === item.path
									? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
									: 'hover:bg-cyan-400 hover:rounded-lg'
							}`}
						>
							<Link to={item.path} className='flex'>
								<p className='pr-1 font-medium text-gray-100'>{item.label}</p>
								<img src={item.icon} alt={`${item.label} icon`} className='h-7 w-7' />
							</Link>
						</li>
					))}
				</ul>
			</div>

			{/* SIDEBAR LARGE SCREEN */}
			<div className='hidden lg:flex space-y-3 lg:flex-col lg:col-span-1 lg:h-screen p-3'>
				<ul className='p-2 py-5 space-y-2 bg-cyan-500 rounded-xl'>
					<li className='mb-10'>
						<p className='font-semibold font-custom text-lg text-center text-cyan-900'>
							ADMIN DASHBOARD
						</p>
					</li>
					{[
						{ path: '/admin/dashboard/list-artist', label: 'Artist', icon: IconArtist },
						{ path: '/admin/dashboard/list-artwork', label: 'Artwork', icon: IconArtwork },
						{ path: '/admin/dashboard/list-collector', label: 'Collector', icon: IconCollector },
						{
							path: '/admin/dashboard/list-transaction',
							label: 'Transaction',
							icon: IconTransaction,
						},
					].map((item, index) => (
						<li
							key={index}
							className={`m-1 px-3 ${
								location.pathname === item.path
									? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
									: 'hover:bg-cyan-400 hover:rounded-lg'
							} bg-cyan-600 rounded-lg`}
						>
							<Link to={item.path} className='flex items-center justify-start gap-2 p-2'>
								<img src={item.icon} alt={`${item.label} icon`} className='h-6 w-6' />
								<p className='text-sm font-bold text-gray-100'>{item.label}</p>
							</Link>
						</li>
					))}
				</ul>

				{/* Admins List */}
				<div className='bg-cyan-500 flex-1 rounded-xl px-3 font-custom py-3 text-gray-50 flex flex-col'>
					<h1 className='text-sm pb-3'>Your teams</h1>
					<ul className='space-y-3'>
						{admins.map(admin => (
							<li key={admin._id} className='flex gap-3 items-center'>
								<div className='w-8 h-8 rounded-[10px] flex items-center justify-center text-xs font-semibold bg-cyan-400'>
									{getInitials(admin.fullName)}
								</div>
								<p className='font-semibold text-sm'>{admin.fullName}</p>
							</li>
						))}
					</ul>
					<div className='mt-auto flex gap-2'>
						<div className='w-10 h-10 rounded-lg bg-blue-500 text-white font-bold text-md flex items-center justify-center'>
							{avatarLetter}
						</div>
						<div>
							<p className='font-semibold'>{name}</p>
							<p className='text-xs'>{email}</p>
						</div>
					</div>
				</div>
			</div>

			{/* CONTENT */}
			<div className='lg:col-span-3 lg:py-3 lg:pr-3 lg:overflow-y-auto h-screen scrollbar-none'>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminDashboard;
