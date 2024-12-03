import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const [role, setRole] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await fetch(`http://localhost:5000/login/${role}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('fullName', data.fullName);
				localStorage.setItem('role', data.role);

				window.dispatchEvent(new Event('storage'));

				console.log('Login successful!');

				switch (role) {
					case 'collector':
						navigate('/collector/dashboard');
						break;
					case 'artist':
						navigate('/artist/dashboard');
						break;
					case 'admin':
						navigate('/admin/dashboard');
						break;
					default:
						navigate('/');
				}
			} else {
				console.error('Login failed:', data.error);
			}
		} catch (error) {
			console.error('Error during login:', error.message);
		}
	};

	return (
		<div className='container max-w-md mx-auto py-8'>
			<h2 className='text-2xl font-bold mb-4'>Login</h2>

			{/* Login form */}
			<form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md'>
				{/* Role selection */}
				<div className='mb-4'>
					<label className='block text-sm font-medium mb-2'>Select your role</label>
					<select
						value={role}
						onChange={e => setRole(e.target.value)}
						required
						className='w-full px-4 py-2 border border-gray-300 rounded-lg'
					>
						<option value='' disabled>
							Select role
						</option>
						<option value='artist'>Artist</option>
						<option value='collector'>Collector</option>
						<option value='admin'>Admin</option>
					</select>
				</div>

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

				<button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-lg mt-4'>
					Login
				</button>
			</form>

			{/* Registration links for Artist and Collector */}
			{role === 'artist' || role === 'collector' ? (
				<div className='mt-4 text-center'>
					<p>
						Don't have an account?{' '}
						{role === 'artist' ? (
							<Link to='/register/artist' className='text-blue-500'>
								Register as Artist
							</Link>
						) : (
							<Link to='/register/collector' className='text-blue-500'>
								Register as Collector
							</Link>
						)}
					</p>
				</div>
			) : null}
		</div>
	);
};

export default Login;
