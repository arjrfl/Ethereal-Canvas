import React, { useState } from 'react';
import CityOrProvinceInput from './CityOrProvinceInput';
import ImageUpload from './UploadImage';

const PersonalInfo = ({ register, setValue, getValues }) => {
	const [location, setLocation] = useState('');

	const handleImageChange = (name, files) => {
		if (files && files.length > 0) {
			setValue(name, files);
		} else {
			setValue(name, []);
		}
	};

	return (
		<div className='font-custom mb-8'>
			<h1 className='text-xl md:text-2xl lg:text-3xl mb-8'>Personal Information</h1>

			<div className='grid grid-cols-1 gap-y-3 mb-3 md:mb-3 md:grid-cols-12 md:gap-x-5 lg:grid-cols-12 lg:gap-x-10 '>
				<div className='md:mb-0 lg:mb-0 col-span-4'>
					<label htmlFor='firstName' className='block pb-1'>
						First Name
					</label>
					<input
						type='text'
						id='firstName'
						placeholder='Your first name'
						className='w-full px-4 py-3 border rounded text-sm'
						required
						{...register('firstName')}
					/>
				</div>

				<div className='md:mb-0 lg:mb-0 col-span-4'>
					<label htmlFor='lastName' className='block pb-1'>
						Last Name
					</label>
					<input
						type='text'
						id='lastName'
						placeholder='Last Name'
						className='w-full px-4 py-3 border rounded text-sm'
						required
						{...register('lastName')}
					/>
				</div>

				<div className='md:mb-0 lg:mb-0 md:col-span-3 md:col-start-10 lg:col-span-3 lg:col-start-10'>
					<label htmlFor='gender' className='block pb-1'>
						Gender
					</label>
					<select
						id='gender'
						defaultValue=''
						className='w-full px-4 py-3 border rounded text-sm'
						required
						{...register('gender')}
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
			{/*  */}
			<div className='grid grid-cols-1 gap-y-3 mb-8 border-b-2 border-b-slate-400 pb-5 md:grid-cols-12 md:gap-x-5 lg:grid-cols-12 lg:gap-x-10 '>
				<div className='md:mb-0 lg:mb-0 col-span-3 '>
					<label htmlFor='dateOfBirth' className='block pb-1'>
						Date of Birth
					</label>
					<input
						type='date'
						id='dateOfBirth'
						className='w-full px-4 py-3 border rounded text-sm'
						{...register('dateOfBirth')}
					/>
				</div>

				<div className='md:mb-0 lg:mb-0 col-span-3'>
					<label htmlFor='location' className='block pb-1'>
						City or Province
					</label>
					<CityOrProvinceInput
						query={location}
						setQuery={setLocation}
						setValue={setValue}
						{...register('location')}
					/>
				</div>

				<div className='md:mb-0 lg:mb-0 col-span-3'>
					<label htmlFor='email' className='block pb-1'>
						Email
					</label>
					<input
						type='email'
						id='email'
						placeholder='Email'
						className='w-full px-4 py-3 border rounded text-sm'
						required
						{...register('email')}
					/>
				</div>

				<div className='col-span-3'>
					<label htmlFor='phoneNumber' className='block pb-1'>
						Phone Number
					</label>
					<input
						type='tel'
						id='phoneNumber'
						placeholder='+63 9xx xxx xxxx'
						pattern='^\+63[0-9]{10}$'
						className='w-full px-4 py-3 border rounded text-sm'
						{...register('phoneNumber')}
						required
					/>
				</div>
			</div>
			{/*  */}
			<div className='flex flex-col mb-8 border-b-2 border-b-slate-400 pb-5 '>
				<label htmlFor='aboutYourself' className='pb-2'>
					Share with us some details about yourself and describe your artistic or creative approach.
				</label>
				<textarea
					id='aboutYourself'
					rows='8'
					placeholder='Type your answer ...'
					required
					className='border rounded px-4 py-3'
					{...register('aboutYourself')}
				></textarea>
			</div>

			<div className='grid grid-cols-1 gap-y-3 md:grid-cols-12 md:gap-x-5 lg:grid-cols-12 lg:gap-x-10'>
				<label className='col-span-full'>
					Provide an image of your workspace and a selfie with your workspace.
				</label>

				<div className='md:col-span-6'>
					<ImageUpload
						label='Workspace Image'
						name='workspace'
						onChange={handleImageChange}
						initialValue={getValues('workspace')}
					/>
				</div>

				<div className='md:col-span-6'>
					<ImageUpload
						label='Selfie with Workspace'
						name='selfieWithWorkspace'
						onChange={handleImageChange}
						initialValue={getValues('selfieWithWorkspace')}
					/>
				</div>
			</div>
		</div>
	);
};

export default PersonalInfo;
