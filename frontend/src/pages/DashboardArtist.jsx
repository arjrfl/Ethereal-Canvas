import { TbEdit, TbUpload, TbImageInPicture, TbClipboardList } from 'react-icons/tb';
import { Link, Outlet, useLocation } from 'react-router-dom';

import useStoredAvatar from '../hooks/useStoredAvatar';

const ArtistDashboard = () => {
	const { avatar, name, email } = useStoredAvatar();
	const location = useLocation();

	const getInitials = name => {
		if (!name) return '';
		const nameParts = name.split(' ');
		const initials = nameParts.map(part => part[0]?.toUpperCase() || '').join('');
		return initials;
	};

	const initials = getInitials(name);

	return (
		<div className='container max-w-full xl:max-w-[90rem] mx-auto px-4 py-4 md:px-5 lg:py-9 lg:grid lg:grid-cols-10 lg:gap-x-10 font-custom '>
			{/* SMALL SCREEN */}
			<div className='min-[640px]:hidden mb-10'>
				<ul className='grid grid-cols-4 py-1 items-center justify-items-center rounded-xl bg-cyan-600'>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard' ||
							location.pathname === '/artist/dashboard/edit-profile'
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
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
								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
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
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
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
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
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
				<ul className='grid grid-cols-4 py-2 items-center justify-items-center rounded-xl bg-cyan-600'>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard' ||
							location.pathname === '/artist/dashboard/edit-profile'
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
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
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
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
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
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
								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link to='/artist/dashboard/transaction' className='flex items-center gap-2 text-white'>
							<span>Transaction</span> <TbClipboardList className='text-md' />
						</Link>
					</li>
				</ul>
			</div>

			{/* LARGE SCREEN */}
			<div className='hidden lg:block lg:col-span-2 text-base'>
				<div className='flex gap-x-4 items-center mb-5 p-3 bg-cyan-600 rounded-xl'>
					<div className='h-12 w-12 rounded-full'>
						{avatar ? (
							<img src={avatar} alt='Avatar' className='w-full h-full object-cover rounded-lg' />
						) : (
							// If avatar is not available, show initials
							<div className='w-full h-full flex items-center justify-center bg-gray-400 rounded-full text-white'>
								{initials || 'NA'}
							</div>
						)}
					</div>
					<div className='text-white'>
						<p>{name}</p>
						<p className='text-xs'>{email}</p>
					</div>
				</div>

				<ul className='bg-cyan-600 rounded-xl py-4 px-1'>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard' ||
							location.pathname === '/artist/dashboard/edit-profile'
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg '
						}`}
					>
						<Link
							to='/artist/dashboard/edit-profile'
							className='flex items-center gap-2 text-white'
						>
							<TbEdit className='text-xl' />
							<span>Edit Profile</span>
						</Link>
					</li>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard/upload-artwork'
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link
							to='/artist/dashboard/upload-artwork'
							className='flex items-center gap-2 text-white'
						>
							<TbUpload className='text-xl' />
							<span>Upload</span>
						</Link>
					</li>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard/artworks'
								? 'bg-cyan-700 rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link to='/artist/dashboard/artworks' className='flex items-center gap-2 text-white'>
							<TbImageInPicture className='text-xl' />
							<span>Artworks</span>
						</Link>
					</li>
					<li
						className={`m-1 p-1 px-3 ${
							location.pathname === '/artist/dashboard/transaction'
								? 'bg-cyan-700  rounded-lg border-l-4 border-b-4'
								: 'hover:bg-cyan-400 hover:rounded-lg'
						}`}
					>
						<Link to='/artist/dashboard/transaction' className='flex items-center gap-2 text-white'>
							<TbClipboardList className='text-xl' />
							<span>Transaction</span>
						</Link>
					</li>
				</ul>
			</div>

			{/* Content */}
			<div className='lg:col-span-8 '>
				<Outlet /> {/* Render nested routes here */}
			</div>
		</div>
	);
};

export default ArtistDashboard;
