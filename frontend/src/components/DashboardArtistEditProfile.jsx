import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CityOrProvinceSelector from './SelectorCityOrProvince';
import { useAvatar } from '../hooks/useAvatar';

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

	const avatarContent = useAvatar(formData.avatar, formData.fullName);

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
				{
					...formData,
					fullName: `${formData.firstName} ${formData.lastName}`,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				const updatedUser = response.data.data;

				localStorage.setItem('fullName', updatedUser.fullName);
				localStorage.setItem('email', updatedUser.email);
				localStorage.setItem('avatar', updatedUser.avatar);

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
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
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
			} catch (error) {
				console.error('Error fetching profile:', error);
			}
		};

		fetchProfile();
	}, []);

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='text-sm md:text-base font-custom my-4'>
			<div className='flex flex-col mb-5'>
				<h1 className='text-base md:text-lg pb-1'>User Information</h1>
				<p className='text-xs font-light text-slate-600'>Personal details and edit profile</p>
			</div>

			<div className='text-center flex gap-5 mb-5'>
				<div className='w-20 h-20 flex-shrink-0 rounded-lg flex items-center justify-center bg-gray-300 text-white font-bold border-2 border-gray-300'>
					{avatarContent}
				</div>
				<div className='flex flex-col items-start justify-center'>
					<h1 className='text-base'>{`${formData.firstName} ${formData.lastName}` || 'My Name'}</h1>
					<p className='text-xs'>{formData.email || 'My Email'}</p>
				</div>
			</div>

			<div>
				<form className='grid grid-cols-1'>
					<div className='grid grid-cols-1 py-4 gap-y-1 border-t-2 md:grid-cols-2 '>
						<label htmlFor='firstName'>First name</label>
						<input
							type='text'
							id='firstName'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
							className='bg-transparent'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
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
					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
						<label htmlFor='gender'>Gender</label>
						<select
							id='gender'
							name='gender'
							value={formData.gender}
							onChange={handleChange}
							className='w-40 bg-transparent'
						>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
							<option value='other'>Other</option>
						</select>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
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
					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
						<label htmlFor='location'>Location</label>
						<CityOrProvinceSelector
							value={formData.location}
							onChange={handleLocationChange}
							className='bg-transparent'
						/>
					</div>
					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
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
					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
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
					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
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

// const ArtistDashboardEditProfile = () => {
// 	const [formData, setFormData] = useState({
// 		avatar: '',
// 		fullName: '',
// 		firstName: '',
// 		lastName: '',
// 		gender: '',
// 		dateOfBirth: '',
// 		location: '',
// 		email: '',
// 		phoneNumber: '',
// 		aboutYourself: '',
// 	});

// 	const avatarContent = useAvatar(formData.avatar, formData.fullName);

// 	const handleLocationChange = location => {
// 		setFormData(prev => ({ ...prev, location }));
// 	};

// 	useEffect(() => {
// 		const fetchProfile = async () => {
// 			const userId = localStorage.getItem('id');
// 			const accessToken = localStorage.getItem('accessToken');

// 			if (!userId || !accessToken) {
// 				console.error('No user ID or access token found');
// 				return;
// 			}

// 			try {
// 				const response = await axios.get(
// 					`http://localhost:5000/api/artist/dashboard-profile?id=${userId}`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${accessToken}`,
// 						},
// 					}
// 				);

// 				const profileData = response.data.data;
// 				const [firstName, lastName] = profileData.fullName.split(' ');

// 				// Format dateOfBirth to yyyy-MM-dd
// 				const formattedDate = profileData.dateOfBirth
// 					? new Date(profileData.dateOfBirth).toISOString().split('T')[0]
// 					: '';

// 				setFormData({
// 					avatar: profileData.avatar,
// 					fullName: profileData.fullName,
// 					firstName: firstName,
// 					lastName: lastName,
// 					gender: profileData.gender,
// 					dateOfBirth: formattedDate,
// 					email: profileData.email,
// 					phoneNumber: profileData.phoneNumber,
// 					location: profileData.location,
// 					aboutYourself: profileData.aboutYourself,
// 				});
// 			} catch (error) {
// 				console.error('Error fetching profile:', error);
// 			}
// 		};

