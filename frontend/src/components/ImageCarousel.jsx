// components/ImageCarousel.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const images = [
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372972/pjb7djkofpqw18u7kwh2.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372972/ot7tuvzruo6pzugabun9.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372971/jf7yrbfhqydlkkyin4tf.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372970/dyiucadqhbdis8qyc0zn.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372967/shx5uc7j1g8yvx6r6p2h.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372967/tpwvirosek8gakvssjum.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372966/jq2enb6kz4tsdkhie1lx.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372966/glwxsfll7ozpyektj94j.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372964/g1n3vo9egzlxrahyie5c.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372964/nvi7eq9bnqdcdvacqdqz.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372964/bjk39jtvvf60oqgda4yi.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372964/h1tsjzn1spouo9gsprnd.jpg',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735372964/vw4ppiswdjnk5rephayk.jpg',
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
