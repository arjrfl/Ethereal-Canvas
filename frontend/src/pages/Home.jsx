import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import brush from '../assets/images/grid-banner-icons/paint-brush.svg';
import palette from '../assets/images/grid-banner-icons/pallete.svg';
import placeholder from '../assets/images/grid-banner-icons/placeholder.svg';
import sun from '../assets/images/grid-banner-icons/sun.svg';
import bannerBG from '../assets/images/banner-two.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-flip';

import useRandomColor from '../hooks/useRandomColor';
import useFallBackAvatar from '../hooks/useFallbackAvatar';
import ImageCarousel from '../components/ImageCarousel';

const Home = () => {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [randomArtists, setRandomArtists] = useState([]);
	const fallbackAvatar = useFallBackAvatar();

	const { generateColorArray } = useRandomColor();
	const randomColorsRef = useRef([]);
	useEffect(() => {
		if (randomArtists && randomArtists.length > 0 && randomColorsRef.current.length === 0) {
			randomColorsRef.current = generateColorArray(randomArtists.length);
		}
	}, [randomArtists, generateColorArray]);

	const fetchArtists = async () => {
		try {
			const response = await fetch('http://localhost:5000/artists');

			if (!response.ok) {
				throw new Error(`Server error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			console.log(data);

			if (data.success) {
				setArtists(data.data);
			} else {
				console.error('Failed to fetch artists:', data.message);
			}
		} catch (error) {
			console.error('Error:', error.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchRandomArtist = async () => {
		try {
			const response = await axios.get('http://localhost:5000/approve-artists');

			if (response.data.success) {
				const randomArtists = getRandomArtists(response.data.data);
				setRandomArtists(randomArtists);
			}
		} catch (error) {
			console.error('Error fetching artists:', error);
		}
	};

	useEffect(() => {
		fetchArtists();
		fetchRandomArtist();
	}, []);

	const getFirstName = fullName => {
		const nameParts = fullName.split(' ');
		return nameParts[0].toUpperCase();
	};

	const getRandomArtists = randomArtistList => {
		const shuffled = randomArtistList.sort(() => 0.5 - Math.random());
		return shuffled.slice(0, 5);
	};

	if (loading) return <p className='text-center text-xl font-semibold'>Loading...</p>;

	return (
		<div className='font-custom container max-w-7xl mx-auto mt-5 relative -z-50'>
			{/* HERO SECTION */}
			<div className='md:grid md:grid-cols-3 gap-4 md:px-4 xl:grid-cols-4 mb-4'>
				{/* ARTIST CAROUSEL */}
				<div className='md:col-span-2'>
					<Swiper
						spaceBetween={30}
						centeredSlides={true}
						loop={true}
						autoplay={{ delay: 20000, disableOnInteraction: false }}
						modules={[Autoplay]}
						className='mySwiper rounded-2xl'
					>
						{/* Loop through fetched artists to display in Swiper slides */}
						{artists.map(artist => (
							<SwiperSlide key={artist.artistId}>
								<div className=' flex-shrink-0 px-4 md:px-0 grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-0 gap-y-4 min-[480px]:gap-4 sm:grid-cols-4 sm:grid-rows-3'>
									{/* AVATAR */}
									<div className='w-full h-fit aspect-square rounded-2xl drop-shadow-lg col-span-1 sm:col-span-1'>
										<img
											src={artist.avatar}
											alt={artist.fullName}
											className='w-full h-full object-cover rounded-2xl'
										/>
									</div>

									{/* RECENT ARTWORK */}
									<div
										className='hidden min-[480px]:flex col-span-1 relative rounded-2xl min-[480px]:col-span-2 sm:order-last sm:col-span-2 sm:row-span-2'
										style={{
											backgroundImage: `url(${artist.recentArtwork?.images?.frontView})`,
											backgroundSize: 'cover',
											backgroundPosition: 'center',
										}}
									>
										<p className='tracking-wide lg:text-[10px] text-[6px] font-bold bg-[#ffdabc] text-slate-700 px-3 py-[3px] rounded-lg rounded-e-none rounded-tl-none rounded-tr-2xl inline-block absolute right-0'>
											<span>{getFirstName(artist.fullName)}'S </span> RECENT
										</p>

										<div className='backdrop-blur-2xl brightness-100 backdrop-brightness-105 mt-auto w-full rounded-b-2xl px-4 py-3 sm:py-4'>
											<p className='text-base font-semibold text-white lg:text-lg lg:tracking-widest'>
												{artist.recentArtwork?.title}
											</p>
											<p className='text-xs tracking-widest text-gray-200 font-semibold'>
												<span className='italic'>{artist.recentArtwork?.display}</span>,{' '}
												{artist.recentArtwork?.yearCreated}
											</p>
										</div>
									</div>

									{/* ARTIST DETAILS */}
									<div className='text-left p-4 bg-[#67afda] flex items-center justify-between rounded-2xl col-span-3'>
										<div className='text-white'>
											<p className='text-sm font-semibold sm:text-lg lg:text-xl'>
												{artist.fullName}
											</p>
											<p className='text-[10px] sm:tracking-widest sm:font-semibold sm:text-xs text-gray-200'>
												{artist.location}, <span>{new Date(artist.join).getFullYear()}</span>
											</p>
										</div>
										<button className='text-[10px] sm:tracking-widest sm:py-2 sm:px-4 bg-[#e75600] shrink-0 font-bold text-gray-200 px-3 py-1 rounded-md'>
											VISIT PROFILE
										</button>
									</div>

									{/* GRID RECENT ARTWORK IMAGES */}
									<div className='hidden sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:col-span-2 sm:row-span-2 sm:gap-2 order-last rounded-xl'>
										<div>
											<img
												src={artist.recentArtwork?.images?.angleOne}
												alt='artwork angle'
												className='w-full h-full object-cover rounded-2xl'
											/>
										</div>
										<div>
											<img
												src={artist.recentArtwork?.images?.angleTwo}
												alt='artwork angle'
												className='w-full h-full object-cover rounded-2xl'
											/>
										</div>
										<div>
											<img
												src={artist.recentArtwork?.images?.angleThree}
												alt='artwork angle'
												className='w-full h-full object-cover rounded-2xl'
											/>
										</div>
										<div>
											<img
												src={artist.recentArtwork?.images?.frontView}
												alt='artwork angle'
												className='w-full h-full object-cover rounded-2xl'
											/>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				{/* IMAGE CAROUSEL */}
				<div className='hidden md:block h-full col-span-1 rounded-2xl shadow-lg'>
					<div className='hidden md:block h-full col-span-1 rounded-2xl shadow-lg'>
						<ImageCarousel autoplayDelay={20000} />
					</div>
				</div>

				{/* RANDOM ARTIST */}
				<div className='hidden xl:flex col-span-1 flex-col justify-between rounded-2xl'>
					{randomArtists.map((artist, index) => (
						<div
							key={artist._id}
							className='flex gap-2 bg-slate-300 rounded-xl'
							style={{ backgroundColor: randomColorsRef.current[index] }}
						>
							<img
								src={artist.avatar || fallbackAvatar}
								alt={artist.fullName || 'Fallback Avatar'}
								className='w-[70px] h-[70px] aspect-square object-cover rounded-xl rounded-tr-none rounded-br-none'
							/>
							<div className='flex flex-col justify-center text-slate-800 backdrop-blur-md'>
								<h3 className='font-semibold'>{artist.fullName}</h3>
								<p className='text-[10px] sm:tracking-widest sm:font-semibold text-slate-600'>
									{artist.location}, <span>{new Date(artist.createdAt).getFullYear()}</span>
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* BANNER */}
			<div className='px-4 mb-4'>
				<div className='grid grid-cols-2 grid-rows-2 gap-3'>
					<div className='py-3 px-3 bg-amber-400 rounded-xl'>
						<div className=''>
							<img src={sun} alt='sun' className='w-7 h-7 mb-2' />
							<h3 className='tracking-wide font-bold pb-2 text-sm'>
								Art from Rising Filipino Stars
							</h3>
						</div>
						<p className='tracking-wide text-slate-800 font-semibold text-xs'>
							Made by emerging local artists with passion and purpose.
						</p>
					</div>

					<div className='py-3 px-3 bg-red-400 rounded-xl'>
						<div>
							<img src={brush} alt='sun' className='w-7 h-7 mb-2' />
							<h3 className='tracking-wide font-bold pb-2 text-sm'>Inspired Locally</h3>
						</div>
						<p className='tracking-wide text-slate-800 font-semibold text-xs'>
							Local stories through every brushstroke.
						</p>
					</div>

					<div className='py-3 px-3 bg-blue-400 rounded-xl'>
						<div>
							<img src={palette} alt='sun' className='w-7 h-7 mb-2' />
							<h3 className='tracking-wide font-bold pb-2 text-sm'>Art by Local Talent</h3>
						</div>
						<p className='tracking-wide text-slate-800 font-semibold text-xs'>
							Discover unique works crafted by emerging artists
						</p>
					</div>

					<div className='py-3 px-3 bg-purple-400 rounded-xl'>
						<div>
							<img src={placeholder} alt='sun' className='w-7 h-7 mb-2' />
							<h3 className='tracking-wide font-bold pb-2 text-sm'>Proudly Filipino</h3>
						</div>
						<p className='tracking-wide text-slate-800 font-semibold text-xs'>
							Support emerging Filipino artists with every piece.
						</p>
					</div>
				</div>
			</div>

			{/* BANNER 2 */}
			<div className='px-4 mb-4'>
				<div
					className='rounded-2xl min-h-60 flex justify-center items-center px-3'
					style={{
						backgroundImage: `url(${bannerBG})`,
						backgroundSize: 'cover', // Ensures the image covers the area
						backgroundPosition: 'center', // Centers the image in the container
					}}
				>
					<div className='py-6 rounded-2xl backdrop-blur-2xl flex flex-col items-center text-center gap-2 px-2'>
						<h3 className='font-bold text-slate-800 text-2xl tracking-widest'>
							Discover emerging artists!
						</h3>
						<button
							className='px-4 py-1 rounded-lg text-xs bg-blue-500 text-white 
							transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 
							hover:bg-indigo-500 duration-300'
						>
							Artists
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