// 		fetchProfile();
// 	}, []);

// 	const handleChange = e => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	return (
// 		<div className='text-sm md:text-base font-custom my-4'>
// 			<div className='flex flex-col mb-5'>
// 				<h1 className='text-base md:text-lg pb-1'>User Information</h1>
// 				<p className='text-xs font-light text-slate-600'>Personal details and edit profile</p>
// 			</div>

// 			<div className='text-center flex gap-5 mb-5'>
// 				<div className='w-20 h-20 flex-shrink-0 rounded-lg flex items-center justify-center bg-gray-300 text-white font-bold border-2 border-gray-300'>
// 					{avatarContent}
// 				</div>
// 				<div className='flex flex-col items-start justify-center'>
// 					<h1 className='text-base'>{`${formData.firstName} ${formData.lastName}` || 'My Name'}</h1>
// 					<p className='text-xs'>{formData.email || 'My Email'}</p>
// 				</div>
// 			</div>

// 			<div>
// 				<form className='grid grid-cols-1'>
// 					<div className='grid grid-cols-1 py-4 gap-y-1 border-t-2 md:grid-cols-2 '>
// 						<label htmlFor='firstName'>First name</label>
// 						<input
// 							type='text'
// 							id='firstName'
// 							name='firstName'
// 							value={formData.firstName}
// 							onChange={handleChange}
// 							className='bg-transparent'
// 						/>
// 					</div>
// 					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
// 						<label htmlFor='lastName'>Last name</label>
// 						<input
// 							type='text'
// 							id='lastName'
// 							name='lastName'
// 							value={formData.lastName}
// 							onChange={handleChange}
// 							className='bg-transparent'
// 						/>
// 					</div>
// 					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
// 						<label htmlFor='gender'>Gender</label>
// 						<select
// 							id='gender'
// 							name='gender'
// 							value={formData.gender}
// 							onChange={handleChange}
// 							className='w-40 bg-transparent'
// 						>
// 							<option value='male'>Male</option>
// 							<option value='female'>Female</option>
// 							<option value='other'>Other</option>
// 						</select>
// 					</div>
// 					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
// 						<label htmlFor='dateOfBirth'>Date of Birth</label>
// 						<input
// 							type='date'
// 							id='dateOfBirth'
// 							name='dateOfBirth'
// 							value={formData.dateOfBirth}
// 							onChange={handleChange}
// 							className='bg-transparent'
// 						/>
// 					</div>
// 					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
// 						<label htmlFor='location'>Location</label>
// 						<CityOrProvinceSelector
// 							value={formData.location}
// 							onChange={handleLocationChange}
// 							className='bg-transparent'
// 						/>
// 					</div>
// 					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
// 						<label htmlFor='email'>Email</label>
// 						<input
// 							type='text'
// 							id='email'
// 							name='email'
// 							value={formData.email}
// 							onChange={handleChange}
// 							className='bg-transparent'
// 						/>
// 					</div>
// 					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
// 						<label htmlFor='phoneNumber'>Phone Number</label>
// 						<input
// 							type='tel'
// 							id='phoneNumber'
// 							name='phoneNumber'
// 							value={formData.phoneNumber}
// 							onChange={handleChange}
// 							className='bg-transparent'
// 						/>
// 					</div>
// 					<div className='grid grid-cols-1 py-4 gap-y-1  border-t-2 md:grid-cols-2 '>
// 						<label htmlFor='aboutYourself'>About yourself</label>
// 						<textarea
// 							id='aboutYourself'
// 							name='aboutYourself'
// 							value={formData.aboutYourself}
// 							onChange={handleChange}
// 							className='bg-transparent'
// 						></textarea>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default ArtistDashboardEditProfile;

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// import CityOrProvinceSelector from './SelectorCityOrProvince';

