// import React, { useEffect, useState } from 'react';

// import homeImgOne from '../assets/images/img-1-home.jpg';
// import homeImgTwo from '../assets/images/img-2-home.jpg';
// import homeImgThree from '../assets/images/img-3-home.jpg';
// import homeImgFour from '../assets/images/img-4-home.jpg';
// import homeImgFive from '../assets/images/img-5-home.jpg';
// import homeImgSix from '../assets/images/img-6-home.jpg';

// const Home = () => {
// 	const [artists, setArtists] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [currentIndex, setCurrentIndex] = useState(0);

// 	const shuffleArray = array => {
// 		for (let i = array.length - 1; i > 0; i--) {
// 			const j = Math.floor(Math.random() * (i + 1));
// 			[array[i], array[j]] = [array[j], array[i]]; // Swap elements
// 		}
// 		return array;
// 	};

// 	const fetchArtists = async () => {
// 		try {
// 			const response = await fetch('http://localhost:5000/artists'); // Use full URL
// 			if (!response.ok) {
// 				throw new Error(`Server error: ${response.status} ${response.statusText}`);
// 			}
// 			const data = await response.json();
// 			if (data.success) {
// 				// Shuffle the artists before setting state
// 				setArtists(shuffleArray(data.data));
// 			} else {
// 				console.error('Failed to fetch artists:', data.message);
// 			}
// 		} catch (error) {
// 			console.error('Error:', error.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchArtists();
// 	}, []);

// 	useEffect(() => {
// 		if (artists.length === 0) return;

// 		// INTERVAL
// 		const interval = setInterval(() => {
// 			setCurrentIndex(prevIndex => (prevIndex + 1) % artists.length);
// 		}, 30000);

// 		return () => clearInterval(interval);
// 	}, [artists]);

// 	if (loading) {
// 		return <p className='text-center text-xl font-semibold'>Loading...</p>;
// 	}

// 	return (
// 		<div className='mt-5 relative -z-50 font-custom md:grid md:grid-cols-3'>
// 			{/* carousel */}
// 			<div className='overflow-hidden md:col-span-2'>
// 				<div
// 					className='flex transition-transform duration-700 ease-in-out'
// 					style={{
// 						transform: `translateX(-${currentIndex * 100}%)`,
// 					}}
// 				>
// 					{artists.map(artist => (
// 						<div key={artist.artistId} className='w-full flex-shrink-0 px-3'>
// 							{/* Artist */}
// 							<div className='grid grid-cols-2 min-[480px]:grid-cols-4 sm:grid-cols-6 sm:grid-rows-2 gap-4'>
// 								{/* AVATAR */}
// 								<div className='w-full h-fit aspect-square col-span-2 rounded-xl shadow-md'>
// 									<img
// 										src={artist.avatar}
// 										alt={artist.fullName}
// 										className='w-full h-full object-cover rounded-xl'
// 									/>
// 								</div>

// 								{/* RECENT ARTWORK*/}
// 								<div
// 									className='hidden min-[480px]:flex drop-shadow-md col-span-2 rounded-xl relative sm:order-last sm:col-span-4'
// 									style={{
// 										backgroundImage: `url(${artist.recentArtwork?.images?.frontView})`,
// 										backgroundSize: 'cover',
// 										backgroundPosition: 'center',
// 									}}
// 								>
// 									<p className='text-[8px] font-bold tracking-widest bg-[#ffdabc] px-3 py-[1px] rounded-lg rounded-e-none rounded-tl-none rounded-tr-xl inline-block absolute right-0'>
// 										RECENT
// 									</p>

// 									<div className='backdrop-blur-xl backdrop-brightness-105 mt-auto w-full rounded-b-xl px-4 py-3'>
// 										<p className='text-base font-semibold text-white'>
// 											{artist.recentArtwork?.title}
// 										</p>
// 										<p className='text-xs text-slate-300 font-medium'>
// 											<span className='italic'>{artist.recentArtwork?.display}</span>,{' '}
// 											{artist.recentArtwork?.yearCreated}
// 										</p>
// 										<p></p>
// 									</div>
// 								</div>

// 								{/* RECENT ARTWORK GRID IMAGES */}
// 								<div className='bg-slate-500 hidden order-last col-span-2 rounded-xl sm:grid sm:grid-cols-2 sm:grid-rows-2'>
// 									<div className=''>
// 										<img
// 											src={artist.recentArtwork?.images?.angleOne}
// 											alt=''
// 											className='w-full h-full object-cover rounded-tl-xl'
// 										/>
// 									</div>

