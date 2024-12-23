import axios from 'axios';
import ImageUpload from './UploadImage';
import { useState } from 'react';

const DashboardArtistUploadArtwork = () => {
	const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ddeqjbdzb/image/upload';
	const UPLOAD_PRESETS = {
		frontView: 'request-artwork-img-frontView',
		artworkWithMaterials: 'request-artwork-img-artworkWithMaterials',
		selfieWithArtwork: 'request-artwork-img-selfieWithArtwork',
		angleOne: 'request-artwork-img-angleOne',
		angleTwo: 'request-artwork-img-angleTwo',
		angleThree: 'request-artwork-img-angleThree',
	};

	const [formData, setFormData] = useState({
		title: '',
		artistName: '',
		yearCreated: '',
		medium: '',
		dimension: '',
		description: '',
		display: '',
		price: '',
	});

	const handleInputChange = e => {
		const { name, value } = e.target;

		if (name === 'display' && value === 'museum') {
			setFormData(prevData => ({
				...prevData,
				[name]: value,
				price: '',
			}));
		} else {
			setFormData(prevData => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const [selectedFiles, setSelectedFiles] = useState({});
	const [loading, setLoading] = useState(false);

	const handleImageChange = (name, files) => {
		if (files && files[0]) {
			setSelectedFiles(prev => ({
				...prev,
				[name]: files[0],
			}));
			console.log(`Selected file for ${name}:`, files[0]);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const finalFormData = {
			...formData,
			price: formData.display === 'museum' ? null : formData.price,
		};

		setLoading(true);

		try {
			const accessToken = localStorage.getItem('accessToken');
			if (!accessToken) {
				throw new Error('No access token found. Please log in again.');
			}

			const uploadedFiles = {};

			for (const [name, file] of Object.entries(selectedFiles)) {
				const formData = new FormData();
				formData.append('file', file);
				formData.append('upload_preset', UPLOAD_PRESETS[name]);

				const cloudinaryResponse = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
				uploadedFiles[name] = cloudinaryResponse.data.secure_url;

				console.log(`Uploaded ${name} image URL:`, cloudinaryResponse.data.secure_url);
			}

			const payload = {
				...finalFormData,
				images: {
					frontView: uploadedFiles.frontView,
					artworkWithMaterials: uploadedFiles.artworkWithMaterials,
					selfieWithArtwork: uploadedFiles.selfieWithArtwork,
					angleOne: uploadedFiles.angleOne,
					angleTwo: uploadedFiles.angleTwo,
					angleThree: uploadedFiles.angleThree,
				},
			};

			console.log('Payload to server:', payload);

			const response = await axios.post(
				'http://localhost:5000/api/artist/dashboard-upload-artwork',
				payload,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log('Saved all data to the database:', response.data);
			alert('Artwork uploaded and saved successfully!');

			// Reset the form and images after successful submission
			setFormData({
				title: '',
				artistName: '',
				yearCreated: '',
				medium: '',
				dimension: '',
				description: '',
				display: '',
				price: '',
			});
			setSelectedFiles({});
		} catch (error) {
			console.error('Error uploading artwork:', error);

			if (error.response?.status === 401) {
				alert('Session expired. Please log in again.');
			} else {
				alert('An error occurred. Please try again.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='text-sm md:text-base font-custom'>
			<div className='mb-8'>
				<h1 className='text-base md:text-lg lg:text-xl pb-1'>Upload Artwork</h1>
				<p className='text-xs font-light text-slate-600'>Request to upload your artwork</p>
			</div>

			<div>
				<form onSubmit={handleSubmit}>
					<div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 mb-10 sm:gap-x-5  sm:content-start'>
						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='title' className='text-gray-500 text-xs'>
								Title
							</label>
							<input
								type='text'
								id='title'
								name='title'
								value={formData.title}
								onChange={handleInputChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							/>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='artistName' className='text-gray-500 text-xs'>
								Artist name
							</label>
							<input
								type='text'
								id='artistName'
								name='artistName'
								value={formData.artistName}
								onChange={handleInputChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							/>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='yearCreated' className='text-gray-500 text-xs'>
								Year created
							</label>
							<input
								type='text'
								id='yearCreated'
								name='yearCreated'
								value={formData.yearCreated}
								onChange={handleInputChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							/>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='medium' className='text-gray-500 text-xs'>
								Medium used
							</label>
							<select
								name='medium'
								id='medium'
								value={formData.medium}
								onChange={handleInputChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							>
								<option value='' disabled>
									Choose medium
								</option>
								<option value='Acrylic'>Acrylic</option>
								<option value='Chalk'>Chalk</option>
								<option value='Charcoal'>Charcoal</option>
								<option value='Colored Pencils'>Colored Pencils</option>
								<option value='Graphite Pencils'>Graphite Pencils</option>
								<option value='Oil Paint'>Oil Paint</option>
								<option value='Oil Pastels'>Oil Pastels</option>
								<option value='Pen and Ink'>Pen and Ink</option>
								<option value='Soft Pastels'>Soft Pastels</option>
								<option value='Tempera'>Tempera</option>
								<option value='Watercolor'>Watercolor</option>
							</select>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='dimension' className='text-gray-500 text-xs'>
								Dimensions
							</label>
							<input
								type='text'
								id='dimension'
								name='dimension'
								value={formData.dimension}
								onChange={handleInputChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							/>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='description' className='text-gray-500 text-xs'>
								Description
							</label>
							<textarea
								name='description'
								id='description'
								value={formData.description}
								onChange={handleInputChange}
								rows='3'
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							></textarea>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='display' className='text-gray-500 text-xs'>
								Display
							</label>
							<select
								name='display'
								id='display'
								value={formData.display}
								onChange={handleInputChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							>
								<option value='' disabled>
									Choose where to display
								</option>
								<option value='museum'>Museum</option>
								<option value='marketplace'>Marketplace</option>
							</select>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='price' className='text-gray-500 text-xs'>
								Price
							</label>
							<input
								type='number'
								name='price'
								value={formData.price}
								onChange={handleInputChange}
								disabled={formData.display === 'museum'}
								className={
									formData.display === 'museum'
										? 'hidden'
										: 'border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
								}
							/>
						</div>
					</div>

					{/* Image uploads */}
					<div className='grid grid-1 gap-y-6 sm:grid-cols-2 mb-10 sm:gap-x-5 sm:gap-y-5 sm:content-start'>
						<div className='flex flex-col gap-y-2'>
							<label htmlFor='frontView' className='text-gray-500 text-xs'>
								Front view
							</label>
							<ImageUpload
								label='Front View'
								name='frontView'
								onChange={handleImageChange}
								reset={!loading}
							/>
						</div>

						<div className='flex flex-col gap-y-2'>
							<label htmlFor='artworkWithMaterials' className='text-gray-500 text-xs'>
								Artwork image with materials
							</label>
							<ImageUpload
								label='With materials'
								name='artworkWithMaterials'
								onChange={handleImageChange}
								reset={!loading}
							/>
						</div>

						<div className='flex flex-col gap-y-2'>
							<label htmlFor='selfieWithArtwork' className='text-gray-500 text-xs'>
								Selfie with the artwork
							</label>
							<ImageUpload
								label='Artist with artwork'
								name='selfieWithArtwork'
								onChange={handleImageChange}
								reset={!loading}
							/>
						</div>

						<div className='flex flex-col gap-y-2'>
							<label htmlFor='angleOne' className='text-gray-500 text-xs'>
								Angle one
							</label>
							<ImageUpload
								label='Angle one'
								name='angleOne'
								onChange={handleImageChange}
								reset={!loading}
							/>
						</div>

						<div className='flex flex-col gap-y-2'>
							<label htmlFor='angleTwo' className='text-gray-500 text-xs'>
								Angle two
							</label>
							<ImageUpload
								label='Angle Two'
								name='angleTwo'
								onChange={handleImageChange}
								reset={!loading}
							/>
						</div>

						<div className='flex flex-col gap-y-2'>
							<label htmlFor='angleThree' className='text-gray-500 text-xs'>
								Angle three
							</label>
							<ImageUpload
								label='Angle Three'
								name='angleThree'
								onChange={handleImageChange}
								reset={!loading}
							/>
						</div>
					</div>
					{/* Submit Button */}
					<div className='flex sm:justify-end'>
						<button
							type='submit'
							className='px-4 py-2 w-full sm:w-auto bg-blue-600  text-white rounded-lg hover:bg-blue-600'
							disabled={loading}
						>
							{loading ? 'Uploading...' : 'Submit'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DashboardArtistUploadArtwork;