// const ArtistDashboardEditProfile = () => {
// 	const [formData, setFormData] = useState({
// 		avatar: '',
// 		fullName: '',
// 		firstName: '',
// 		lastName: '',
// 		gender: '',
// 		dateOfBirth: '',
// 		location: '',
// 		email: '',
// 		phoneNumber: '',
// 		aboutYourself: '',
// 	});
// 	const [avatarURL, setAvatarURL] = useState('');

// 	const handleLocationChange = location => {
// 		setFormData(prev => ({ ...prev, location }));
// 	};

// 	useEffect(() => {
// 		const fetchProfile = async () => {
// 			const userId = localStorage.getItem('id');
// 			const accessToken = localStorage.getItem('accessToken');

// 			if (!userId || !accessToken) {
// 				console.error('No user ID or access token found');
// 				return;
// 			}

// 			try {
// 				const response = await axios.get(
// 					`http://localhost:5000/api/artist/dashboard-profile?id=${userId}`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${accessToken}`,
// 						},
// 					}
// 				);

// 				const profileData = response.data.data;
// 				const [firstName, lastName] = profileData.fullName.split(' ');

// 				// Format dateOfBirth to yyyy-MM-dd
// 				const formattedDate = profileData.dateOfBirth
// 					? new Date(profileData.dateOfBirth).toISOString().split('T')[0]
// 					: '';

// 				setFormData({
// 					avatar: profileData.avatar,
// 					firstName: firstName,
// 					lastName: lastName,
// 					gender: profileData.gender,
// 					dateOfBirth: formattedDate, // Use formatted date
// 					email: profileData.email,
// 					phoneNumber: profileData.phoneNumber,
// 					location: profileData.location,
// 					aboutYourself: profileData.aboutYourself,
// 				});
// 			} catch (error) {
// 				console.error('Error fetching profile:', error);
// 			}
// 		};

// 		fetchProfile();
// 	}, []);

// 	const handleChange = e => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const renderAvatar = () => {
// 		if (formData.avatar && formData.avatar.length === 2) {
// 			return <span className='text-4xl'>{formData.avatar}</span>;
// 		} else if (formData.avatar && formData.avatar.startsWith('https')) {
// 			return <img src={formData.avatar} alt='User Avatar' className='w-full h-full object-cover' />;
// 		} else {
// 			return <span>{formData.fullName.slice(0, 2).toUpperCase()}</span>;
// 		}
// 	};

// 	return (
// 		<div className='text-sm md:text-base font-custom my-4'>
// 			<div className='text-center flex gap-5'>
// 				<div className='w-20 h-20 flex-shrink-0 rounded-lg flex items-center justify-center bg-gray-300 text-white font-bold border-2 border-gray-300'>
// 					{renderAvatar()}
// 				</div>
// 				<div className='flex flex-col items-start justify-center'>
// 					<h1 className='text-base'>{`${formData.firstName} ${formData.lastName}` || 'My Name'}</h1>
// 					<p className='text-xs'>{formData.email || 'My Email'}</p>
// 				</div>
// 			</div>

// 			<div>
// 				<form>
// 					<div className='flex justify-between'>
// 						<label htmlFor='firstName'>First name</label>
// 						<input
// 							type='text'
// 							id='firstName'
// 							name='firstName'
// 							value={formData.firstName}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='lastName'>Last name</label>
// 						<input
// 							type='text'
// 							id='lastName'
// 							name='lastName'
// 							value={formData.lastName}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='gender'>Gender</label>
// 						<select
// 							id='gender'
// 							name='gender'
// 							value={formData.gender}
// 							onChange={handleChange}
// 							className='w-40'
// 						>
// 							<option value='male'>Male</option>
// 							<option value='female'>Female</option>
// 							<option value='other'>Other</option>
// 						</select>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='dateOfBirth'>Date of Birth</label>
// 						<input
// 							type='date'
// 							id='dateOfBirth'
// 							name='dateOfBirth'
// 							value={formData.dateOfBirth}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='location'>Location</label>
// 						<CityOrProvinceSelector value={formData.location} onChange={handleLocationChange} />
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='email'>Email</label>
// 						<input
// 							type='text'
// 							id='email'
// 							name='email'
// 							value={formData.email}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='phoneNumber'>Phone Number</label>
// 						<input
// 							type='tel'
// 							id='phoneNumber'
// 							name='phoneNumber'
// 							value={formData.phoneNumber}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='aboutYourself'>About yourself</label>
// 						<textarea
// 							id='aboutYourself'
// 							name='aboutYourself'
// 							value={formData.aboutYourself}
// 							onChange={handleChange}
// 						></textarea>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default ArtistDashboardEditProfile;

