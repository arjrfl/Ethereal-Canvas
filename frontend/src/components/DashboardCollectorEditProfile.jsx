import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { axiosInstancePrivate } from '../utils/axiosConfig';
import useFetchUserData from '../hooks/useFetchUserData';
import PasswordUpdateForm from './UpdatePassword';

import { TbInfoHexagonFilled } from 'react-icons/tb';
import { MdAlternateEmail } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';

const UserProfile = () => {
	const user = localStorage.getItem('id');

	const { refetchUserData } = useOutletContext();

	const { userData, loading, error } = useFetchUserData(`/collector/dashboard-profile/${user}`);

	const [formData, setFormData] = useState({
		fullName: '',
		gender: '',
		email: '',
		dateOfBirth: '',
	});

	useEffect(() => {
		if (userData && userData.data) {
			setFormData({
				fullName: userData.data.fullName || '',
				gender: userData.data.gender || '',
				email: userData.data.email || '',
				dateOfBirth: userData.data.dateOfBirth ? userData.data.dateOfBirth.split('T')[0] : '',
			});
		}
	}, [userData]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await axiosInstancePrivate.put(`/collector/update-profile/${user}`, formData);

			refetchUserData();

			alert('Profile updated successfully!');
		} catch (err) {
			console.error('Error updating profile:', err);
			alert('Failed to update profile.');
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<div className='grid grid-cols-3'>
				<div className='pr-10 col-span-2 text-right'>
					<div className='mb-8'>
						<div className='flex items-center gap-x-2 mb-1'>
							<h1 className='text-2xl text-slate-800 font-semibold'>Account Details</h1>
							<p className='text-2xl text-blue-500'>
								<TbInfoHexagonFilled />
							</p>
						</div>

						<p className='text-left text-xs'>Update your account details and password.</p>
					</div>

					<form onSubmit={handleSubmit}>
						<div className='flex flex-col gap-y-1 mb-5'>
							<label className='text-left text-xs text-slate-500 font-semibold'>Full Name:</label>
							<input
								type='text'
								name='fullName'
								value={formData.fullName}
								onChange={handleInputChange}
								className='bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg'
							/>
						</div>

						<div className='flex flex-col gap-y-1 mb-5 relative'>
							<label className='text-left text-xs text-slate-500 font-semibold'>Gender:</label>
							<select
								name='gender'
								value={formData.gender}
								onChange={handleInputChange}
								className='bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg appearance-none'
							>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
								<option value='other'>Other</option>
							</select>
							<span className='absolute right-4 -bottom-0 transform -translate-y-1/2 text-lg'>
								<IoIosArrowDown />
							</span>
						</div>

						<div className='flex flex-col gap-y-1 mb-5 relative'>
							<label className='text-left text-xs text-slate-500 font-semibold'>Email:</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleInputChange}
								className='bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg'
							/>
							<span className='absolute right-4 -bottom-0 transform -translate-y-1/2 text-lg'>
								<MdAlternateEmail />
							</span>
						</div>

						<div className='flex flex-col gap-y-1 mb-5'>
							<label className='text-left text-xs text-slate-500 font-semibold'>
								Date of Birth:
							</label>
							<input
								type='date'
								name='dateOfBirth'
								value={formData.dateOfBirth}
								onChange={handleInputChange}
								className='bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg'
							/>
						</div>

						<button
							type='submit'
							className='bg-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-800 hover:font-semibold'
						>
							Save Changes
						</button>
					</form>
				</div>

				<div className='col-span-1 rounded-xl drop-shadow-md'>
					<PasswordUpdateForm
						endpoint={`/collector/update-password/${user}`}
						onSuccess={() => alert('Password changed successfully!')}
					/>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
