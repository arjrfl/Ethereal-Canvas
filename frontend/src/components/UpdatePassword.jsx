import { useState } from 'react';
import usePostData from '../hooks/usePostData';
import { showToast } from '../utils/toastUtils';

import { TbPasswordUser } from 'react-icons/tb';

import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

const PasswordUpdateForm = ({ endpoint, onSuccess }) => {
	const { postData, isPosting } = usePostData();
	const [showPassword, setShowPassword] = useState({
		currentPassword: false,
		newPassword: false,
		confirmNewPassword: false,
	});

	// Toggle password visibility for each field
	const togglePasswordVisibility = field => {
		setShowPassword(prevState => ({
			...prevState,
			[field]: !prevState[field],
		}));
	};

	// Password strength validation function
	const isPasswordStrong = password => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	};

	const handlePasswordSubmit = async e => {
		e.preventDefault();

		const currentPassword = e.target.currentPassword.value.trim();
		const newPassword = e.target.newPassword.value.trim();
		const confirmNewPassword = e.target.confirmNewPassword.value.trim();

		// Validate new password strength
		if (!isPasswordStrong(newPassword)) {
			showToast.error(
				'Password must have at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
			);
			return;
		}

		// Validate that new password and confirm password match
		if (newPassword !== confirmNewPassword) {
			showToast.error('New password and confirm password do not match.');
			return;
		}

		const { responseData, error } = await postData(
			endpoint,
			{ currentPassword, newPassword },
			'PUT'
		);

		if (!error) {
			e.target.reset(); // Clear the form inputs
			showToast.success('Password changed successfully!');
			onSuccess(); // Trigger callback on success
		} else {
			// Show specific error message from the server response
			const errorMessage = error?.response?.data?.message || 'Failed to change password.';
			showToast.error(errorMessage);
			console.error('Error changing password:', error);
		}
	};

	return (
		<form onSubmit={handlePasswordSubmit} className='bg-neutral-100 p-10 px-7 rounded-xl'>
			<div className='mb-1 flex items-center gap-x-2'>
				<h1 className='text-lg text-slate-800 font-semibold'>Change Password</h1>
				<p className='text-2xl text-orange-500'>
					<TbPasswordUser />
				</p>
			</div>

			<div className='mb-3'>
				<label className='text-xs text-slate-700 font-semibold'>Current Password:</label>
				<div className='relative'>
					<input
						type={showPassword.currentPassword ? 'text' : 'password'}
						name='currentPassword'
						placeholder='Enter your current password'
						required
						disabled={isPosting}
						className='w-full py-2 px-4 text-sm rounded-lg bg-white'
					/>
					<button
						type='button'
						onClick={() => togglePasswordVisibility('currentPassword')}
						className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
					>
						{showPassword.currentPassword ? <FaRegEye /> : <FaRegEyeSlash />}
					</button>
				</div>
			</div>

			<div className='mb-3'>
				<label className='text-xs text-slate-700 font-semibold'>New Password:</label>
				<div className='relative'>
					<input
						type={showPassword.newPassword ? 'text' : 'password'}
						name='newPassword'
						placeholder='e.g., Passw0rd@123'
						required
						disabled={isPosting}
						className='w-full py-2 px-4 text-sm rounded-lg bg-white'
					/>
					<button
						type='button'
						onClick={() => togglePasswordVisibility('newPassword')}
						className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
					>
						{showPassword.newPassword ? <FaRegEye /> : <FaRegEyeSlash />}
					</button>
				</div>
			</div>

			<div className='mb-5'>
				<label className='text-xs text-slate-700 font-semibold'>Confirm New Password:</label>
				<div className='relative'>
					<input
						type={showPassword.confirmNewPassword ? 'text' : 'password'}
						name='confirmNewPassword'
						placeholder='Re-enter new password'
						required
						disabled={isPosting}
						className='w-full py-2 px-4 text-sm rounded-lg bg-white'
					/>
					<button
						type='button'
						onClick={() => togglePasswordVisibility('confirmNewPassword')}
						className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
					>
						{showPassword.confirmNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
					</button>
				</div>
			</div>

			<div className='flex justify-end'>
				<button
					type='submit'
					disabled={isPosting}
					className='bg-blue-600 text-white font-medium text-sm px-5 py-2 rounded-lg hover:bg-blue-800 hover:font-semibold'
				>
					{isPosting ? 'Updating...' : 'Change Password'}
				</button>
			</div>
		</form>
	);
};

export default PasswordUpdateForm;
