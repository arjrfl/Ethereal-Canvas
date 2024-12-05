import ArtistDashboardEditProfile from '../components/DashboardArtistEditProfile';

import { TbEdit, TbUpload, TbImageInPicture, TbClipboardList } from 'react-icons/tb';

const ArtistDashboard = () => {
	return (
		<div className='container max-w-full mx-auto px-3 py-4 md:px-10 md:grid md:grid-cols-11'>
			{/* SMALL SCREEN */}
			<div className='sm:hidden'>
				<ul className='grid grid-cols-4 items-center justify-items-center rounded-xl bg-cyan-500'>
					<li className='m-2 p-2 hover:bg-cyan-400 hover:rounded-xl'>
						<TbEdit className='text-2xl font-light text-white' />
					</li>
					<li className='m-2 p-2 hover:bg-cyan-400 hover:rounded-xl'>
						<TbUpload className='text-2xl text-white' />
					</li>
					<li className='m-2 p-2 hover:bg-cyan-400 hover:rounded-xl'>
						<TbImageInPicture className='text-2xl text-white' />
					</li>
					<li className='m-2 p-2 hover:bg-cyan-400 hover:rounded-xl'>
						<TbClipboardList className='text-2xl text-white' />
					</li>
				</ul>
			</div>

			{/* MEDIUM SCREEN */}

			<div className='hidden sm:block md:hidden'>
				<ul className='grid grid-cols-4 items-center justify-items-center rounded-xl bg-cyan-500'>
					<li>Edit Profile</li>
					<li>Upload Artwork</li>
					<li>Artworks</li>
					<li>Transaction</li>
				</ul>
			</div>

			{/* LARGE SCREEN */}
			<div className='hidden md:block md:col-span-2'>
				<ul className='bg-cyan-500'>
					<li>Edit Profile</li>
					<li>Upload Artwork</li>
					<li>Artworks</li>
					<li>Transaction</li>
				</ul>
			</div>

			{/*  */}
			<div className='md:col-span-9'>
				<ArtistDashboardEditProfile />
			</div>
		</div>
	);
};

export default ArtistDashboard;
