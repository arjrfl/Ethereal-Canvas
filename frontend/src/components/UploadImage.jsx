import React, { useState, useRef, useEffect } from 'react';
import { FaImage } from 'react-icons/fa';

const ImageUpload = ({ label, name, onChange, initialValue, reset }) => {
	const [preview, setPreview] = useState(
		initialValue && initialValue.length > 0 ? URL.createObjectURL(initialValue[0]) : null
	);
	const inputRef = useRef(null);

	const handleFileChange = event => {
		const files = Array.from(event.target.files);
		if (files.length > 0) {
			setPreview(URL.createObjectURL(files[0]));
			onChange(name, files);
		}
	};

	useEffect(() => {
		if (reset) {
			setPreview(null);
			if (inputRef.current) {
				inputRef.current.value = ''; // Clear file input field
			}
		}
	}, [reset]);

	useEffect(() => {
		if (initialValue && initialValue.length > 0) {
			setPreview(URL.createObjectURL(initialValue[0]));
		}
	}, [initialValue]);

	return (
		<div className='w-full p-6 bg-gray-100 border-dashed border-[1px] border-gray-400 rounded-lg items-center mx-auto text-center'>
			<input
				id={name}
				type='file'
				accept='image/*'
				multiple
				className='hidden'
				onChange={handleFileChange}
				ref={inputRef}
			/>

			<label htmlFor={name} className='cursor-pointer'>
				{preview ? (
					<img src={preview} alt='Preview' className='max-h-48 rounded-lg mx-auto' />
				) : (
					<div>
						<FaImage className='w-8 h-8 text-gray-300 mx-auto mb-4' />
						<h5 className='mb-2 text-lg font-bold tracking-tight text-gray-700'>{label}</h5>
						<p className='font-custom text-xs md:text-sm text-gray-400 md:px-6'>
							Choose a photo, and it should be in{' '}
							<b className='text-gray-600'>
								JPG <span className='text-gray-400'>or</span> PNG.
							</b>{' '}
							format.
						</p>
					</div>
				)}
			</label>

			<div className='mt-4'>
				<label
					htmlFor={name}
					className='px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg cursor-pointer hover:bg-blue-500'
				>
					Choose Image
				</label>
			</div>
		</div>
	);
};

export default ImageUpload;