// 									<div className=''>
// 										<img
// 											src={artist.recentArtwork?.images?.frontView}
// 											alt=''
// 											className='w-full h-full object-cover rounded-tr-xl'
// 										/>
// 									</div>

// 									<div>
// 										<img
// 											src={artist.recentArtwork?.images?.angleTwo}
// 											alt=''
// 											className='w-full h-full object-cover rounded-bl-xl'
// 										/>
// 									</div>

// 									<div>
// 										<img
// 											src={artist.recentArtwork?.images?.angleThree}
// 											alt=''
// 											className='w-full h-full object-cover rounded-br-xl'
// 										/>
// 									</div>
// 								</div>

// 								{/* ARTIST LABEL */}
// 								<div className='text-left px-3 py-3	bg-[#67afda] flex items-center justify-between rounded-xl col-span-2 min-[480px]:col-span-4 sm:col-span-4'>
// 									<div className='text-white'>
// 										<h2 className='text-base sm:text-2xl font-semibold'>{artist.fullName}</h2>
// 										<p className='text-[10px] sm:text-xs'>{artist.email}</p>
// 									</div>
// 									<button className='text-[10px] sm:text-xs bg-[#e75600] font-bold text-gray-200 px-3 py-1 rounded-md'>
// 										CLICK ARTIST
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</div>

// 			{/* RANDOM IMAGE AUTO SLIDER */}
// 			<div className='col-span-1 mr-3 hidden md:block'>
// 				<div className='h-full rounded-xl'></div>
// 			</div>
// 		</div>
// 	);
// };

// export default Home;

// {
// 	/* <div
// 	className='hidden min-[480px]:block'
// 	style={{
// 		backgroundImage: `url(${artist.avatar})`,
// 		backgroundSize: 'cover', // Optional, ensures the image covers the entire div
// 		backgroundPosition: 'center', // Optional, centers the image
// 	}}
// >
// <h3 className='text-xs'>Recent:</h3>
// </div> */
// }

// {
// 	/* <img
// 	src={artist.recentArtwork?.images?.frontView}
// 	alt={artist.recentArtwork?.title || 'Artwork'}
// 	className='w-full h-52 object-cover'
// /> */
// }

// import React, { useEffect, useState } from 'react';

// import homeImgOne from '../assets/images/img-1-home.jpg';
// import homeImgTwo from '../assets/images/img-2-home.jpg';
// import homeImgThree from '../assets/images/img-3-home.jpg';
// import homeImgFour from '../assets/images/img-4-home.jpg';
// import homeImgFive from '../assets/images/img-5-home.jpg';
// import homeImgSix from '../assets/images/img-6-home.jpg';
// import homeImgSeven from '../assets/images/img-7-home.jpg';
// import homeImgEight from '../assets/images/img-8-home.jpg';
// import homeImgNine from '../assets/images/img-9-home.jpg';
// import homeImgTen from '../assets/images/img-10-home.jpg';
// import homeImgEleven from '../assets/images/img-11-home.jpg';
// import homeImgTwelve from '../assets/images/img-12-home.jpg';
// import homeImgThirteen from '../assets/images/img-13-home.jpg';

// const Home = () => {
// 	const [artists, setArtists] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [currentIndex, setCurrentIndex] = useState(0);
// 	const [imageIndex, setImageIndex] = useState(0); // State for the image slider

// 	const images = [
// 		homeImgOne,
// 		homeImgTwo,
// 		homeImgThree,
// 		homeImgFour,
// 		homeImgFive,
// 		homeImgSix,
// 		homeImgSeven,
// 		homeImgEight,
// 		homeImgNine,
// 		homeImgTen,
// 		homeImgEleven,
// 		homeImgTwelve,
// 		homeImgThirteen,
// 	];

// 	const shuffleArray = array => {
// 		for (let i = array.length - 1; i > 0; i--) {
// 			const j = Math.floor(Math.random() * (i + 1));
// 			[array[i], array[j]] = [array[j], array[i]]; // Swap elements
// 		}
// 		return array;
// 	};

