import { TbEdit, TbUpload, TbImageInPicture, TbClipboardList } from 'react-icons/tb';
import { Link, Outlet, useLocation } from 'react-router-dom';

const ArtistDashboard = () => {
	// Get the current location
	const location = useLocation();

	return (
		<div className='container max-w-full mx-auto px-3 py-4 md:px-10 lg:grid lg:grid-cols-12 font-custom'>
			{/* SMALL SCREEN */}
			<div className='min-[640px]:hidden mb-10'>
				<ul className='grid grid-cols-4 items-center justify-items-center rounded-xl bg-cyan-600'>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard' ||
							location.pathname === '/artist/dashboard/edit-profile'
								? 'bg-cyan-700 rounded-lg'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link to='/artist/dashboard/edit-profile'>
							<TbEdit className='text-2xl font-light text-white' />
						</Link>
					</li>

					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard/upload-artwork'
								? 'bg-cyan-700  rounded-lg'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link to='/artist/dashboard/upload-artwork'>
							<TbUpload className='text-2xl text-white' />
						</Link>
					</li>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard/artworks'
								? 'bg-cyan-700 rounded-lg'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link to='/artist/dashboard/artworks'>
							<TbImageInPicture className='text-2xl text-white' />
						</Link>
					</li>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard/transaction'
								? 'bg-cyan-700 rounded-lg'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link to='/artist/dashboard/transaction'>
							<TbClipboardList className='text-2xl text-white' />
						</Link>
					</li>
				</ul>
			</div>

			{/* MEDIUM SCREEN */}
			<div className='hidden min-[640px]:block lg:hidden mb-10'>
				<ul className='grid grid-cols-4 items-center justify-items-center rounded-xl bg-cyan-600'>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard/edit-profile'
								? 'bg-cyan-700 rounded-lg'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link
							to='/artist/dashboard/edit-profile'
							className='flex items-center gap-2 text-white'
						>
							<span className=''>Edit Profile</span> <TbEdit className='text-md' />
						</Link>
					</li>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard/upload-artwork'
								? 'bg-cyan-700 text-white rounded-lg'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link
							to='/artist/dashboard/upload-artwork'
							className='flex items-center gap-2 text-white'
						>
							<span>Upload</span> <TbUpload className='text-md' />
						</Link>
					</li>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard/artworks'
								? 'bg-cyan-700 text-white rounded-lg'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link to='/artist/dashboard/artworks' className='flex items-center gap-2 text-white'>
							<span>Artworks</span> <TbImageInPicture className='text-md' />
						</Link>
					</li>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard/transaction'
								? 'bg-cyan-700 text-white rounded-lg'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link to='/artist/dashboard/transaction' className='flex items-center gap-2 text-white'>
							<span>Transaction</span> <TbClipboardList className='text-md' />
						</Link>
					</li>
				</ul>
			</div>

			{/* Content */}
			<div className='md:col-span-9'>
				<Outlet /> {/* Render nested routes here */}
			</div>
		</div>
	);
};

export default ArtistDashboard;