/////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// import CityOrProvinceSelector from './CityOrProvinceSelector';

// const ArtistDashboardEditProfile = () => {
// 	const [formData, setFormData] = useState({
// 		avatar: '',
// 		fullName: '',
// 		firstName: '',
// 		lastName: '',
// 		gender: '',
// 		dateOfBirth: '',
// 		location: '',
// 		email: '',
// 		phoneNumber: '',
// 		aboutYourself: '',
// 	});
// 	const [avatarURL, setAvatarURL] = useState('');

// 	const handleLocationChange = location => {
// 		setFormData(prev => ({ ...prev, location }));
// 	};

// 	useEffect(() => {
// 		const fetchProfile = async () => {
// 			const userId = localStorage.getItem('id');
// 			const accessToken = localStorage.getItem('accessToken');

// 			if (!userId || !accessToken) {
// 				console.error('No user ID or access token found');
// 				return;
// 			}

// 			try {
// 				const response = await axios.get(
// 					`http://localhost:5000/api/artist/dashboard-profile?id=${userId}`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${accessToken}`,
// 						},
// 					}
// 				);

// 				const profileData = response.data.data;
// 				const [firstName, lastName] = profileData.fullName.split(' ');

// 				// Format dateOfBirth to yyyy-MM-dd
// 				const formattedDate = profileData.dateOfBirth
// 					? new Date(profileData.dateOfBirth).toISOString().split('T')[0]
// 					: '';

// 				setFormData({
// 					avatar: profileData.avatar,
// 					firstName: firstName,
// 					lastName: lastName,
// 					gender: profileData.gender,
// 					dateOfBirth: formattedDate, // Use formatted date
// 					email: profileData.email,
// 					phoneNumber: profileData.phoneNumber,
// 					location: profileData.location,
// 					aboutYourself: profileData.aboutYourself,
// 				});
// 			} catch (error) {
// 				console.error('Error fetching profile:', error);
// 			}
// 		};

// 		fetchProfile();
// 	}, []);

// 	const handleChange = e => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const renderAvatar = () => {
// 		if (formData.avatar && formData.avatar.length === 2) {
// 			return <span className='text-4xl'>{formData.avatar}</span>;
// 		} else if (formData.avatar && formData.avatar.startsWith('https')) {
// 			return <img src={formData.avatar} alt='User Avatar' className='w-full h-full object-cover' />;
// 		} else {
// 			return <span>{formData.fullName.slice(0, 2).toUpperCase()}</span>;
// 		}
// 	};

// 	return (
// 		<div className='text-sm md:text-base font-custom my-4'>
// 			<div className='text-center flex gap-5'>
// 				<div className='w-20 h-20 flex-shrink-0 rounded-lg flex items-center justify-center bg-gray-300 text-white font-bold border-2 border-gray-300'>
// 					{renderAvatar()}
// 				</div>
// 				<div className='flex flex-col items-start justify-center'>
// 					<h1 className='text-base'>{`${formData.firstName} ${formData.lastName}` || 'My Name'}</h1>
// 					<p className='text-xs'>{formData.email || 'My Email'}</p>
// 				</div>
// 			</div>

