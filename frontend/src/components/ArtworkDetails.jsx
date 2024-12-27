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

			<div className='grid grid-cols-3 gap-4 gap-y-7'>
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
										<div className='flex items-center justify-center h-[500px] bg-white p-3'>
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

							<button className='bg-gray-100 text-lg font-semibold py-2 rounded-xl'>
								Add favorites 🩵
							</button>
						</div>
					</div>
				</div>

				{/* FULL DETAILS */}
				<div className='col-span-full'>
					<h1 className='text-lg font-semibold pb-1 tracking-widest text-slate-800'>
						Full details 📃
					</h1>
					<div className='grid grid-cols-3 bg-white rounded-2xl'>
						{/* ARTWORK DETAILS */}
						<div className='col-span-2 p-3 py-7'>
							<ul className='space-y-3 text-slate-800'>
								<li className='grid grid-cols-4'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Title:
									</span>
									<span className='col-span-3 font-medium'>{artwork.title || 'Untitled'}</span>
								</li>

								<li className='grid grid-cols-4'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Artist:
									</span>
									<span className='col-span-3 font-medium'>
										{artwork.user?.fullName || 'Unknown'}
									</span>
								</li>

								<li className='grid grid-cols-4'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Year created:
									</span>
									<span className='col-span-3 font-medium'>{artwork.yearCreated || 'Unknown'}</span>
								</li>

								<li className='grid grid-cols-4'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Medium:
									</span>
									<span className='col-span-3 font-medium'>{artwork.medium || 'Unknown'}</span>
								</li>

								<li className='grid grid-cols-4'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Dimension:
									</span>
									<span className='col-span-3 font-medium'>{artwork.dimension || 'Unknown'}</span>
								</li>

								<li className='grid grid-cols-4'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Description:
									</span>
									<span className='col-span-3 font-medium text-pretty leading-relaxed'>
										{artwork.description || 'Unknown'}
									</span>
								</li>

								<li className='grid grid-cols-4'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Price:
									</span>
									<span className='col-span-3 font-medium'>{formatPrice(artwork.price)}</span>
								</li>
							</ul>
						</div>

						{/* ARTIST DETAILS */}
						<div className='col-span-1 p-5 py-7 border-l-2 border-gray-100'>
							<h2 className='tracking-wider text-xs font-bold text-slate-700'>
								Behind the canvas ⭐
							</h2>

							<div className='flex flex-col items-center mb-3 mt-4'>
								<div className=''>
									<img
										src={artwork.user?.avatar}
										alt={artwork.user?.fullName}
										className='h-20 w-20 aspect-square object-cover rounded-md'
									/>
								</div>

								<p className='text-lg font-semibold text-slate-900'>
									{artwork.user?.fullName || 'Unknown'}
								</p>
							</div>

							{/* ARTIST DETAILS */}
							<ul className='space-y-2 text-slate-800'>
								<li className='grid grid-cols-3'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Name:
									</span>
									<span className='col-span-2 font-medium truncate'>{artwork.user?.fullName}</span>
								</li>

								<li className='grid grid-cols-3'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Email:
									</span>
									<span className='col-span-2 font-medium truncate'>{artwork.user?.email}</span>
								</li>

								<li className='grid grid-cols-3'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Joining date:
									</span>
									<span className='col-span-2 font-medium'>
										{new Date(artwork.createdAt).getFullYear()}
									</span>
								</li>

								<li className='grid grid-cols-3'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Location:
									</span>
									<span className='col-span-2 font-medium truncate'>{artwork.user?.location}</span>
								</li>
								<li className='tracking-widest'>
									... <span className='underline tracking-wide'>View artist profile</span>
								</li>
							</ul>
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
