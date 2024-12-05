const SharedDrive = ({ register }) => {
	return (
		<div className='font-custom mb-8'>
			<h1 className='text-xl md:text-2xl lg:text-3xl mb-8'>Sample Artwork Submission</h1>

			<p>
				To complete your registration, we require artists to provide a short video demonstrating
				their artwork creation process and an image of the finished artwork.
			</p>

			<p className='mt-5 mb-3'>Please provide the following:</p>
			<ul className='flex flex-col gap-3 border-b-4 border-double pb-3'>
				<li>
					<p>
						1. <span className='font-semibold'>Short Video:</span> Create a video of yourself
						working on a sample artwork. The video should include:
					</p>
					<ul className='list-disc mt-2 mb-3 pl-4 md:pl-10 flex flex-col gap-2 '>
						<li>Clear footage of you actively creating the artwork.</li>
						<li>The duration of the video would be a minimum of 5 minutes.</li>
						<li>A time-lapse video is accepted, but the duration must be 5 minutes above.</li>
					</ul>
				</li>
				<li>
					<p>
						2. <span className='font-semibold'>Finished Artwork Image:</span> A clear image of the
						completed artwork.
					</p>
				</li>
				<li>
					<p>
						3. <span className='font-semibold'>Shared Drive Link:</span> Upload both the video and
						the image to a shared drive (e.g., Google Drive, Dropbox) and provide the shareable
						link.
					</p>
				</li>
			</ul>

			<p className='mt-5 mb-3'>Filename Guidelines:</p>
			<ul className='flex flex-col gap-3 border-b-4 border-double pb-3'>
				<li>
					<span className='font-semibold'>Video filename example:</span>
					<span className='italic font-mono text-neutral-500'> Lastname_ArtworkProcess.mp4</span>
				</li>
				<li>
					<span className='font-semibold'>Image filename example:</span>
					<span className='italic font-mono text-neutral-500'> Lastname_FinishedArtwork.jpg</span>
				</li>
			</ul>

			<p className='mt-5 mb-3'>Sharing a Drive Instructions:</p>
			<ul className='flex flex-col gap-3 border-b-4 border-double pb-3 mb-7'>
				<li>
					<span className='font-semibold'>Google Drive: </span>Upload the files to your Google
					Drive, right-click on the files, select "Get link," and set the access to "Anyone with the
					link can view."
				</li>
				<li>
					<span className='font-semibold'>Dropbox: </span>Upload the files to your Dropbox,
					right-click on the files, select "Share," then "Copy link," and ensure the link
					permissions are set to allow anyone with the link to view.
				</li>
				<li>You can choose either Google Drive or Dropbox to share your files.</li>
			</ul>

			<div className=''>
				<label htmlFor='sharedDrive' className='block pb-1'>
					Paste the drive link here:
				</label>
				<input
					type='text'
					id='sharedDrive'
					placeholder='Shared drive link'
					className='w-full px-4 py-3 border rounded text-sm'
					required
					{...register('sharedDrive')}
				/>
			</div>
		</div>
	);
};

export default SharedDrive;
