import React, { useState } from 'react';

const RegisterArtist = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		// Handle registration logic here (send data to backend)
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		console.log('Registering artist with email:', email);
	};

	return (
		<div className='container max-w-md mx-auto py-8'>
			<h2 className='text-2xl font-bold mb-4'>Register as Artist</h2>
			<form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md'>
				<div className='mb-4'>
					<label className='block text-sm font-medium mb-2'>Email</label>
					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						className='w-full px-4 py-2 border border-gray-300 rounded-lg'
						placeholder='Enter your email'
					/>
				</div>

				<div className='mb-4'>
					<label className='block text-sm font-medium mb-2'>Password</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						className='w-full px-4 py-2 border border-gray-300 rounded-lg'
						placeholder='Enter your password'
					/>
				</div>

				<div className='mb-4'>
					<label className='block text-sm font-medium mb-2'>Confirm Password</label>
					<input
						type='password'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						required
						className='w-full px-4 py-2 border border-gray-300 rounded-lg'
						placeholder='Confirm your password'
					/>
				</div>

				<button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-lg mt-4'>
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterArtist;