// 	const fetchArtists = async () => {
// 		try {
// 			const response = await fetch('http://localhost:5000/artists'); // Use full URL
// 			if (!response.ok) {
// 				throw new Error(`Server error: ${response.status} ${response.statusText}`);
// 			}
// 			const data = await response.json();
// 			if (data.success) {
// 				// Shuffle the artists before setting state
// 				setArtists(shuffleArray(data.data));
// 			} else {
// 				console.error('Failed to fetch artists:', data.message);
// 			}
// 		} catch (error) {
// 			console.error('Error:', error.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchArtists();
// 	}, []);

// 	useEffect(() => {
// 		if (artists.length === 0) return;

// 		// INTERVAL
// 		const interval = setInterval(() => {
// 			setCurrentIndex(prevIndex => (prevIndex + 1) % artists.length);
// 		}, 3000);

// 		return () => clearInterval(interval);
// 	}, [artists]);

// 	// IMAGE SLIDER INTERVAL
// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			setImageIndex(prevIndex => (prevIndex + 1) % images.length);
// 		}, 3000); // Change image every 5 seconds

// 		return () => clearInterval(interval);
// 	}, [images]);

// 	if (loading) {
// 		return <p className='text-center text-xl font-semibold'>Loading...</p>;
// 	}

// 	return (
// 		<div className='mt-5 relative -z-50 font-custom md:grid md:grid-cols-3 md:gap-x-3 md:px-3'>
// 			{/* carousel */}
// 			<div className='overflow-hidden md:col-span-2 rounded-xl'>
// 				<div
// 					className='flex transition-transform duration-700 ease-in-out'
// 					style={{
// 						transform: `translateX(-${currentIndex * 100}%)`,
// 					}}
// 				>
// 					{artists.map(artist => (
// 						<div key={artist.artistId} className='w-full flex-shrink-0 px-3 md:px-0'>
// 							{/* Artist */}
// 							<div className='grid grid-cols-2 min-[480px]:grid-cols-4 sm:grid-cols-6 sm:grid-rows-2 gap-4'>
// 								{/* AVATAR */}
// 								<div className='w-full h-fit aspect-square col-span-2 rounded-xl shadow-md'>
// 									<img
// 										src={artist.avatar}
// 										alt={artist.fullName}
// 										className='w-full h-full object-cover rounded-xl'
// 									/>
// 								</div>

// 								{/* RECENT ARTWORK*/}
// 								<div
// 									className='hidden min-[480px]:flex drop-shadow-md col-span-2 rounded-xl relative sm:order-last sm:col-span-4'
// 									style={{
// 										backgroundImage: `url(${artist.recentArtwork?.images?.frontView})`,
// 										backgroundSize: 'cover',
// 										backgroundPosition: 'center',
// 									}}
// 								>
// 									<p className='text-[8px] font-bold tracking-widest bg-[#ffdabc] px-3 py-[1px] rounded-lg rounded-e-none rounded-tl-none rounded-tr-xl inline-block absolute right-0'>
// 										RECENT
// 									</p>

// 									<div className='backdrop-blur-xl backdrop-brightness-105 mt-auto w-full rounded-b-xl px-4 py-3'>
// 										<p className='text-base font-semibold text-white'>
// 											{artist.recentArtwork?.title}
// 										</p>
// 										<p className='text-xs text-slate-300 font-medium'>
// 											<span className='italic'>{artist.recentArtwork?.display}</span>,{' '}
// 											{artist.recentArtwork?.yearCreated}
// 										</p>
// 										<p></p>
// 									</div>
// 								</div>

// 								{/* RECENT ARTWORK GRID IMAGES */}
// 								<div className='bg-slate-500 hidden order-last col-span-2 rounded-xl sm:grid sm:grid-cols-2 sm:grid-rows-2'>
// 									<div className=''>
// 										<img
// 											src={artist.recentArtwork?.images?.angleOne}
// 											alt=''
// 											className='w-full h-full object-cover rounded-tl-xl'
// 										/>
// 									</div>

// 									<div className=''>
// 										<img
// 											src={artist.recentArtwork?.images?.frontView}
// 											alt=''
// 											className='w-full h-full object-cover rounded-tr-xl'
// 										/>
// 									</div>

// 									<div>
// 										<img
// 											src={artist.recentArtwork?.images?.angleTwo}
// 											alt=''
// 											className='w-full h-full object-cover rounded-bl-xl'
// 										/>
// 									</div>

// 									<div>
// 										<img
// 											src={artist.recentArtwork?.images?.angleThree}
// 											alt=''
// 											className='w-full h-full object-cover rounded-br-xl'
// 										/>
// 									</div>
// 								</div>

