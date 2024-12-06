import axios from 'axios';
import ImageUpload from './UploadImage';

const DashboardArtistUploadArtwork = () => {
	// Handler for when an image is uploaded
	const handleImageChange = (name, files) => {
		console.log(`Image uploaded for ${name}:`, files);
		// You can handle the uploaded files here (e.g., upload to server or update state)
	};

	return (
		<div className='text-sm md:text-base font-custom'>
			<div>
				<h1 className='text-base md:text-lg lg:text-xl pb-1'>Upload Artwork</h1>
				<p className='text-xs font-light text-slate-600'>Request to upload your artwork</p>
			</div>

			<div>
				<form>
					<div>
						<label htmlFor='image-one'>Front view</label>
						<ImageUpload label='Front View' name='image-one' onChange={handleImageChange} />
					</div>
					<div>
						<label htmlFor='image-two'>Artwork image with materials</label>
						<ImageUpload label='With materials' name='image-two' onChange={handleImageChange} />
					</div>
					<div>
						<label htmlFor='image-three'>Selfie with the artwork</label>
						<ImageUpload
							label='Artist with artwork'
							name='image-three'
							onChange={handleImageChange}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DashboardArtistUploadArtwork;