// 			<div>
// 				<form>
// 					<div className='flex justify-between'>
// 						<label htmlFor='firstName'>First name</label>
// 						<input
// 							type='text'
// 							id='firstName'
// 							name='firstName'
// 							value={formData.firstName}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='lastName'>Last name</label>
// 						<input
// 							type='text'
// 							id='lastName'
// 							name='lastName'
// 							value={formData.lastName}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='gender'>Gender</label>
// 						<select
// 							id='gender'
// 							name='gender'
// 							value={formData.gender}
// 							onChange={handleChange}
// 							className='w-40'
// 						>
// 							<option value='male'>Male</option>
// 							<option value='female'>Female</option>
// 							<option value='other'>Other</option>
// 						</select>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='dateOfBirth'>Date of Birth</label>
// 						<input
// 							type='date'
// 							id='dateOfBirth'
// 							name='dateOfBirth'
// 							value={formData.dateOfBirth}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='location'>Location</label>
// 						<CityOrProvinceSelector value={formData.location} onChange={handleLocationChange} />
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='email'>Email</label>
// 						<input
// 							type='text'
// 							id='email'
// 							name='email'
// 							value={formData.email}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='phoneNumber'>Phone Number</label>
// 						<input
// 							type='tel'
// 							id='phoneNumber'
// 							name='phoneNumber'
// 							value={formData.phoneNumber}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='aboutYourself'>About yourself</label>
// 						<textarea
// 							id='aboutYourself'
// 							name='aboutYourself'
// 							value={formData.aboutYourself}
// 							onChange={handleChange}
// 						></textarea>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default ArtistDashboardEditProfile;

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const ArtistDashboardEditProfile = () => {
// 	const [formData, setFormData] = useState({
// 		avatar: '',
// 		fullName: '',
// 		firstName: '',
// 		lastName: '',
// 		email: '',
// 		dateOfBirth: '',
// 		location: '',
// 		gender: '',
// 		aboutYourSelf: '',
// 	});
// 	const [avatarURL, setAvatarURL] = useState('');

// 	useEffect(() => {
// 		const fetchProfile = async () => {
// 			const userId = localStorage.getItem('id'); // Get userId directly from localStorage
// 			const accessToken = localStorage.getItem('accessToken'); // Get accessToken directly from localStorage

// 			if (!userId || !accessToken) {
// 				console.error('No user ID or access token found');
// 				return;
// 			}

// 			try {
// 				const response = await axios.get(
// 					`http://localhost:5000/api/artist/dashboard-profile?id=${userId}`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${accessToken}`,
// 						},
// 					}
// 				);

// 				// Extract profile data from the response
// 				const profileData = response.data.data;

// 				const [firstName, lastName] = profileData.fullName.split(' ');

// 				// Update formData state with the correct structure
// 				setFormData({
// 					avatar: profileData.avatar,
// 					firstName: firstName,
// 					lastName: lastName,
// 					email: profileData.email,
// 					dateOfBirth: profileData.dateOfBirth,
// 					location: profileData.location,
// 					gender: profileData.gender,
// 					aboutYourSelf: profileData.aboutYourself,
// 				});
// 			} catch (error) {
// 				console.error('Error fetching profile:', error);
// 			}
// 		};

// 		fetchProfile(); // Fetch the profile as soon as the component mounts
// 	}, []);

// 	const handleChange = e => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const renderAvatar = () => {
// 		if (formData.avatar && formData.avatar.length === 2) {
// 			return <span className='text-4xl'>{formData.avatar}</span>;
// 		} else if (formData.avatar && formData.avatar.startsWith('https')) {
// 			return <img src={formData.avatar} alt='User Avatar' className='w-full h-full object-cover' />;
// 		} else {
// 			return <span>{formData.fullName.slice(0, 2).toUpperCase()}</span>;
// 		}
// 	};

// 	return (
// 		<div className='text-sm md:text-base font-custom my-4'>
// 			<div className='text-center flex gap-5'>
// 				<div className='w-20 h-20 flex-shrink-0 rounded-lg flex items-center justify-center bg-gray-300 text-white font-bold border-2 border-gray-300'>
// 					{renderAvatar()}
// 				</div>
// 				<div className='flex flex-col items-start justify-center'>
// 					<h1 className='text-base'>{`${formData.firstName} ${formData.lastName}` || 'My Name'}</h1>
// 					<p className='text-xs'>{formData.email || 'My Email'}</p>
// 				</div>
// 			</div>

// 			<div>
// 				<form>
// 					<div className='flex justify-between'>
// 						<label htmlFor='firstName'>First name</label>
// 						<input
// 							type='text'
// 							id='firstName'
// 							name='firstName'
// 							value={formData.firstName}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='lastName'>Last name</label>
// 						<input
// 							type='text'
// 							id='lastName'
// 							name='lastName'
// 							value={formData.lastName}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 					{/*  */}
// 					<div className='flex justify-between'>
// 						<label htmlFor='email'>Email</label>
// 						<input
// 							type='text'
// 							id='email'
// 							name='email'
// 							value={formData.email}
// 							onChange={handleChange}
// 						/>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default ArtistDashboardEditProfile;

////////////////////////////////////////////////////////////

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const ArtistDashboardEditProfile = () => {
// 	const [formData, setFormData] = useState({
// 		avatar: '',
// 		name: '',
// 		email: '',
// 		dateOfBirth: '',
// 		location: '',
// 		gender: '',
// 		aboutYourSelf: '',
// 		attachments: [], // Add attachment field to handle files
// 	});

// 	const [avatarURL, setAvatarURL] = useState('');

// 	useEffect(() => {
// 		const fetchProfile = async () => {
// 			const userId = localStorage.getItem('id'); // Get userId directly from localStorage
// 			const accessToken = localStorage.getItem('accessToken'); // Get accessToken directly from localStorage

// 			if (!userId || !accessToken) {
// 				console.error('No user ID or access token found');
// 				return;
// 			}

// 			try {
// 				const response = await axios.get(
// 					`http://localhost:5000/api/artist/dashboard-profile?id=${userId}`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${accessToken}`,
// 						},
// 					}
// 				);

// 				// Extract profile data from the response
// 				const profileData = response.data.data;

// 				// Update formData state with the correct structure
// 				setFormData({
// 					avatar: profileData.avatar,
// 					name: profileData.fullName,
// 					email: profileData.email,
// 					dateOfBirth: profileData.dateOfBirth,
// 					location: profileData.location,
// 					gender: profileData.gender,
// 					aboutYourSelf: profileData.aboutYourself,
// 					attachments: profileData.attachments || [], // Assuming the API returns attachment data
// 				});
// 			} catch (error) {
// 				console.error('Error fetching profile:', error);
// 			}
// 		};

// 		fetchProfile(); // Fetch the profile as soon as the component mounts
// 	}, []);

// 	const handleChange = e => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const renderAvatar = () => {
// 		if (formData.avatar && formData.avatar.length === 2) {
// 			return <span className='text-4xl'>{formData.avatar}</span>;
// 		} else if (formData.avatar && formData.avatar.startsWith('https')) {
// 			return <img src={formData.avatar} alt='User Avatar' className='w-full h-full object-cover' />;
// 		} else {
// 			return <span>{formData.name.slice(0, 2).toUpperCase()}</span>;
// 		}
// 	};

// 	return (
// 		<div className='text-sm md:text-base font-custom my-4'>
// 			<div className='text-center flex gap-5'>
// 				<div className='w-20 h-20 flex-shrink-0 rounded-lg flex items-center justify-center bg-gray-300 text-white font-bold border-2 border-gray-300'>
// 					{renderAvatar()}
// 				</div>
// 				<div className='flex flex-col items-start justify-center'>
// 					<h1 className='text-base'>{formData.name || 'My Name'}</h1>
// 					<p className='text-xs'>{formData.email || 'My Email'}</p>
// 				</div>
// 			</div>

// 			<div className='mt-6 border-t border-gray-100'>
// 				<dl className='divide-y divide-gray-100'>
// 					{/* Full Name */}
// 					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
// 						<dt className='text-sm font-medium text-gray-900'>Full name</dt>
// 						<dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
// 							<input
// 								type='text'
// 								name='name'
// 								value={formData.name}
// 								onChange={handleChange}
// 								className='text-gray-900'
// 							/>
// 						</dd>
// 					</div>

// 					{/* Email Address */}
// 					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
// 						<dt className='text-sm font-medium text-gray-900'>Email address</dt>
// 						<dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
// 							<input
// 								type='email'
// 								name='email'
// 								value={formData.email}
// 								onChange={handleChange}
// 								className='text-gray-900'
// 							/>
// 						</dd>
// 					</div>

// 					{/* Date of Birth */}
// 					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
// 						<dt className='text-sm font-medium text-gray-900'>Date of Birth</dt>
// 						<dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
// 							<input
// 								type='date'
// 								name='dateOfBirth'
// 								value={formData.dateOfBirth}
// 								onChange={handleChange}
// 								className='text-gray-900'
// 							/>
// 						</dd>
// 					</div>

// 					{/* Location */}
// 					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
// 						<dt className='text-sm font-medium text-gray-900'>Location</dt>
// 						<dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
// 							<input
// 								type='text'
// 								name='location'
// 								value={formData.location}
// 								onChange={handleChange}
// 								className='text-gray-900'
// 							/>
// 						</dd>
// 					</div>

// 					{/* Gender */}
// 					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
// 						<dt className='text-sm font-medium text-gray-900'>Gender</dt>
// 						<dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
// 							<select
// 								name='gender'
// 								value={formData.gender}
// 								onChange={handleChange}
// 								className='text-gray-900'
// 							>
// 								<option value='male'>Male</option>
// 								<option value='female'>Female</option>
// 								<option value='other'>Other</option>
// 							</select>
// 						</dd>
// 					</div>

// 					{/* About Yourself */}
// 					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
// 						<dt className='text-sm font-medium text-gray-900'>About</dt>
// 						<dd className='mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0'>
// 							<textarea
// 								name='aboutYourSelf'
// 								value={formData.aboutYourSelf}
// 								onChange={handleChange}
// 								className='w-full p-2 border border-gray-300 rounded-md text-gray-900'
// 							/>
// 						</dd>
// 					</div>

// 					{/* Attachments */}
// 					<div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
// 						<dt className='text-sm font-medium text-gray-900'>Attachments</dt>
// 						<dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
// 							<ul
// 								role='list'
// 								className='divide-y divide-gray-100 rounded-md border border-gray-200'
// 							>
// 								{formData.attachments.map((attachment, index) => (
// 									<li
// 										key={index}
// 										className='flex items-center justify-between py-4 pl-4 pr-5 text-sm'
// 									>
// 										<div className='flex w-0 flex-1 items-center'>
// 											<svg
// 												className='size-5 shrink-0 text-gray-400'
// 												viewBox='0 0 20 20'
// 												fill='currentColor'
// 												aria-hidden='true'
// 											>
// 												<path
// 													fillRule='evenodd'
// 													d='M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z'
// 													clipRule='evenodd'
// 												/>
// 											</svg>
// 											<div className='ml-4 flex min-w-0 flex-1 gap-2'>
// 												<span className='truncate font-medium'>{attachment.name}</span>
// 												<span className='shrink-0 text-gray-400'>{attachment.size}</span>
// 											</div>
// 										</div>
// 										<div className='ml-4 shrink-0'>
// 											<a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
// 												Download
// 											</a>
// 										</div>
// 									</li>
// 								))}
// 							</ul>
// 						</dd>
// 					</div>
// 				</dl>
// 			</div>
// 		</div>
// 	);
// };

// export default ArtistDashboardEditProfile;
