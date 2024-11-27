// import React, { useState } from 'react';

// const RegisterArtist = () => {
// 	const [firstName, setFirstName] = useState('');
// 	const [lastName, setLastName] = useState('');
// 	const [gender, setGender] = useState('');
// 	const [birthDate, setBirthDate] = useState('');
// 	const [email, setEmail] = useState('');
// 	const [phone, setPhone] = useState('');
// 	const [region, setRegion] = useState('');
// 	const [province, setProvince] = useState('');
// 	const [city, setCity] = useState('');
// 	const [aboutYourSelf, setAboutYourSelf] = useState('');
// 	const [avatar, setAvatar] = useState('');
// 	const [workspaceImg, setWorkspaceImg] = useState('');
// 	const [validId, setValidId] = useState('');
// 	const [selfieWithId, setSelfieWithId] = useState('');
// 	const [sharedDriveLink, setSharedDriveLink] = useState('');

// 	const handleSubmit = e => {
// 		e.preventDefault();

// 		if (password !== confirmPassword) {
// 			alert('Passwords do not match');
// 			return;
// 		}
// 		console.log('Registering artist with email:', email);
// 	};

// 	return <div className='container'></div>;
// };

// export default RegisterArtist;

////////////////////////////////////// THIS IS WORKING

import React, { useState } from 'react';

const RegisterArtist = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [avatar, setAvatar] = useState(null); // Use file object
	const [avatarUrl, setAvatarUrl] = useState('');
	const [isUploading, setIsUploading] = useState(false);

	const handleFileChange = e => {
		const file = e.target.files[0];
		if (file) {
			setAvatar(file);
		}
	};

	const uploadToCloudinary = async file => {
		setIsUploading(true);
		const formData = new FormData();
		formData.append('file', file);
		formData.append('cloud_name', 'ddeqjbdzb');
		formData.append('upload_preset', 'artist_avatar'); // Replace with your Cloudinary upload preset

		try {
			const response = await fetch('https://api.cloudinary.com/v1_1/ddeqjbdzb/image/upload', {
				method: 'POST',
				body: formData,
			});
			const data = await response.json();
			setAvatarUrl(data.secure_url); // Save the uploaded image URL
			setIsUploading(false);
		} catch (error) {
			console.error('Error uploading to Cloudinary:', error);
			setIsUploading(false);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();

		// Upload avatar to Cloudinary
		if (avatar) {
			await uploadToCloudinary(avatar);
		}

		const data = { firstName, lastName, email, avatar: avatarUrl };

		// Submit data to your backend
		console.log('Form submitted:', data);
	};

	return (
		<div className='container max-w-lg mx-auto py-8'>
			<h2 className='text-2xl font-bold mb-4'>Register as Artist</h2>

			<form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-lg'>
				<div className='w-full'>
					<label htmlFor='firstName' className='block mb-1'>
						First Name
					</label>
					<input
						id='firstName'
						type='text'
						placeholder='First Name'
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
						className='w-full p-2 border rounded'
						required
					/>
				</div>

				<div className='w-full'>
					<label htmlFor='lastName' className='block mb-1'>
						Last Name
					</label>
					<input
						id='lastName'
						type='text'
						placeholder='Last Name'
						value={lastName}
						onChange={e => setLastName(e.target.value)}
						className='w-full p-2 border rounded'
						required
					/>
				</div>

				<div className='w-full'>
					<label htmlFor='email' className='block mb-1'>
						Email
					</label>
					<input
						id='email'
						type='email'
						placeholder='Email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='w-full p-2 border rounded'
						required
					/>
				</div>

				<div className='w-full'>
					<label htmlFor='avatar' className='block mb-1'>
						Avatar
					</label>
					<input
						id='avatar'
						type='file'
						onChange={handleFileChange}
						className='w-full p-2 border rounded'
						accept='image/*'
						required
					/>
					{isUploading && <p className='text-blue-500 mt-2'>Uploading image...</p>}
				</div>

				{avatarUrl && (
					<div className='w-full mt-4'>
						<p className='text-green-500'>Image uploaded successfully!</p>
						<img src={avatarUrl} alt='Uploaded avatar' className='w-24 h-24 rounded-full' />
					</div>
				)}

				<button
					type='submit'
					className={`w-full py-2 rounded-lg mt-4 bg-blue-500 text-white ${
						isUploading ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					disabled={isUploading}
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterArtist;
