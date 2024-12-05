import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityOrProvinceSelector from './SelectorCityOrProvince';
import useAvatar from '../hooks/useAvatar';

const ArtistDashboardEditProfile = () => {
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
	});

	const {
		avatarContent,
		handleAvatarChange,
		updateAvatar,
		isUploading,
		avatarPreview,
		setAvatarPreview,
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
				});

				if (profileData.avatar) {
					setAvatarPreview(profileData.avatar);
				}
				console.log(profileData.avatar);
			} catch (error) {
				console.error('Error fetching profile:', error);
			}
		};
		fetchProfile();
	}, []);

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className='text-sm md:text-base font-custom my-4'>
			{/* Avatar Section */}
			<div className='text-center flex flex-col items-center gap-3 mb-5'>
				<div className='w-20 h-20 rounded-lg flex items-center justify-center bg-gray-300 border-2 border-gray-300 overflow-hidden'>
					{avatarPreview ? (
						<img src={avatarPreview} alt='Avatar' className='w-full h-full object-cover' />
					) : (
						avatarContent
					)}
				</div>

				<div className='flex flex-col items-center'>
					<label className='text-sm text-blue-500 cursor-pointer'>
						Choose Image
						<input type='file' accept='image/*' onChange={handleAvatarChange} className='hidden' />
					</label>
					<button
						type='button'
						onClick={updateAvatar}
						className='mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
						disabled={isUploading}
					>
						{isUploading ? 'Uploading...' : 'Update Avatar'}
					</button>
				</div>
			</div>

			{/* Form Section */}
			<div>
				<form className='grid grid-cols-1'>
					<div className='grid grid-cols-1 py-4 gap-y-1 border-t-2 md:grid-cols-2 '>
						<label htmlFor='firstName'>First name</label>{' '}
						<input
							type='text'
							id='firstName'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
							className='bg-transparent'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1 border-t-2 md:grid-cols-2 '>
						<label htmlFor='lastName'>Last name</label>
						<input
							type='text'
							id='lastName'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
							className='bg-transparent'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1 border-t-2 md:grid-cols-2 '>
						<label htmlFor='gender'>Gender</label>
						<select
							id='gender'
							name='gender'
							value={formData.gender}
							onChange={handleChange}
							className='w-40 bg-transparent'
						>
							{' '}
							<option value='male'>Male</option> <option value='female'>Female</option>
							<option value='other'>Other</option>
						</select>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1 border-t-2 md:grid-cols-2 '>
						<label htmlFor='dateOfBirth'>Date of Birth</label>
						<input
							type='date'
							id='dateOfBirth'
							name='dateOfBirth'
							value={formData.dateOfBirth}
							onChange={handleChange}
							className='bg-transparent'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1 border-t-2 md:grid-cols-2 '>
						<label htmlFor='location'>Location</label>
						<CityOrProvinceSelector
							value={formData.location}
							onChange={handleLocationChange}
							className='bg-transparent'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1 border-t-2 md:grid-cols-2 '>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							className='bg-transparent'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1 border-t-2 md:grid-cols-2 '>
						<label htmlFor='phoneNumber'>Phone Number</label>
						<input
							type='tel'
							id='phoneNumber'
							name='phoneNumber'
							value={formData.phoneNumber}
							onChange={handleChange}
							className='bg-transparent'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1 border-t-2 md:grid-cols-2 '>
						<label htmlFor='aboutYourself'>About yourself</label>
						<textarea
							id='aboutYourself'
							name='aboutYourself'
							value={formData.aboutYourself}
							onChange={handleChange}
							className='bg-transparent'
						></textarea>
					</div>
				</form>
				<button
					type='button'
					onClick={handleSubmit}
					className='mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
				>
					Confirm Changes
				</button>
			</div>
		</div>
	);
};

export default ArtistDashboardEditProfile;
