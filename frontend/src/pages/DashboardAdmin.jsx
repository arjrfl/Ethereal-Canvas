import IconArtist from '../assets/images/icon-artist.svg';
import IconCollector from '../assets/images/icon-investor.svg';
import IconArtwork from '../assets/images/icon-starry-night.svg';
import IconTransaction from '../assets/images/icon-transaction.svg';

import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
	const location = useLocation();

	return (
		<div className='p-2'>
			{/* SMALL SCREEN */}
			<div className='min-[640px]:hidden mb-10'>
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
							<img src={IconArtist} alt='artist icon' className='h-8 w-8' />
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
							<img src={IconArtwork} alt='artwork icon' className='h-8 w-8' />
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
							<img src={IconCollector} alt='collector icon' className='h-8 w-8' />
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
							<img src={IconTransaction} alt='transaction icon' className='h-8 w-8' />
						</Link>
					</li>
				</ul>
			</div>

			{/* CONTENT */}
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminDashboard;
