import { useState } from 'react';
import marketBanner from '../assets/images/label-images/cover2.jpg';

const Artists = () => {
	return (
		<div className='font-custom container max-w-7xl mx-auto mt-5 px-4 relative -z-50'>
			<div>
				{/* LABEL */}
				<div
					className='bg-cover bg-center py-5 px-10 relative rounded-2xl'
					style={{
						backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 70%), url(${marketBanner})`,
					}}
				>
					<h2 className='text-white text-3xl font-bold'>Marketplace</h2>
				</div>

				{/* FILTER */}
				<div></div>

				{/* ARTISTS */}
				<div></div>
			</div>
		</div>
	);
};

export default Artists;
