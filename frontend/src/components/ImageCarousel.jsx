// components/ImageCarousel.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Import the images directly into this component
import homeImgOne from '../assets/images/carousel-images/img-1-home.jpg';
import homeImgTwo from '../assets/images/carousel-images/img-2-home.jpg';
import homeImgThree from '../assets/images/carousel-images/img-3-home.jpg';
import homeImgFour from '../assets/images/carousel-images/img-4-home.jpg';
import homeImgFive from '../assets/images/carousel-images/img-5-home.jpg';
import homeImgSix from '../assets/images/carousel-images/img-6-home.jpg';
import homeImgSeven from '../assets/images/carousel-images/img-7-home.jpg';
import homeImgEight from '../assets/images/carousel-images/img-8-home.jpg';
import homeImgNine from '../assets/images/carousel-images/img-9-home.jpg';
import homeImgTen from '../assets/images/carousel-images/img-10-home.jpg';
import homeImgEleven from '../assets/images/carousel-images/img-11-home.jpg';
import homeImgTwelve from '../assets/images/carousel-images/img-12-home.jpg';
import homeImgThirteen from '../assets/images/carousel-images/img-13-home.jpg';

// Define the images array inside the component
const images = [
	homeImgOne,
	homeImgTwo,
	homeImgThree,
	homeImgFour,
	homeImgFive,
	homeImgSix,
	homeImgSeven,
	homeImgEight,
	homeImgNine,
	homeImgTen,
	homeImgEleven,
	homeImgTwelve,
	homeImgThirteen,
];

const ImageCarousel = ({ autoplayDelay = 20000 }) => {
	return (
		<Swiper
			autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
			modules={[Autoplay]}
			className='rounded-2xl w-full h-full'
		>
			{images.map((image, index) => (
				<SwiperSlide key={index}>
					<img
						src={image}
						alt={`Carousel image ${index + 1}`}
						className='w-full h-full object-cover aspect-auto'
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ImageCarousel;
