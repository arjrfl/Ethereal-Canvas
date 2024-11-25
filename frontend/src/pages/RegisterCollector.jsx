import React, { useState } from 'react';
import postData from '../utils/postRegistrationData';
import { Link } from 'react-router-dom';

const RegisterCollector = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isAgreed, setIsAgreed] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		const data = { firstName, lastName, gender, email, password };

		try {
			const response = await postData('http://localhost:5000/register/collector', data);

			console.log(response);

			setFirstName('');
			setLastName('');
			setGender('');
			setEmail('');
			setPassword('');
			setConfirmPassword('');
			setIsAgreed(false);
		} catch (error) {
			console.error('Error during registration:', error.message);
		}
	};

	return (
		<div className='container max-w-lg mx-auto py-8'>
			<h2 className='text-2xl font-bold mb-4'>Register as Collector</h2>

			<form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-lg'>
				<div className='flex flex-col sm:flex-row sm:space-x-4 mb-4'>
					<div className='w-full sm:w-1/2'>
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
					<div className='w-full sm:w-1/2 mt-4 sm:mt-0'>
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
				</div>

				<div className='flex flex-col sm:flex-row sm:space-x-4 mb-4 sm:mt-0'>
					<div className='w-full sm:w-1/2'>
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
					<div className='w-full sm:w-1/2 mt-4 sm:mt-0'>
						<label htmlFor='gender' className='block mb-1'>
							Gender
						</label>
						<select
							id='gender'
							value={gender}
							onChange={e => setGender(e.target.value)}
							className='w-full p-2 border rounded'
							required
						>
							<option value='' disabled>
								Select Gender
							</option>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
							<option value='other'>Other</option>
						</select>
					</div>
				</div>

				<div className='mb-4'>
					<label htmlFor='password' className='block mb-1'>
						Password
					</label>
					<input
						id='password'
						type='password'
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='w-full p-2 border rounded'
						required
					/>
				</div>

				<div className='mb-4'>
					<label htmlFor='confirmPassword' className='block mb-1'>
						Confirm Password
					</label>
					<input
						id='confirmPassword'
						type='password'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						className='w-full p-2 border rounded'
						required
					/>
				</div>

				<div className='mb-4'>
					<label className='flex items-center'>
						<input
							type='checkbox'
							checked={isAgreed}
							onChange={e => setIsAgreed(e.target.checked)}
							className='mr-2'
							required
						/>
						<span>
							By creating an account, you agree to the{' '}
							<Link to='/terms' className='text-blue-500'>
								Terms of Use
							</Link>{' '}
							and{' '}
							<Link to='/privacy' className='text-blue-500'>
								Privacy Policy
							</Link>
							.
						</span>
					</label>
				</div>

				<button
					type='submit'
					className={`w-full py-2 rounded-lg mt-4 ${isAgreed ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
					disabled={!isAgreed}
				>
					Register
				</button>

				<div className='mt-4 text-center'>
					Already have an account?{' '}
					<Link to='/Login' className='text-blue-500'>
						Log in here
					</Link>
					.
				</div>
			</form>
		</div>
	);
};

export default RegisterCollector;