// 								{/* ARTIST LABEL */}
// 								<div className='text-left px-3 py-5	bg-[#67afda] flex items-center justify-between rounded-xl col-span-2 min-[480px]:col-span-4 sm:col-span-4'>
// 									<div className='text-white'>
// 										<h2 className='text-base sm:text-2xl font-semibold'>{artist.fullName}</h2>
// 										<p className='text-[10px] sm:text-xs'>{artist.email}</p>
// 									</div>
// 									<button className='text-[10px] sm:text-xs bg-[#e75600] font-bold text-gray-200 px-3 py-1 rounded-md'>
// 										CLICK ARTIST
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</div>

// 			{/* RANDOM IMAGE AUTO SLIDER */}
// <div
// 	className='h-full rounded-xl bg-cover bg-center transition-all duration-1000 ease-in-out'
// 	style={{
// 		backgroundImage: `url(${images[imageIndex]})`,
// 	}}
// ></div>
// 		</div>
// 	);
// };

// export default Home;

{
	/* <div className='col-span-1 mr-3 hidden md:block'>
	<div
		className='h-full rounded-xl bg-cover bg-center transition-all duration-1000 ease-in-out'
		style={{
			backgroundImage: `url(${images[imageIndex]})`,
		}}
		></div>
		</div> */
}

{
	/* <div
		className='col-span-1 mr-3 hidden md:block bg-cover bg-center rounded-xl overflow-hidden relative'
		style={{
			height: '100%', // Ensure it occupies full space
		}}
	>
		<div
			className='transition-transform duration-700 ease-in-out'
			style={{
				transform: `translateY(-${imageIndex * 100}%)`, // Moves the image upwards by 100% based on the index
				height: '100%', // Set this to cover the entire height of the parent
				position: 'absolute', // So the images are stacked on top of each other
				width: '100%', // Full width to cover the area
			}}
		>
			{images.map((image, index) => (
				<div
					key={index}
					className='w-full h-full bg-cover bg-center'
					style={{ backgroundImage: `url(${image})` }}
				></div>
			))}
		</div>
	</div> */
}

// import React, { useEffect, useState } from 'react';

// import homeImgOne from '../assets/images/img-1-home.jpg';
// import homeImgTwo from '../assets/images/img-2-home.jpg';
// import homeImgThree from '../assets/images/img-3-home.jpg';
// import homeImgFour from '../assets/images/img-4-home.jpg';
// import homeImgFive from '../assets/images/img-5-home.jpg';
// import homeImgSix from '../assets/images/img-6-home.jpg';
// import homeImgSeven from '../assets/images/img-7-home.jpg';
// import homeImgEight from '../assets/images/img-8-home.jpg';
// import homeImgNine from '../assets/images/img-9-home.jpg';
// import homeImgTen from '../assets/images/img-10-home.jpg';
// import homeImgEleven from '../assets/images/img-11-home.jpg';
// import homeImgTwelve from '../assets/images/img-12-home.jpg';
// import homeImgThirteen from '../assets/images/img-13-home.jpg';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

// import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// const Home = () => {
// 	const [artists, setArtists] = useState([]);
// 	const [loading, setLoading] = useState(true);

// 	const images = [
// 		homeImgOne,
// 		homeImgTwo,
// 		homeImgThree,
// 		homeImgFour,
// 		homeImgFive,
// 		homeImgSix,
// 		homeImgSeven,
// 		homeImgEight,
// 		homeImgNine,
// 		homeImgTen,
// 		homeImgEleven,
// 		homeImgTwelve,
// 		homeImgThirteen,
// 	];

// 	return (
// 		<div>
// 			<Swiper
// 				spaceBetween={30}
// 				centeredSlides={true}
// 				autoplay={{
// 					delay: 2500,
// 					disableOnInteraction: false,
// 				}}
// 				pagination={{
// 					clickable: true,
// 				}}
// 				navigation={true}
// 				modules={[Autoplay, Pagination, Navigation]}
// 				className='mySwiper'
// 			>
// 				<SwiperSlide className='bg-slate-500'>Slide 1</SwiperSlide>
// 				<SwiperSlide>Slide 2</SwiperSlide>
// 				<SwiperSlide>Slide 3</SwiperSlide>
// 				<SwiperSlide>Slide 4</SwiperSlide>
// 				<SwiperSlide>Slide 5</SwiperSlide>
// 				<SwiperSlide>Slide 6</SwiperSlide>
// 				<SwiperSlide>Slide 7</SwiperSlide>
// 				<SwiperSlide>Slide 8</SwiperSlide>
// 				<SwiperSlide>Slide 9</SwiperSlide>
// 			</Swiper>
// 		</div>
// 	);
// };

