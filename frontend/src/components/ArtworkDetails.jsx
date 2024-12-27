import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstancePublic } from '../utils/axiosConfig';
import { formatPrice } from '../utils/formatPrice';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

const ArtworkDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [artwork, setArtwork] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	useEffect(() => {
		const fetchArtworkDetails = async () => {
			try {
				setLoading(true);
				const response = await axiosInstancePublic.get(`/artwork/${id}`);
				setArtwork(response.data);
			} catch (err) {
				setError('Failed to load artwork details. Please try again later.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchArtworkDetails();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p className='text-red-500'>{error}</p>;

	if (!artwork) return <p>Artwork not found</p>;

	return (
		<div className='font-custom container max-w-7xl mx-auto mt-5 px-4 text-sm'>
			<button
				onClick={() => navigate(-1)}
				className='mb-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
			>
				Back
			</button>

			<div className='grid grid-cols-3 gap-4'>
				{/* IMAGES GRID 1 */}
				<div className='col-span-2'>
					{artwork.images && Object.keys(artwork.images).length > 0 ? (
						<>
							<Swiper
								style={{
									'--swiper-navigation-color': '#e5e7eb',
									'--swiper-pagination-color': '#e5e7eb',
								}}
								thumbs={{ swiper: thumbsSwiper }}
								modules={[Navigation, Pagination, FreeMode, Thumbs]}
								navigation
								pagination={{ clickable: true }}
								spaceBetween={20}
								slidesPerView={1}
								loop
								className='rounded-2xl drop-shadow-sm'
							>
								{Object.keys(artwork.images).map((key, index) => (
									<SwiperSlide key={index}>
										<div className='flex items-center justify-center h-[500px] bg-white'>
											<img
												src={artwork.images[key]}
												alt={`${artwork.title} - ${key}`}
												className='max-w-full max-h-full object-contain rounded-2xl shadow-md'
											/>
										</div>
									</SwiperSlide>
								))}
							</Swiper>

							<Swiper
								onSwiper={setThumbsSwiper}
								loop
								spaceBetween={10}
								slidesPerView={3}
								freeMode
								watchSlidesProgress
								modules={[FreeMode, Navigation, Thumbs]}
								className='mt-3'
							>
								{Object.keys(artwork.images).map((key, index) => (
									<SwiperSlide key={index}>
										<img
											src={artwork.images[key]}
											alt={`${artwork.title} - ${key}`}
											className='w-full h-24 object-cover rounded-2xl border border-gray-200 shadow-sm'
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</>
					) : (
						<p>No images available for this artwork.</p>
					)}
				</div>

				{/* DETAILS GRID 2 */}
				<div className='rounded-2xl col-span-1'>
					<div className='bg-white rounded-2xl p-5'>
						{/* TITLE, MEDIUM, DIMENSION */}
						<div className='space-y-2 mb-3 text-base font-medium text-slate-800'>
							<p className='text-lg font-semibold'>
								<span className='tracking-wider font-bold'>{artwork.title || 'Untitled'}</span>,{' '}
								<span className='tracking-widest italic'>{artwork.yearCreated || 'Unknown'}</span>
							</p>
							<p className=''>{artwork.medium || 'Unknown'}</p>
							<p className=''>{artwork.dimension || 'Unknown'}</p>
						</div>

						{/* ARTIST */}
						<div className='flex gap-2 mb-3'>
							<div>
								<img
									src={artwork.user?.avatar}
									alt={artwork.user?.fullName}
									className='h-10 w-10 aspect-square object-cover rounded-md'
								/>
							</div>
							<div>
								<p className=''>{artwork.user?.fullName || 'Unknown'}</p>
								<p className='underline'>View artist</p>
							</div>
						</div>

						{/* PRICE */}
						<div className='mb-3'>
							<p className='text-2xl font-semibold'>{formatPrice(artwork.price)}</p>
						</div>

						<div className='flex flex-col gap-2'>
							<button className='bg-blue-600 text-lg font-semibold text-white py-2 rounded-xl'>
								Purchase
							</button>

							<button className='text-lg font-semibold py-2 rounded-xl border'>
								Add favorites
							</button>
						</div>
					</div>
				</div>

				{/* FULL DETAILS */}
				<div className='bg-white col-span-full rounded-2xl'>
					<h3>Full details</h3>
					<div className='grid grid-cols-3'>
						{/* ARTWORK DETAILS */}
						<div className='bg-green-100 col-span-2'>
							<ul>
								<li>Title: </li>
								<li>Artist: </li>
								<li>Year created: </li>
								<li>Medium: </li>
								<li>Dimension: </li>
								<li>Description: </li>
								<li>Price: </li>
							</ul>
						</div>

						{/* ARTIST DETAILS */}
						<div className='bg-blue-100 col-span-1'>
							<h2>Behind the canvas</h2>
							<div className='flex flex-col items-center border'>
								<div>
									<img
										src={artwork.user?.avatar}
										alt={artwork.user?.fullName}
										className='h-10 w-10 aspect-square object-cover rounded-md'
									/>
								</div>

								<div>
									<p className=''>{artwork.user?.fullName || 'Unknown'}</p>
								</div>
							</div>

							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArtworkDetails;

{
	/* <p className=''>{artwork.user?.email || 'Unknown'}</p> */
}
{
	/* <p className=''>
	<span>{artwork?.user.location || 'Unknown'}</span>,{' '}
	<span>{new Date(artwork.user?.createdAt).getFullYear() || 'Unknown'}</span>
</p> */
}
