import IconArtist from '../assets/images/icon-artist.svg';
import IconCollector from '../assets/images/icon-investor.svg';
import IconArtwork from '../assets/images/icon-starry-night.svg';
import IconTransaction from '../assets/images/icon-transaction.svg';

import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
	const location = useLocation();

	return (
		<div className='p-2 lg:p-2 lg:flex'>
			{/* SMALL SCREEN */}
			<div className='min-[640px]:hidden'>
				<ul className='grid grid-cols-4 py-1 items-center justify-items-center rounded-xl bg-cyan-600'>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/admin/dashboard' ||
							location.pathname === '/admin/dashboard/list-artist'
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						} bg-cyan-700 rounded-lg`}
					>
						<Link to='/admin/dashboard/list-artist'>
							<img src={IconArtist} alt='artist icon' className='h-7 w-7' />
						</Link>
					</li>

					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/admin/dashboard/list-artwork'
								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						} bg-cyan-700 rounded-lg`}
					>
						<Link to='/admin/dashboard/list-artwork'>
							<img src={IconArtwork} alt='artwork icon' className='h-7 w-7' />
						</Link>
					</li>

					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/admin/dashboard/list-collector'
								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						} bg-cyan-700 rounded-lg`}
					>
						<Link to='/admin/dashboard/list-collector'>
							<img src={IconCollector} alt='collector icon' className='h-7 w-7' />
						</Link>
					</li>

					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/admin/dashboard/list-transaction'
								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						} bg-cyan-700 rounded-lg`}
					>
						<Link to='/admin/dashboard/list-transaction'>
							<img src={IconTransaction} alt='transaction icon' className='h-7 w-7' />
						</Link>
					</li>
				</ul>
			</div>

			{/* MEDIUM SCREEN */}
			<div className='hidden min-[640px]:block lg:hidden'>
				<ul className='flex justify-around items-center rounded-xl bg-cyan-600 py-1'>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/admin/dashboard' ||
							location.pathname === '/admin/dashboard/list-artist'
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						} bg-cyan-700 rounded-lg`}
					>
						<Link to='/admin/dashboard/list-artist' className='flex'>
							<p className='pr-1 font-medium text-gray-100'>Artist</p>
							<img src={IconArtist} alt='artist icon' className='h-7 w-7' />
						</Link>
					</li>

					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/admin/dashboard/list-artwork'
								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						} bg-cyan-700 rounded-lg`}
					>
						<Link to='/admin/dashboard/list-artwork' className='flex'>
							<p className='pr-1 font-medium text-gray-100'>Artwork</p>
							<img src={IconArtwork} alt='artwork icon' className='h-7 w-7' />
						</Link>
					</li>

					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/admin/dashboard/list-collector'
								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						} bg-cyan-700 rounded-lg`}
					>
						<Link to='/admin/dashboard/list-collector' className='flex'>
							<p className='pr-1 font-medium text-gray-100'>Collector</p>
							<img src={IconCollector} alt='collector icon' className='h-7 w-7' />
						</Link>
					</li>

					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/admin/dashboard/list-transaction'
								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						} bg-cyan-700 rounded-lg`}
					>
						<Link to='/admin/dashboard/list-transaction' className='flex'>
							<p className='pr-1 font-medium text-gray-100'>Transaction</p>
							<img src={IconTransaction} alt='transaction icon' className='h-7 w-7' />
						</Link>
					</li>
				</ul>
			</div>

			{/* LARGE SCREEN */}
			<ul className='hidden lg:flex lg:fixed lg:left-2 lg:top-2 lg:bottom-2 lg:h-auto lg:w-[10rem] xl:w-52 lg:flex-col rounded-xl bg-cyan-600 p-2'>
				<li className='mb-10'>
					<p className='font-semibold font-custom text-sm text-center text-white'>ADMIN</p>
				</li>

				<li
					className={`m-1 p-2 px-3 ${
						location.pathname === '/admin/dashboard' ||
						location.pathname === '/admin/dashboard/list-artist'
							? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
							: 'hover:bg-cyan-400 hover:rounded-lg'
					} bg-cyan-700 rounded-lg`}
				>
					<Link to='/admin/dashboard/list-artist' className='flex items-center justify-start gap-2'>
						<img src={IconArtist} alt='artist icon' className='h-6 w-6' />
						<p className='text-sm font-medium text-gray-100'>Artist</p>
					</Link>
				</li>

				<li
					className={`m-1 p-2 px-3 ${
						location.pathname === '/admin/dashboard/list-artwork'
							? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
							: 'hover:bg-cyan-400 hover:rounded-lg'
					} bg-cyan-700 rounded-lg`}
				>
					<Link
						to='/admin/dashboard/list-artwork'
						className='flex items-center justify-start gap-2'
					>
						<img src={IconArtwork} alt='artwork icon' className='h-6 w-6' />
						<p className='text-sm font-medium text-gray-100'>Artwork</p>
					</Link>
				</li>

				<li
					className={`m-1 p-2 px-3 ${
						location.pathname === '/admin/dashboard/list-collector'
							? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
							: 'hover:bg-cyan-400 hover:rounded-lg'
					} bg-cyan-700 rounded-lg`}
				>
					<Link
						to='/admin/dashboard/list-collector'
						className='flex items-center justify-start gap-2'
					>
						<img src={IconCollector} alt='collector icon' className='h-6 w-6' />
						<p className='text-sm font-medium text-gray-100'>Collector</p>
					</Link>
				</li>

				<li
					className={`m-1 p-2 px-3 ${
						location.pathname === '/admin/dashboard/list-transaction'
							? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
							: 'hover:bg-cyan-400 hover:rounded-lg'
					} bg-cyan-700 rounded-lg`}
				>
					<Link
						to='/admin/dashboard/list-transaction'
						className='flex items-center justify-start gap-2'
					>
						<img src={IconTransaction} alt='transaction icon' className='h-6 w-6' />
						<p className='text-sm font-medium text-gray-100'>Transaction</p>
					</Link>
				</li>

				<li className='mt-auto'>team</li>
			</ul>

			{/* CONTENT */}
			<div className='lg:ml-[11rem] lg:mr-4 xl:ml-[14rem] lg:h-full lg:flex-1'>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminDashboard;
