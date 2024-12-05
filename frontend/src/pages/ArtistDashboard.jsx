import { TbEdit, TbUpload, TbImageInPicture, TbClipboardList } from 'react-icons/tb';
import { Link, Outlet } from 'react-router-dom';

const ArtistDashboard = () => {
	return (
		<div className='container max-w-full mx-auto px-3	py-4 md:px-10 lg:grid lg:grid-cols-12'>
			{/* SMALL SCREEN */}
			<div className='min-[640px]:hidden mb-10'>
				<ul className='grid grid-cols-4 items-center justify-items-center rounded-xl bg-cyan-500'>
					<li className='m-2 hover:bg-cyan-400 hover:rounded-xl'>
						<Link to='/artist/dashboard/edit-profile'>
							<TbEdit className='text-2xl font-light text-white' />
						</Link>
					</li>
					<li className='m-2 hover:bg-cyan-400 hover:rounded-xl'>
						<Link to='/artist/dashboard/upload-artwork'>
							<TbUpload className='text-2xl text-white' />
						</Link>
					</li>
					<li className='m-2 hover:bg-cyan-400 hover:rounded-xl'>
						<Link to='/artist/dashboard/artworks'>
							<TbImageInPicture className='text-2xl text-white' />
						</Link>
					</li>
					<li className='m-2 hover:bg-cyan-400 hover:rounded-xl'>
						<Link to='/artist/dashboard/transaction'>
							<TbClipboardList className='text-2xl text-white' />
						</Link>
					</li>
				</ul>
			</div>

			{/* MEDIUM SCREEN */}
			<div className='hidden min-[640px]:block lg:hidden'>
				<ul className='grid grid-cols-4 items-center justify-items-center rounded-xl bg-cyan-500'>
					<li>Edit Profile</li>
					<li>Upload Artwork</li>
					<li>Artworks</li>
					<li>Transaction</li>
				</ul>
			</div>

			{/* LARGE SCREEN */}
			<div className='hidden lg:block'>
				<ul className='bg-cyan-500'>
					<li>Edit Profile</li>
					<li>Upload Artwork</li>
					<li>Artworks</li>
					<li>Transaction</li>
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
