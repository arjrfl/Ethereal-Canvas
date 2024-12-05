import ImageUpload from './UploadImage';

const ValidIds = ({ setValue, getValues }) => {
	const handleImageChange = (name, file) => {
		setValue(name, file);
	};

	return (
		<div className='font-custom mb-8'>
			<h1 className='text-xl md:text-2xl lg:text-3xl mb-8'>ID Validation</h1>

			<p>
				To ensure the security and authenticity of our community, we require all artists to submit a
				valid and a selfie holding the same ID. This step is crucial to protect your account and
				maintain a trusted environment for all users.
			</p>

			<div className='mt-5 flex flex-col gap-3 mb-7'>
				<p className=''>Please provide the following:</p>
				<p className=''>
					1. <span className='font-semibold'>Valid ID:</span> A clear and legible image of your ID.
					Accepted forms of ID include any government-issued ID or a school ID.
				</p>
				<p className=''>
					2. <span className='font-semibold'>Selfie with ID:</span> A selfie in which you are
					holding the same ID next to your face. Ensure that both your face and the ID are clearly
					visible and that the details on the ID are legible.
				</p>
			</div>

			<div>
				<div className='grid grid-cols-1 gap-y-3 mb-8 md:grid-cols-12 md:gap-x-5 lg:grid-cols-12 lg:gap-x-10'>
					<div className='md:col-span-6'>
						<label htmlFor='validId'>Valid ID</label>
						<ImageUpload
							label='Valid ID Image'
							name='validId'
							onChange={handleImageChange}
							initialValue={getValues('validId')}
						/>
					</div>

					<div className='md:col-span-6'>
						<label htmlFor='selfieWithId'>Selfie with ID</label>
						<ImageUpload
							label='Selfie with Valid ID'
							name='selfieWithId'
							onChange={handleImageChange}
							initialValue={getValues('selfieWithId')}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ValidIds;
