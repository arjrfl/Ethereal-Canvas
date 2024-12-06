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
					localStorage.setItem('avatar', profileData.avatar);
				}
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
		<div className='text-sm md:text-base font-custom'>
			<div className='flex flex-col mb-8'>
				<h1 className='text-base md:text-lg lg:text-xl pb-1'>User Information</h1>{' '}
				<p className='text-xs font-light text-slate-600'>Personal details and edit profile</p>{' '}
			</div>

			{/* Avatar Section */}
			<div className='text-center flex items-center gap-5 mb-5'>
				<div className='w-32 h-32 md:w-36 md:h-36 rounded-xl flex items-center justify-center bg-gray-300 border-gray-300 overflow-hidden'>
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
						className='mt-2 bg-blue-500 text-sm text-white px-3 py-1 rounded-lg hover:bg-blue-600'
						disabled={isUploading}
					>
						{isUploading ? 'Uploading...' : 'Update Avatar'}
					</button>
				</div>
			</div>

			{/* Form Section */}
			<div>
				<form className='grid grid-cols-1'>
					<div className='grid grid-cols-1 py-4 gap-y-1 md:grid-cols-2 border-b-2 border-t-2'>
						<label htmlFor='firstName' className='text-gray-500 text-xs md:flex md:items-center'>
							First name
						</label>
						<input
							type='text'
							id='firstName'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
							className='bg-slate-200 px-3 py-2 rounded-md'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1 md:grid-cols-2 border-b-2'>
						<label htmlFor='lastName' className='text-gray-500 text-xs md:flex md:items-center'>
							Last name
						</label>
						<input
							type='text'
							id='lastName'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
							className='bg-slate-200 px-3 py-2 rounded-md'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1  md:grid-cols-2 border-b-2'>
						<label htmlFor='gender' className='text-gray-500 text-xs md:flex md:items-center'>
							Gender
						</label>
						<select
							id='gender'
							name='gender'
							value={formData.gender}
							onChange={handleChange}
							className='w-full bg-slate-200 px-3 py-2 rounded-md'
						>
							{' '}
							<option value='male'>Male</option> <option value='female'>Female</option>
							<option value='other'>Other</option>
						</select>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1  md:grid-cols-2 border-b-2'>
						<label htmlFor='dateOfBirth' className='text-gray-500 text-xs md:flex md:items-center'>
							Date of Birth
						</label>
						<input
							type='date'
							id='dateOfBirth'
							name='dateOfBirth'
							value={formData.dateOfBirth}
							onChange={handleChange}
							className='bg-slate-200 px-3 py-2 rounded-md'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1  md:grid-cols-2 border-b-2'>
						<label htmlFor='location' className='text-gray-500 text-xs md:flex md:items-center'>
							Location
						</label>
						<CityOrProvinceSelector
							value={formData.location}
							onChange={handleLocationChange}
							className='bg-slate-200 px-3 py-2 rounded-md'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1  md:grid-cols-2 border-b-2'>
						<label htmlFor='email' className='text-gray-500 text-xs md:flex md:items-center'>
							Email
						</label>
						<input
							type='text'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							className='bg-slate-200 px-3 py-2 rounded-md'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1  md:grid-cols-2 border-b-2'>
						<label htmlFor='phoneNumber' className='text-gray-500 text-xs md:flex md:items-center'>
							Phone Number
						</label>
						<input
							type='tel'
							id='phoneNumber'
							name='phoneNumber'
							value={formData.phoneNumber}
							onChange={handleChange}
							className='bg-slate-200 px-3 py-2 rounded-md'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1  md:grid-cols-2 border-b-2'>
						<label
							htmlFor='aboutYourself'
							className='text-gray-500 text-xs md:flex md:items-center'
						>
							About yourself
						</label>
						<textarea
							id='aboutYourself'
							name='aboutYourself'
							value={formData.aboutYourself}
							onChange={handleChange}
							className='bg-slate-200 px-3 py-2 rounded-md h-48'
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
