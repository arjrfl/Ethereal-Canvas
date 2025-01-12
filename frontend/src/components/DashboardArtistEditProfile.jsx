import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

import CityOrProvinceSelector from './SelectorCityOrProvince';
import PasswordUpdateForm from './UpdatePassword';
import useAvatar from '../hooks/useAvatar';

import { TbInfoHexagonFilled } from 'react-icons/tb';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';

const ArtistDashboardEditProfile = () => {
	const user = localStorage.getItem('id');
	const { refetchUserData } = useOutletContext();
	const [formData, setFormData] = useState({
		avatar: '',
		fullName: '',
		firstName: '',
		lastName: '',
		gender: '',
		dateOfBirth: '',
		location: '',
		email: '',
		phoneNumber: '',
		aboutYourself: '',
		socialLinks: ['', '', '', '', ''],
	});

	const {
		avatarContent,
		handleAvatarChange,
		updateAvatar,
		isUploading,
		avatarPreview,
		setAvatarPreview,
		removeAvatar,
	} = useAvatar(formData.avatar, formData.fullName, setFormData);

	const handleLocationChange = location => {
		setFormData(prev => ({ ...prev, location }));
	};

	const handleSubmit = async () => {
		try {
			const userId = localStorage.getItem('id');
			const accessToken = localStorage.getItem('accessToken');
			if (!userId || !accessToken) {
				console.error('No user ID or access token found');
				return;
			}
			const response = await axios.put(
				`http://localhost:5000/api/artist/dashboard-update-details`,
				{ ...formData, fullName: `${formData.firstName} ${formData.lastName}` },
				{ headers: { Authorization: `Bearer ${accessToken}` } }
			);
			if (response.status === 200) {
				const updatedUser = response.data.data;
				refetchUserData();
				localStorage.setItem('fullName', updatedUser.fullName);
				localStorage.setItem('email', updatedUser.email);
				alert('Profile updated successfully!');
			}
		} catch (error) {
			console.error('Error updating profile:', error);
			alert('Failed to update profile. Please try again.');
		}
	};

	useEffect(() => {
		const fetchProfile = async () => {
			const userId = localStorage.getItem('id');
			const accessToken = localStorage.getItem('accessToken');
			if (!userId || !accessToken) {
				console.error('No user ID or access token found');
				return;
			}
			try {
				const response = await axios.get(
					`http://localhost:5000/api/artist/dashboard-profile?id=${userId}`,
					{ headers: { Authorization: `Bearer ${accessToken}` } }
				);
				const profileData = response.data.data;
				const [firstName, lastName] = profileData.fullName.split(' ');
				const formattedDate = profileData.dateOfBirth
					? new Date(profileData.dateOfBirth).toISOString().split('T')[0]
					: '';

				setFormData({
					avatar: profileData.avatar,
					fullName: profileData.fullName,
					firstName: firstName,
					lastName: lastName,
					gender: profileData.gender,
					dateOfBirth: formattedDate,
					email: profileData.email,
					phoneNumber: profileData.phoneNumber,
					location: profileData.location,
					aboutYourself: profileData.aboutYourself,
					// Ensure socialLinks is always an array with five elements
					socialLinks:
						profileData.socialLinks && profileData.socialLinks.length > 0
							? [...profileData.socialLinks, '', '', '', ''].slice(0, 5)
							: ['', '', '', '', ''],
				});

				if (profileData.avatar) {
					setAvatarPreview(profileData.avatar);
					localStorage.setItem('avatar', profileData.avatar);
				}
			} catch (error) {
				console.error('Error fetching profile:', error);
			}
		};
		fetchProfile();
	}, []);

	const handleChange = e => {
		const { name, value } = e.target;

		if (name.startsWith('socialLink')) {
			const index = parseInt(name.replace('socialLink', ''));
			const newSocialLinks = [...formData.socialLinks];
			newSocialLinks[index] = value;
			setFormData({ ...formData, socialLinks: newSocialLinks });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	return (
		<div className='text-sm md:text-base font-custom p-10'>
			<div className='mb-8'>
				<div className='flex items-center gap-x-2 mb-1'>
					<h1 className='text-2xl text-slate-800 font-semibold'>Account Details</h1>
					<p className='text-2xl text-blue-500'>
						<TbInfoHexagonFilled />
					</p>
				</div>

				<p className='text-left text-xs'>Update your account details and password.</p>
			</div>

			<div className='grid grid-cols-2 items-start gap-x-20 gap-y-20'>
				<div className='col-span-1'>
					{/* Avatar Section */}
					<div className='col-span-1 text-center flex justify-self-center items-end gap-x-3 mb-10'>
						<div className='w-40 h-40 rounded-xl flex items-center justify-center bg-gray-300 border-gray-300 overflow-hidden'>
							{avatarPreview ? (
								<img src={avatarPreview} alt='Avatar' className='w-full h-full object-cover' />
							) : (
								avatarContent
							)}
						</div>

						<div className='flex flex-col items-center gap-1'>
							<label className='text-sm text-blue-500 cursor-pointer rounded'>
								{isUploading ? (
									<p className='text-sm'>Uploading...</p>
								) : (
									<p className='text-sm'>Change avatar</p>
								)}
								<input
									type='file'
									accept='image/*'
									onChange={handleAvatarChange}
									className='hidden'
								/>
							</label>

							<div className='w-full flex justify-around gap-2'>
								<button
									type='button'
									onClick={updateAvatar}
									className='bg-blue-500 text-xs w-full text-white py-1 rounded-md hover:bg-blue-600'
									disabled={isUploading}
								>
									<FaCheck className='mx-auto' />
								</button>

								<button
									type='button'
									onClick={removeAvatar}
									className=' bg-red-500 text-xs w-full text-white py-1 rounded-md hover:bg-red-600'
								>
									<FaRegTrashCan className='mx-auto'></FaRegTrashCan>
								</button>
							</div>
						</div>
					</div>

					{/* Form Section */}
					<form className='grid grid-cols-1 gap-y-6'>
						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='firstName' className='text-gray-500 text-xs'>
								First name
							</label>
							<input
								type='text'
								id='firstName'
								name='firstName'
								value={formData.firstName}
								onChange={handleChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							/>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='lastName' className='text-gray-500 text-xs'>
								Last name
							</label>
							<input
								type='text'
								id='lastName'
								name='lastName'
								value={formData.lastName}
								onChange={handleChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							/>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='gender' className='text-gray-500 text-xs'>
								Gender
							</label>
							<select
								id='gender'
								name='gender'
								value={formData.gender}
								onChange={handleChange}
								className='w-full border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							>
								{' '}
								<option value='male'>Male</option> <option value='female'>Female</option>
								<option value='other'>Other</option>
							</select>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='dateOfBirth' className='text-gray-500 text-xs'>
								Date of Birth
							</label>
							<input
								type='date'
								id='dateOfBirth'
								name='dateOfBirth'
								value={formData.dateOfBirth}
								onChange={handleChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							/>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='location' className='text-gray-500 text-xs'>
								Location
							</label>
							<CityOrProvinceSelector
								value={formData.location}
								onChange={handleLocationChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							/>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='email' className='text-gray-500 text-xs'>
								Email
							</label>
							<input
								type='text'
								id='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							/>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='phoneNumber' className='text-gray-500 text-xs'>
								Phone Number
							</label>
							<input
								type='tel'
								id='phoneNumber'
								name='phoneNumber'
								value={formData.phoneNumber}
								onChange={handleChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md'
							/>
						</div>

						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='aboutYourself' className='text-gray-500 text-xs'>
								About yourself
							</label>
							<textarea
								id='aboutYourself'
								name='aboutYourself'
								value={formData.aboutYourself}
								onChange={handleChange}
								className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md h-48'
							></textarea>
						</div>

						{/* Social Links Section */}
						<div className='grid grid-cols-1 gap-y-2 sm:content-start'>
							<label htmlFor='socialLinks' className='text-gray-500 text-xs'>
								Social Links
							</label>
							<div className='space-y-2'>
								{formData.socialLinks.map((link, index) => (
									<input
										key={index}
										type='url'
										id={`socialLink${index}`}
										name={`socialLink${index}`}
										value={link}
										onChange={handleChange}
										className='border-[1px] border-gray-300 bg-transparent px-3 py-2 rounded-md w-full'
										placeholder={link ? '' : `Enter Social Link ${index + 1}`} // Placeholder logic
									/>
								))}
							</div>
						</div>
					</form>
					<div className='flex sm:justify-end mt-10'>
						<button
							type='button'
							onClick={handleSubmit}
							className=' bg-blue-600 w-full rounded-lg sm:w-auto text-white px-4 py-2 hover:bg-blue-600'
						>
							Confirm Changes
						</button>
					</div>
				</div>

				{/* PASSWORD */}
				<div className='col-span-1 rounded-xl drop-shadow-md'>
					<PasswordUpdateForm
						endpoint={`/artist/update-password/${user}`}
						onSuccess={() => alert('Password changed successfully!')}
					/>
				</div>
			</div>
		</div>
	);
};

export default ArtistDashboardEditProfile;

///////////////////////////////////

// import { useOutletContext } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { axiosInstancePrivate } from '../utils/axiosConfig';

// import useFetchUserData from '../hooks/useFetchUserData';
// import useAvatar from '../hooks/useAvatar';

// const ArtistDashboardEditProfile = () => {
// 	const user = localStorage.getItem('id');
// 	const { refetchUserData } = useOutletContext();
// 	const { userData } = useFetchUserData(`/artist/dashboard-profile?id=${user}`);

// 	const [formData, setFormData] = useState({
// 		avatar: '',
// 		fullName: '',
// 		gender: '',
// 		email: '',
// 		dateOfBirth: '',
// 		location: '',
// 		phoneNumber: '',
// 		aboutYourself: '',
// 		socialLinks: ['', '', '', '', ''],
// 	});

// 	const [previewAvatar, setPreviewAvatar] = useState('');
// 	const [isInitialized, setIsInitialized] = useState(false); // Track initialization

// 	useEffect(() => {
// 		if (userData && userData.data) {
// 			setFormData({
// 				avatar: userData.data.avatar || '',
// 				fullName: userData.data.fullName || '',
// 				gender: userData.data.gender || '',
// 				email: userData.data.email || '',
// 				dateOfBirth: userData.data.dateOfBirth ? userData.data.dateOfBirth.split('T')[0] : '',
// 				location: userData.data.location || '',
// 				phoneNumber: userData.data.phoneNumber || '',
// 				aboutYourself: userData.data.aboutYourself || '',
// 				socialLinks:
// 					userData.data.socialLinks && userData.data.socialLinks.length > 0
// 						? userData.data.socialLinks.slice(0, 5)
// 						: ['', '', '', '', ''],
// 			});

// 			setPreviewAvatar(userData.data.avatar || ''); // Set avatar preview
// 			setIsInitialized(true); // Set initialization flag to true
// 		}
// 	}, [userData]);

// 	// Call useAvatar hook unconditionally
// 	const { avatar, avatarPreview, isUploading, handleAvatarChange, updateAvatar, removeAvatar } =
// 		useAvatar(formData.avatar, 'Full Name', setFormData);

// 	useEffect(() => {
// 		// Update preview when formData.avatar changes
// 		if (formData.avatar !== previewAvatar) {
// 			setPreviewAvatar(formData.avatar);
// 		}
// 	}, [formData.avatar, previewAvatar]);

// 	const handleInputChange = e => {
// 		const { name, value } = e.target;
// 		setFormData(prevState => ({ ...prevState, [name]: value }));
// 	};

// 	const handleSocialLinkChange = (index, value) => {
// 		setFormData(prevState => {
// 			const updatedLinks = [...prevState.socialLinks];
// 			updatedLinks[index] = value;
// 			return { ...prevState, socialLinks: updatedLinks };
// 		});
// 	};

// 	const handleSubmit = async e => {
// 		e.preventDefault();

// 		try {
// 			const accessToken = localStorage.getItem('accessToken');

// 			// Check if the avatar was updated
// 			if (avatar !== previewAvatar) {
// 				// Call the updateAvatar function from the useAvatar hook to update the avatar
// 				await updateAvatar();
// 			}

// 			// Now submit the rest of the form data (excluding avatar)
// 			await axiosInstancePrivate.put(`/artist/dashboard-update-details`, formData, {
// 				headers: { Authorization: `Bearer ${accessToken}` },
// 			});

// 			refetchUserData();
// 			alert('Profile updated successfully!');
// 		} catch (err) {
// 			console.error('Error updating profile:', err);
// 			alert('Failed to update profile.');
// 		}
// 	};

// 	return (
// 		<div className='text-sm md:text-base font-custom'>
// 			<div className='mb-8 border-b-2 border-gray-200 pb-3'>
// 				<h1 className='text-base md:text-lg lg:text-xl pb-1'>User Information</h1>
// 				<p className='text-xs font-light text-slate-600'>Personal details and edit profile</p>
// 			</div>

// 			<div>
// 				{/* Form Section */}
// 				<div className='col-span-1'>
// 					<form onSubmit={handleSubmit}>
// 						<div>
// 							<label>Full Name:</label>
// 							<input
// 								type='text'
// 								name='fullName'
// 								value={formData.fullName}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Gender:</label>
// 							<select
// 								name='gender'
// 								value={formData.gender}
// 								onChange={handleInputChange}
// 								className='appearance-none'
// 							>
// 								<option value='male'>Male</option>
// 								<option value='female'>Female</option>
// 								<option value='other'>Other</option>
// 							</select>
// 						</div>

// 						<div>
// 							<label>Email:</label>
// 							<input
// 								type='email'
// 								name='email'
// 								value={formData.email}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Date of Birth:</label>
// 							<input
// 								type='date'
// 								name='dateOfBirth'
// 								value={formData.dateOfBirth}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Location:</label>
// 							<input
// 								type='text'
// 								name='location'
// 								value={formData.location}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Phone Number:</label>
// 							<input
// 								type='text'
// 								name='phoneNumber'
// 								value={formData.phoneNumber}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>About yourself:</label>
// 							<textarea
// 								id='aboutYourself'
// 								name='aboutYourself'
// 								value={formData.aboutYourself}
// 								onChange={handleInputChange}
// 							></textarea>
// 						</div>

// 						<div>
// 							<label>Social Links:</label>
// 							<div>
// 								{formData.socialLinks.map((link, index) => (
// 									<input
// 										key={index}
// 										type='url'
// 										id={`socialLink${index}`}
// 										value={link}
// 										onChange={e => handleSocialLinkChange(index, e.target.value)}
// 										placeholder={link ? '' : `Enter Social Link ${index + 1}`}
// 									/>
// 								))}
// 							</div>
// 						</div>

// 						{/* Avatar upload */}
// 						<div>
// 							<label>Avatar</label>
// 							<input type='file' onChange={handleAvatarChange} />
// 							{isUploading && <p>Uploading...</p>}
// 							{avatarPreview && <img src={avatarPreview} alt='Avatar preview' />}
// 						</div>
// 						<button type='button' onClick={updateAvatar} disabled={isUploading}>
// 							Update Avatar
// 						</button>
// 						<button type='button' onClick={removeAvatar}>
// 							Remove Avatar
// 						</button>

// 						<button type='submit' className='bg-blue-200 px-3 py-1'>
// 							Save Changes
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ArtistDashboardEditProfile;

// const ArtistDashboardEditProfile = () => {
// 	const user = localStorage.getItem('id');
// 	const { refetchUserData } = useOutletContext();
// 	const { userData } = useFetchUserData(`/artist/dashboard-profile?id=${user}`);

// 	const [formData, setFormData] = useState({
// 		avatar: '',
// 		fullName: '',
// 		gender: '',
// 		email: '',
// 		dateOfBirth: '',
// 		location: '',
// 		phoneNumber: '',
// 		aboutYourself: '',
// 		socialLinks: ['', '', '', '', ''],
// 	});

// 	const [previewAvatar, setPreviewAvatar] = useState('');
// 	const [isInitialized, setIsInitialized] = useState(false); // Track initialization

// 	useEffect(() => {
// 		if (userData && userData.data) {
// 			setFormData({
// 				avatar: userData.data.avatar || '',
// 				fullName: userData.data.fullName || '',
// 				gender: userData.data.gender || '',
// 				email: userData.data.email || '',
// 				dateOfBirth: userData.data.dateOfBirth ? userData.data.dateOfBirth.split('T')[0] : '',
// 				location: userData.data.location || '',
// 				phoneNumber: userData.data.phoneNumber || '',
// 				aboutYourself: userData.data.aboutYourself || '',
// 				socialLinks:
// 					userData.data.socialLinks && userData.data.socialLinks.length > 0
// 						? userData.data.socialLinks.slice(0, 5)
// 						: ['', '', '', '', ''],
// 			});

// 			setPreviewAvatar(userData.data.avatar || ''); // Set avatar preview
// 			setIsInitialized(true); // Set initialization flag to true
// 		}
// 	}, [userData]);

// 	const { avatar, avatarPreview, isUploading, handleAvatarChange, updateAvatar, removeAvatar } =
// 		isInitialized ? useAvatar(formData.avatar, 'Full Name', setFormData) : {}; // Only call useAvatar once initialized

// 	const handleInputChange = e => {
// 		const { name, value } = e.target;
// 		setFormData(prevState => ({ ...prevState, [name]: value }));
// 	};

// 	const handleSocialLinkChange = (index, value) => {
// 		setFormData(prevState => {
// 			const updatedLinks = [...prevState.socialLinks];
// 			updatedLinks[index] = value;
// 			return { ...prevState, socialLinks: updatedLinks };
// 		});
// 	};

// 	const handleSubmit = async e => {
// 		e.preventDefault();

// 		try {
// 			const accessToken = localStorage.getItem('accessToken');

// 			// Check if the avatar was updated
// 			if (avatar !== previewAvatar) {
// 				// Call the updateAvatar function from the useAvatar hook to update the avatar
// 				await updateAvatar();
// 			}

// 			// Now submit the rest of the form data (excluding avatar)
// 			await axiosInstancePrivate.put(`/artist/dashboard-update-details`, formData, {
// 				headers: { Authorization: `Bearer ${accessToken}` },
// 			});

// 			refetchUserData();
// 			alert('Profile updated successfully!');
// 		} catch (err) {
// 			console.error('Error updating profile:', err);
// 			alert('Failed to update profile.');
// 		}
// 	};

// 	return (
// 		<div className='text-sm md:text-base font-custom'>
// 			<div className='mb-8 border-b-2 border-gray-200 pb-3'>
// 				<h1 className='text-base md:text-lg lg:text-xl pb-1'>User Information</h1>
// 				<p className='text-xs font-light text-slate-600'>Personal details and edit profile</p>
// 			</div>

// 			<div>
// 				{/* Form Section */}
// 				<div className='col-span-1'>
// 					<form onSubmit={handleSubmit}>
// 						<div>
// 							<label>Full Name:</label>
// 							<input
// 								type='text'
// 								name='fullName'
// 								value={formData.fullName}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Gender:</label>
// 							<select
// 								name='gender'
// 								value={formData.gender}
// 								onChange={handleInputChange}
// 								className='appearance-none'
// 							>
// 								<option value='male'>Male</option>
// 								<option value='female'>Female</option>
// 								<option value='other'>Other</option>
// 							</select>
// 						</div>

// 						<div>
// 							<label>Email:</label>
// 							<input
// 								type='email'
// 								name='email'
// 								value={formData.email}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Date of Birth:</label>
// 							<input
// 								type='date'
// 								name='dateOfBirth'
// 								value={formData.dateOfBirth}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Location:</label>
// 							<input
// 								type='text'
// 								name='location'
// 								value={formData.location}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Phone Number:</label>
// 							<input
// 								type='text'
// 								name='phoneNumber'
// 								value={formData.phoneNumber}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>About yourself:</label>
// 							<textarea
// 								id='aboutYourself'
// 								name='aboutYourself'
// 								value={formData.aboutYourself}
// 								onChange={handleInputChange}
// 							></textarea>
// 						</div>

// 						<div>
// 							<label>Social Links:</label>
// 							<div>
// 								{formData.socialLinks.map((link, index) => (
// 									<input
// 										key={index}
// 										type='url'
// 										id={`socialLink${index}`}
// 										value={link}
// 										onChange={e => handleSocialLinkChange(index, e.target.value)}
// 										placeholder={link ? '' : `Enter Social Link ${index + 1}`}
// 									/>
// 								))}
// 							</div>
// 						</div>

// 						{/* Avatar upload */}
// 						<div>
// 							<label>Avatar</label>
// 							<input type='file' onChange={handleAvatarChange} />
// 							{isUploading && <p>Uploading...</p>}
// 							{avatarPreview && <img src={avatarPreview} alt='Avatar preview' />}
// 						</div>
// 						<button type='button' onClick={updateAvatar} disabled={isUploading}>
// 							Update Avatar
// 						</button>
// 						<button type='button' onClick={removeAvatar}>
// 							Remove Avatar
// 						</button>

// 						<button type='submit'>Save Changes</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ArtistDashboardEditProfile;

// const ArtistDashboardEditProfile = () => {
// 	const user = localStorage.getItem('id');
// 	const { refetchUserData } = useOutletContext();
// 	const { userData, loading, error } = useFetchUserData(`/artist/dashboard-profile?id=${user}`);

// 	// Using useAvatar hook to manage avatar state
// 	const { avatar, setAvatar, previewAvatar, setPreviewAvatar } = useAvatar();

// 	const [formData, setFormData] = useState({
// 		avatar: '',
// 		fullName: '',
// 		gender: '',
// 		email: '',
// 		dateOfBirth: '',
// 		location: '',
// 		phoneNumber: '',
// 		aboutYourself: '',
// 		socialLinks: ['', '', '', '', ''],
// 	});

// 	useEffect(() => {
// 		if (userData && userData.data) {
// 			setFormData({
// 				avatar: userData.data.avatar || '',
// 				fullName: userData.data.fullName || '',
// 				gender: userData.data.gender || '',
// 				email: userData.data.email || '',
// 				dateOfBirth: userData.data.dateOfBirth ? userData.data.dateOfBirth.split('T')[0] : '',
// 				location: userData.data.location || '',
// 				phoneNumber: userData.data.phoneNumber || '',
// 				aboutYourself: userData.data.aboutYourself || '',
// 				socialLinks:
// 					userData.data.socialLinks && userData.data.socialLinks.length > 0
// 						? userData.data.socialLinks.slice(0, 5) // Use the first 5 links only
// 						: ['', '', '', '', ''],
// 			});

// 			setPreviewAvatar(userData.data.avatar || ''); // Set avatar preview
// 		}
// 	}, [userData]);

// 	const handleInputChange = e => {
// 		const { name, value } = e.target;
// 		setFormData(prevState => ({ ...prevState, [name]: value }));
// 	};

// 	const handleSocialLinkChange = (index, value) => {
// 		setFormData(prevState => {
// 			const updatedLinks = [...prevState.socialLinks];
// 			updatedLinks[index] = value;
// 			return { ...prevState, socialLinks: updatedLinks };
// 		});
// 	};

// 	const handleSubmit = async e => {
// 		e.preventDefault();

// 		try {
// 			const accessToken = localStorage.getItem('accessToken');

// 			await axiosInstancePrivate.put(`/artist/dashboard-update-details`, formData, {
// 				headers: { Authorization: `Bearer ${accessToken}` },
// 			});

// 			refetchUserData();

// 			alert('Profile updated successfully!');
// 		} catch (err) {
// 			console.error('Error updating profile:', err);
// 			alert('Failed to update profile.');
// 		}
// 	};

// 	return (
// 		<div className='text-sm md:text-base font-custom'>
// 			<div className='mb-8 border-b-2 border-gray-200 pb-3'>
// 				<h1 className='text-base md:text-lg lg:text-xl pb-1'>User Information</h1>
// 				<p className='text-xs font-light text-slate-600'>Personal details and edit profile</p>
// 			</div>

// 			<div>
// 				{/* Form Section */}
// 				<div className='col-span-1'>
// 					<form onSubmit={handleSubmit}>
// 						<div>
// 							<label>Full Name:</label>
// 							<input
// 								type='text'
// 								name='fullName'
// 								value={formData.fullName}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Gender:</label>
// 							<select
// 								name='gender'
// 								value={formData.gender}
// 								onChange={handleInputChange}
// 								className='appearance-none'
// 							>
// 								<option value='male'>Male</option>
// 								<option value='female'>Female</option>
// 								<option value='other'>Other</option>
// 							</select>
// 						</div>

// 						<div>
// 							<label>Email:</label>
// 							<input
// 								type='email'
// 								name='email'
// 								value={formData.email}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Date of Birth:</label>
// 							<input
// 								type='date'
// 								name='dateOfBirth'
// 								value={formData.dateOfBirth}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Location:</label>
// 							<input
// 								type='text'
// 								name='location'
// 								value={formData.location}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Phone Number:</label>
// 							<input
// 								type='text'
// 								name='phoneNumber'
// 								value={formData.phoneNumber}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>About yourself:</label>
// 							<textarea
// 								id='aboutYourself'
// 								name='aboutYourself'
// 								value={formData.aboutYourself}
// 								onChange={handleInputChange}
// 							></textarea>
// 						</div>

// 						<div>
// 							<label>Social Links:</label>
// 							<div>
// 								{formData.socialLinks.map((link, index) => (
// 									<input
// 										key={index}
// 										type='url'
// 										id={`socialLink${index}`}
// 										value={link}
// 										onChange={e => handleSocialLinkChange(index, e.target.value)}
// 										placeholder={link ? '' : `Enter Social Link ${index + 1}`}
// 									/>
// 								))}
// 							</div>
// 						</div>

// 						{/* Avatar upload */}
// 						<div>
// 							<label>Avatar:</label>
// 							<input
// 								type='file'
// 								accept='image/*'
// 								onChange={e => setAvatar(e.target.files[0])} // Use the setAvatar from useAvatar
// 							/>
// 							{previewAvatar && <img src={previewAvatar} alt='Avatar Preview' />}
// 						</div>

// 						<button type='submit'>Save Changes</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ArtistDashboardEditProfile;

// const ArtistDashboardEditProfile = () => {
// 	const user = localStorage.getItem('id');
// 	const { refetchUserData } = useOutletContext();
// 	const { userData } = useFetchUserData(`/artist/dashboard-profile?id=${user}`);

// 	// Using useAvatar hook to manage avatar state
// 	const { avatar, avatarPreview, isUploading, handleAvatarChange, updateAvatar, removeAvatar } =
// 		useAvatar(formData.avatar, 'Full Name', setFormData);

// 	const [formData, setFormData] = useState({
// 		avatar: '',
// 		fullName: '',
// 		gender: '',
// 		email: '',
// 		dateOfBirth: '',
// 		location: '',
// 		phoneNumber: '',
// 		aboutYourself: '',
// 		socialLinks: ['', '', '', '', ''],
// 	});

// 	useEffect(() => {
// 		if (userData && userData.data) {
// 			setFormData({
// 				avatar: userData.data.avatar || '',
// 				fullName: userData.data.fullName || '',
// 				gender: userData.data.gender || '',
// 				email: userData.data.email || '',
// 				dateOfBirth: userData.data.dateOfBirth ? userData.data.dateOfBirth.split('T')[0] : '',
// 				location: userData.data.location || '',
// 				phoneNumber: userData.data.phoneNumber || '',
// 				aboutYourself: userData.data.aboutYourself || '',
// 				socialLinks:
// 					userData.data.socialLinks && userData.data.socialLinks.length > 0
// 						? userData.data.socialLinks.slice(0, 5)
// 						: ['', '', '', '', ''],
// 			});

// 			setPreviewAvatar(userData.data.avatar || ''); // Set avatar preview
// 		}
// 	}, [userData, setPreviewAvatar]);

// 	const handleInputChange = e => {
// 		const { name, value } = e.target;
// 		setFormData(prevState => ({ ...prevState, [name]: value }));
// 	};

// 	const handleSocialLinkChange = (index, value) => {
// 		setFormData(prevState => {
// 			const updatedLinks = [...prevState.socialLinks];
// 			updatedLinks[index] = value;
// 			return { ...prevState, socialLinks: updatedLinks };
// 		});
// 	};

// 	const handleSubmit = async e => {
// 		e.preventDefault();

// 		try {
// 			const accessToken = localStorage.getItem('accessToken');

// 			// Check if the avatar was updated
// 			if (avatar !== previewAvatar) {
// 				// Call the updateAvatar function from the useAvatar hook to update the avatar
// 				await updateAvatar();
// 			}

// 			// Now submit the rest of the form data (excluding avatar)
// 			await axiosInstancePrivate.put(`/artist/dashboard-update-details`, formData, {
// 				headers: { Authorization: `Bearer ${accessToken}` },
// 			});

// 			refetchUserData();
// 			alert('Profile updated successfully!');
// 		} catch (err) {
// 			console.error('Error updating profile:', err);
// 			alert('Failed to update profile.');
// 		}
// 	};

// 	return (
// 		<div className='text-sm md:text-base font-custom'>
// 			<div className='mb-8 border-b-2 border-gray-200 pb-3'>
// 				<h1 className='text-base md:text-lg lg:text-xl pb-1'>User Information</h1>
// 				<p className='text-xs font-light text-slate-600'>Personal details and edit profile</p>
// 			</div>

// 			<div>
// 				{/* Form Section */}
// 				<div className='col-span-1'>
// 					<form onSubmit={handleSubmit}>
// 						<div>
// 							<label>Full Name:</label>
// 							<input
// 								type='text'
// 								name='fullName'
// 								value={formData.fullName}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Gender:</label>
// 							<select
// 								name='gender'
// 								value={formData.gender}
// 								onChange={handleInputChange}
// 								className='appearance-none'
// 							>
// 								<option value='male'>Male</option>
// 								<option value='female'>Female</option>
// 								<option value='other'>Other</option>
// 							</select>
// 						</div>

// 						<div>
// 							<label>Email:</label>
// 							<input
// 								type='email'
// 								name='email'
// 								value={formData.email}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Date of Birth:</label>
// 							<input
// 								type='date'
// 								name='dateOfBirth'
// 								value={formData.dateOfBirth}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Location:</label>
// 							<input
// 								type='text'
// 								name='location'
// 								value={formData.location}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>Phone Number:</label>
// 							<input
// 								type='text'
// 								name='phoneNumber'
// 								value={formData.phoneNumber}
// 								onChange={handleInputChange}
// 							/>
// 						</div>

// 						<div>
// 							<label>About yourself:</label>
// 							<textarea
// 								id='aboutYourself'
// 								name='aboutYourself'
// 								value={formData.aboutYourself}
// 								onChange={handleInputChange}
// 							></textarea>
// 						</div>

// 						<div>
// 							<label>Social Links:</label>
// 							<div>
// 								{formData.socialLinks.map((link, index) => (
// 									<input
// 										key={index}
// 										type='url'
// 										id={`socialLink${index}`}
// 										value={link}
// 										onChange={e => handleSocialLinkChange(index, e.target.value)}
// 										placeholder={link ? '' : `Enter Social Link ${index + 1}`}
// 									/>
// 								))}
// 							</div>
// 						</div>

// 						{/* Avatar upload */}
// 						<div>
// 							<label>Avatar</label>
// 							<input type='file' onChange={handleAvatarChange} />
// 							{isUploading && <p>Uploading...</p>}
// 							{avatarPreview && <img src={avatarPreview} alt='Avatar preview' />}
// 						</div>
// 						<button type='button' onClick={updateAvatar} disabled={isUploading}>
// 							Update Avatar
// 						</button>
// 						<button type='button' onClick={removeAvatar}>
// 							Remove Avatar
// 						</button>

// 						<button type='submit'>Save Changes</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ArtistDashboardEditProfile;
