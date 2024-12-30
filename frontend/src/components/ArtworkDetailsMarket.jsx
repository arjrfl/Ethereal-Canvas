import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstancePublic, axiosInstancePrivate } from '../utils/axiosConfig';
import { formatPrice } from '../utils/formatPrice';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import '../styles/CustomFrame.css';

const ArtworkDetailsMarket = () => {
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

	const handleCheckout = async () => {
		const role = localStorage.getItem('role');
		if (role !== 'collector') {
			alert('You need to log in as a collector to purchase this artwork.');
			return;
		}

		try {
			const token = localStorage.getItem('accessToken');

			if (!token) {
				alert('You must be logged in to perform this action.');
				return;
			}

			const response = await axiosInstancePrivate.post(
				'/artwork-checkout',
				{
					amount: artwork.price,
					description: `Purchase of ${artwork.title}`,
					remarks: `Artwork ID: ${artwork._id}`,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.data.checkoutUrl) {
				window.location.href = response.data.checkoutUrl;
			}
		} catch (error) {
			console.error('Error during checkout:', error.response?.data || error.message);
			alert('Failed to initiate checkout. Please try again.');
		}
	};

	const handleAddToFavorites = () => {
		const role = localStorage.getItem('role');
		if (role !== 'collector') {
			alert('You need to log in as a collector to add this artwork to your favorites.');
			return;
		}
		// Add logic for adding to favorites here
		console.log('Added to favorites.');
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p className='text-red-500'>{error}</p>;
	if (!artwork) return <p>Artwork not found</p>;

	return (
		<div className='font-custom container max-w-7xl mx-auto mt-5 px-4 text-sm'>
			<button
				onClick={() => navigate(-1)}
				className='mb-4 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 font-semibold tracking-widest'
			>
				🠜 Back
			</button>

			<div className='grid grid-cols-3 gap-x-6 gap-y-7'>
				{/* IMAGES GRID 1 */}
				<div className='col-span-2 frame drop-shadow-md'>
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
										<div className='flex items-center justify-center h-[450px] bg-white p-3'>
											<img
												src={artwork.images[key]}
												alt={`${artwork.title} - ${key}`}
												className='max-w-full max-h-full object-contain rounded-2xl'
											/>
										</div>
									</SwiperSlide>
								))}
							</Swiper>

							<Swiper
								onSwiper={setThumbsSwiper}
								loop
								spaceBetween={10}
								slidesPerView={4}
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
											className='w-full h-24 object-cover rounded-lg border border-gray-200 shadow-sm'
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
							<p className='text-xl font-semibold truncate xl:text-2xl'>
								<span className='tracking-wider font-bold'>{artwork.title || 'Untitled'}</span>,{' '}
								<span className='tracking-widest italic'>{artwork.yearCreated || 'Unknown'}</span>
							</p>
							<p className=''>{artwork.medium || 'Unknown'}</p>
							<p className=''>{artwork.dimension || 'Unknown'}</p>
						</div>

						{/* ARTIST */}
						<div className='flex gap-2 mb-5 items-center'>
							<div>
								<img
									src={artwork.user?.avatar}
									alt={artwork.user?.fullName}
									className='h-12 w-12 aspect-square object-cover rounded-md'
								/>
							</div>
							<div>
								<p className='font-medium'>{artwork.user?.fullName || 'Unknown'}</p>
								<p className='underline italic text-slate-500'>View artist</p>
							</div>
						</div>

						{/* PRICE */}
						<div className='mb-3'>
							<p className='text-2xl font-semibold xl:text-3xl'>{formatPrice(artwork.price)}</p>
						</div>

						<div className='flex flex-col gap-3'>
							<button
								onClick={handleCheckout}
								className='bg-blue-600 text-lg font-semibold text-white py-2 rounded-xl'
							>
								Checkout
							</button>

							<button
								onClick={handleAddToFavorites}
								className='bg-gray-100 text-lg font-semibold py-2 rounded-xl'
							>
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

					<div className='grid grid-cols-3 gap-x-5'>
						{/* ARTWORK DETAILS */}
						<div className='col-span-2 px-5 py-7 bg-white rounded-2xl'>
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

								<li className='grid grid-cols-4'>
									<span className='col-span-1 text-xs text-slate-600 tracking-wide font-semibold'>
										Price:
									</span>
									<span className='col-span-3 font-medium'>{formatPrice(artwork.price)}</span>
								</li>
							</ul>
						</div>

						{/* ARTIST DETAILS */}
						<div className='col-span-1'>
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
								<ul className='space-y-2 text-slate-800'>
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
									<li>
										<Link to={`/artist/${artwork.user?._id}`}>
											... <span className='underline tracking-wide'>View artist profile</span>
										</Link>
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

export default ArtworkDetailsMarket;
