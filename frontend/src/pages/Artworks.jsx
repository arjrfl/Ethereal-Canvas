import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import artworkBanner from '../assets/images/label-images/bg-artwork.jpg';
import useFetchArtworks from '../hooks/useFetchArtworks';

const Artworks = () => {
	const { isDropdownOpen } = useOutletContext();
	const [selectedMedium, setSelectedMedium] = useState(null);
	const { artworks, loading, error } = useFetchArtworks('museum', selectedMedium);

	const handleFilterChange = medium => {
		setSelectedMedium(medium === 'All' ? null : medium);
		console.log(`Filter changed to: ${medium}`);
	};

	return (
		<div
			className={`font-custom container max-w-7xl mx-auto mt-5 px-4 relative ${isDropdownOpen ? '-z-50' : ''}`}
		>
			<div>
				{/* LABEL */}
				<div
					className='bg-cover bg-center py-10 px-10 relative rounded-2xl mb-7'
					style={{
						backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0) 70%), url(${artworkBanner})`,
					}}
				>
					<h2 className='text-white text-4xl font-bold tracking-widest'>Museum</h2>
				</div>

				{/* FILTER BTNS */}
				<div className='mb-10 grid grid-cols-3 text-sm'>
					<div className='col-span-1'>
						<h3 className='font-semibold text-slate-700 tracking-widest'>Mediums:</h3>
					</div>
					<ul className='flex flex-wrap col-span-2 gap-x-3 gap-y-2 text-xs font-medium text-gray-800'>
						{[
							'All',
							'Acrylic',
							'Chalk',
							'Charcoal',
							'Colored Pencils',
							'Graphite Pencils',
							'Oil Paint',
							'Oil Pastels',
							'Pen and Ink',
							'Soft Pastels',
							'Tempera',
							'Watercolor',
						].map(medium => (
							<li key={medium}>
								<button
									onClick={() => {
										handleFilterChange(medium);
										console.log('clicked');
									}}
									className={`px-4 py-1 border rounded-lg text-white font-medium tracking-wider ${selectedMedium === medium ? 'bg-[#67afda]' : 'bg-[#e75600]'}`}
								>
									{medium}
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* ARTWORKS ITEMS */}
				<div>
					<div className='grid grid-cols-2 gap-10'>
						{loading ? (
							<p>Loading...</p>
						) : error ? (
							<p className='text-red-500'>{error}</p>
						) : artworks.length === 0 ? (
							<p>No artworks found with the selected medium.</p>
						) : (
							artworks.map(artwork => (
								<Link
									to={`/artwork-museum/${artwork._id}`}
									key={artwork._id}
									className='grid grid-cols-2 grid-rows-1 bg-white rounded-xl drop-shadow-md'
								>
									<div className='w-full h-fit aspect-square rounded-2xl'>
										<img
											src={artwork.images.frontView}
											alt={artwork.user.fullName}
											className='w-full h-full object-cover rounded-2xl rounded-tr-none rounded-br-none'
										/>
									</div>

									<div className='flex flex-col justify-between p-5'>
										<div className='space-y-1'>
											<p className='text-xl text-slate-800 font-bold tracking-wider truncate xl:text-2xl'>
												{artwork.title}
											</p>
											<p className='text-base text-slate-600 font-medium'>
												<span className=''>{artwork.medium}</span>,{' '}
												<span className='tracking-widest italic'>{artwork.yearCreated}</span>
											</p>
											<p className=''>{artwork.user.fullName}</p>
										</div>

										{/* IMAGES */}
										<div className='flex flex-col gap-1'>
											<h3 className='mt-auto text-xs font-medium text-slate-600'>Images:</h3>
											<div className='grid grid-cols-3 grid-rows-1 gap-3'>
												<div className='w-full h-fit aspect-square drop-shadow-sm'>
													<img
														src={artwork.images.angleOne}
														alt={artwork.user.fullName}
														className='w-full h-full object-cover rounded-xl'
													/>
												</div>

												<div className='w-full h-fit aspect-square drop-shadow-sm'>
													<img
														src={artwork.images.angleTwo}
														alt={artwork.user.fullName}
														className='w-full h-full object-cover rounded-xl'
													/>
												</div>

												<div className='w-full h-fit aspect-square drop-shadow-sm'>
													<img
														src={artwork.images.angleThree}
														alt={artwork.user.fullName}
														className='w-full h-full object-cover rounded-xl'
													/>
												</div>
											</div>
										</div>

										<div className='flex'>
											<button className='bg-blue-600 text-white flex-1 text-base py-2 rounded-lg font-semibold tracking-widest hover:bg-blue-500'>
												View Artwork
											</button>
										</div>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Artworks;
