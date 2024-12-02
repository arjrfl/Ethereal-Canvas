import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';

const ImageUpload = ({ label, name, onChange, initialValue }) => {
	const [preview, setPreview] = useState(initialValue ? URL.createObjectURL(initialValue) : null);
	const inputRef = useRef(null);

	const handleFileChange = event => {
		const file = event.target.files[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
			onChange(name, file);
		}
	};

	useEffect(() => {
		if (initialValue) {
			setPreview(URL.createObjectURL(initialValue));
		}
	}, [initialValue]);

	return (
		<div className='w-full p-6 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center'>
			<input
				id={name}
				type='file'
				accept='image/*'
				className='hidden'
				onChange={handleFileChange}
				ref={inputRef}
			/>

			<label htmlFor={name} className='cursor-pointer'>
				{preview ? (
					<img src={preview} alt='Preview' className='max-h-48 rounded-lg mx-auto' />
				) : (
					<div>
						<HiOutlineUpload className='w-8 h-8 text-gray-700 mx-auto mb-4' />
						<h5 className='mb-2 text-lg font-bold tracking-tight text-gray-700'>{label}</h5>
						<p className='font-custom text-xs md:text-sm text-gray-400 md:px-6'>
							Choose photo size should be less than <b className='text-gray-600'>2mb</b>
						</p>
						<p className='font-custom text-xs md:text-sm text-gray-400 md:px-6'>
							and should be in <b className='text-gray-600'>JPG, PNG, or GIF</b> format.
						</p>
					</div>
				)}
			</label>

			<div className='mt-4'>
				<label
					htmlFor={name}
					className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-500'
				>
					Choose Image
				</label>
			</div>
		</div>
	);
};

export default ImageUpload;
