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
			<div>
				<h1 className='text-base md:text-lg lg:text-xl pb-1'>Upload Artwork</h1>
				<p className='text-xs font-light text-slate-600'>Request to upload your artwork</p>
			</div>

			<div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='artistName'>Artist name</label>
						<input
							type='text'
							id='artistName'
							name='artistName'
							value={formData.artistName}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='yearCreated'>Year created</label>
						<input
							type='text'
							id='yearCreated'
							name='yearCreated'
							value={formData.yearCreated}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='medium'>Medium used</label>
						<input
							type='text'
							id='medium'
							name='medium'
							value={formData.medium}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='dimension'>Dimensions</label>
						<input
							type='text'
							id='dimension'
							name='dimension'
							value={formData.dimension}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='description'>Description</label>
						<textarea
							name='description'
							id='description'
							value={formData.description}
							onChange={handleInputChange}
						></textarea>
					</div>
					<div>
						<label htmlFor='display'>Display</label>
						<select
							name='display'
							id='display'
							value={formData.display}
							onChange={handleInputChange}
						>
							<option value='' disabled>
								Choose where to display
							</option>
							<option value='museum'>Museum</option>
							<option value='marketplace'>Marketplace</option>
						</select>
					</div>
					<div>
						<label htmlFor='price'>Price</label>
						<input
							type='number'
							name='price'
							value={formData.price}
							onChange={handleInputChange}
							disabled={formData.display === 'museum'}
						/>
					</div>

					{/* Image uploads */}
					<div>
						<label htmlFor='frontView'>Front view</label>
						<ImageUpload label='Front View' name='frontView' onChange={handleImageChange} />
					</div>
					<div>
						<label htmlFor='artworkWithMaterials'>Artwork image with materials</label>
						<ImageUpload
							label='With materials'
							name='artworkWithMaterials'
							onChange={handleImageChange}
						/>
					</div>
					<div>
						<label htmlFor='selfieWithArtwork'>Selfie with the artwork</label>
						<ImageUpload
							label='Artist with artwork'
							name='selfieWithArtwork'
							onChange={handleImageChange}
						/>
					</div>
					<div>
						<label htmlFor='angleOne'>Angle one</label>
						<ImageUpload label='Angle one' name='angleOne' onChange={handleImageChange} />
					</div>
					<div>
						<label htmlFor='angleTwo'>Angle two</label>
						<ImageUpload label='Angle Two' name='angleTwo' onChange={handleImageChange} />
					</div>
					<div>
						<label htmlFor='angleThree'>Angle three</label>
						<ImageUpload label='Angle Three' name='angleThree' onChange={handleImageChange} />
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
						disabled={loading} // Disable button while loading
					>
						{loading ? 'Uploading...' : 'Submit'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default DashboardArtistUploadArtwork;