// export default Home;

import React, { useEffect, useState } from 'react';

import homeImgOne from '../assets/images/img-1-home.jpg';
import homeImgTwo from '../assets/images/img-2-home.jpg';
import homeImgThree from '../assets/images/img-3-home.jpg';
import homeImgFour from '../assets/images/img-4-home.jpg';
import homeImgFive from '../assets/images/img-5-home.jpg';
import homeImgSix from '../assets/images/img-6-home.jpg';
import homeImgSeven from '../assets/images/img-7-home.jpg';
import homeImgEight from '../assets/images/img-8-home.jpg';
import homeImgNine from '../assets/images/img-9-home.jpg';
import homeImgTen from '../assets/images/img-10-home.jpg';
import homeImgEleven from '../assets/images/img-11-home.jpg';
import homeImgTwelve from '../assets/images/img-12-home.jpg';
import homeImgThirteen from '../assets/images/img-13-home.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Home = () => {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);

	// Function to fetch artist data
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

	useEffect(() => {
		fetchArtists();
	}, []);

	const getFirstName = fullName => {
		const nameParts = fullName.split(' ');
		return nameParts[0].toUpperCase();
	};

	if (loading) return <p className='text-center text-xl font-semibold'>Loading...</p>;

	return (
		<div className='font-custom mt-5 relative -z-50 md:grid md:grid-cols-3 gap-4 md:px-4'>
			<div className='md:col-span-2'>
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{ delay: 2000, disableOnInteraction: false }}
					pagination={{ clickable: true }}
					navigation={true}
					modules={[Autoplay, Pagination, Navigation]}
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
									<p className='text-[6px] font-bold bg-[#ffdabc] text-slate-700 px-3 py-[3px]  rounded-lg rounded-e-none rounded-tl-none rounded-tr-2xl inline-block absolute right-0'>
										<span>{getFirstName(artist.fullName)}'S </span> RECENT
									</p>

									<div className='backdrop-blur-xl backdrop-brightness-105 mt-auto w-full rounded-b-2xl px-4 py-3'>
										<p className='text-base font-semibold text-white'>
											{artist.recentArtwork?.title}
										</p>
										<p className='text-xs text-slate-300 font-medium'>
											<span className='italic'>{artist.recentArtwork?.display}</span>,{' '}
											{artist.recentArtwork?.yearCreated}
										</p>
									</div>
								</div>

								{/* ARTIST DETAILS */}
								<div className='text-left p-4 bg-[#67afda] flex items-center justify-between rounded-2xl col-span-3'>
									<div className='text-white'>
										<p className='text-sm font-semibold'>{artist.fullName}</p>
										<p className='text-[10px] text-gray-200'>
											{artist.location}, <span>{new Date(artist.join).getFullYear()}</span>
										</p>
									</div>
									<button className='text-[10px] bg-[#e75600] shrink-0 font-bold text-gray-200 px-3 py-1 rounded-md'>
										CLICK ARTIST
									</button>
								</div>

								{/* GRID RECENT ARTWORK IMAGES */}
								<div className='hidden sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:col-span-2 sm:row-span-2 order-last rounded-xl'>
									<div>
										<img
											src={artist.recentArtwork?.images?.angleOne}
											alt='artwork angle'
											className='w-full h-full object-cover rounded-tl-xl'
										/>
									</div>
									<div>
										<img
											src={artist.recentArtwork?.images?.angleTwo}
											alt='artwork angle'
											className='w-full h-full object-cover rounded-tr-xl'
										/>
									</div>
									<div>
										<img
											src={artist.recentArtwork?.images?.angleThree}
											alt='artwork angle'
											className='w-full h-full object-cover rounded-bl-xl'
										/>
									</div>
									<div>
										<img
											src={artist.recentArtwork?.images?.frontView}
											alt='artwork angle'
											className='w-full h-full object-cover rounded-br-xl'
										/>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className='bg-slate-300 rounded-2xl'></div>
		</div>
	);
};

export default Home;
