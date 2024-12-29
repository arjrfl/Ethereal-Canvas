import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstancePublic } from '../utils/axiosConfig';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import '../styles/CustomFrame.css';

const ArtworkDetailsMuseum = () => {
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

			<div className='grid grid-cols-3 gap-x-5 gap-y-10'>
				{/* IMAGES GRID 1 */}
				<div className='col-span-2 bg-green-200 frame'>
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
								spaceBetween={0}
								slidesPerView={1}
								loop
								className='rounded-lg drop-shadow-sm'
							>
								{Object.keys(artwork.images).map((key, index) => (
									<SwiperSlide key={index}>
										<div className='flex items-center justify-center h-[400px] bg-white p-3'>
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
								spaceBetween={15}
								slidesPerView={4}
								freeMode
								watchSlidesProgress
								modules={[FreeMode, Navigation, Thumbs]}
								className='mt-4'
							>
								{Object.keys(artwork.images).map((key, index) => (
									<SwiperSlide key={index}>
										<img
											src={artwork.images[key]}
											alt={`${artwork.title} - ${key}`}
											className='w-full h-20 object-cover rounded-lg  shadow-sm'
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</>
					) : (
						<p>No images available for this artwork.</p>
					)}
				</div>

				{/* SHORT DETAILS GRID 2 */}
				<div className='col-span-1 flex items-center'>
					<div className='bg-white py-6 px-8 rounded-xl drop-shadow-lg flex-1'>
						<div className='flex items-center gap-x-2 mb-2'>
							<img
								src={artwork.user?.avatar}
								alt={artwork.user?.fullName}
								className='h-8 w-8 aspect-square object-cover rounded-md'
							/>
							<div className=''>
								<p className='truncate text-lg leading-tight font-medium tracking-wide'>
									{artwork.user?.fullName || 'Unknown'}
								</p>
								<p className='text-xs italic'>{artwork.user?.location || 'Unknown'}</p>
							</div>
						</div>

						<p className='text-base truncate'>
							<span className='font-semibold'>{artwork.title || 'Untitled'}</span>,{' '}
							<span className='tracking-widest'>{artwork.yearCreated || 'Unknown'}</span>
						</p>
						<p className='mb-2'>{artwork.medium || 'Unknown'}</p>
						<p className='underline italic'>full details below 🢱</p>
					</div>
				</div>

				{/* FULL DETAILS GRID 3*/}
				<div className='col-span-full'>
					<h1 className='text-lg font-semibold pb-1 tracking-widest text-slate-800'>
						Full details 📃
					</h1>

					<div className='grid grid-cols-3 gap-x-5'>
						{/* ARTWORK DETAILS */}
						<div className='col-span-2 px-5 py-7 rounded-xl bg-white'>
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
									<span className='col-span-3 font-medium tracking-widest'>
										{artwork.yearCreated || 'Unknown'}
									</span>
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
										About:
									</span>
									<span className='col-span-3 font-medium text-pretty leading-relaxed xl:tracking-wide'>
										{artwork.description || 'Unknown'}
									</span>
								</li>
							</ul>
						</div>

						{/* ARTIST DETAILS */}
						<div className='col-span-1 '>
							<div className='p-5 py-7 rounded-xl bg-white'>
								<h2 className='tracking-wider text-xs font-bold text-slate-700'>
									Behind the canvas ⭐
								</h2>

								<div className='flex flex-col items-center mb-3 mt-4'>
									<div className=''>
										<img
											src={artwork.user?.avatar}
											alt={artwork.user?.fullName}
											className='h-24 w-24 aspect-square object-cover rounded-md'
										/>
									</div>

									<p className='text-lg font-semibold text-slate-900'>
										{artwork.user?.fullName || 'Unknown'}
									</p>
								</div>

								{/* ARTIST DETAILS */}
								<ul className='space-y-3 text-slate-800'>
									<li className='grid grid-cols-3'>
										<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
											Name:
										</span>
										<span className='col-span-2 font-medium truncate'>
											{artwork.user?.fullName}
										</span>
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
										<span className='col-span-2 font-medium tracking-widest'>
											{new Date(artwork.createdAt).getFullYear()}
										</span>
									</li>

									<li className='grid grid-cols-3'>
										<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
											From:
										</span>
										<span className='col-span-2 font-medium truncate'>
											{artwork.user?.location}
										</span>
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
		</div>
	);
};

export default ArtworkDetailsMuseum;
