import artworkBanner from '../assets/images/label-images/bg-artwork.jpg';

import useFetchArtworks from '../hooks/useFetchArtworks';

const Artists = () => {
	const { artworks, loading, error } = useFetchArtworks('museum');

	return (
		<div className='font-custom container max-w-7xl mx-auto mt-5 px-4 relative -z-50'>
			<div>
				{/* LABEL */}
				<div
					className='bg-cover bg-center py-5 px-10 relative rounded-2xl'
					style={{
						backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0) 70%), url(${artworkBanner})`,
					}}
				>
					<h2 className='text-white text-3xl font-bold'>Museum</h2>
				</div>

				{/* FILTER */}
				<div></div>

				{/* ARTWORKS ITEMS */}
				<div>
					<div className='grid grid-cols-2 gap-3'>
						{artworks.map(artwork => (
							<div key={artwork._id} className='bg-slate-200 grid grid-cols-2'>
								<div className='w-full h-fit aspect-square rounded-2xl'>
									<img
										src={artwork.images.frontView}
										alt={artwork.user.fullName}
										className='w-full h-full object-cover rounded-2xl'
									/>
								</div>
								<div className='grid grid-cols-1 grid-rows-3'>
									<div className='row-span-2'>
										<h2>{artwork.title}</h2>
										<p>{artwork.artistName}</p>
									</div>
									<div>
										<p>artist details</p>
										<p>{artwork.user.fullName}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Artists;
