import { useEffect, useState } from 'react';
import { axiosInstancePrivate } from '../utils/axiosConfig';
import useFetchUserData from '../hooks/useFetchUserData';
import { TbInfoHexagonFilled } from 'react-icons/tb';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';

const CollectorAddress = () => {
	const user = localStorage.getItem('id');

	const { userData, loading, error } = useFetchUserData(`/collector/dashboard-address/${user}`);

	const [formData, setFormData] = useState({
		fullName: '',
		phoneNumber: '',
		fullAddress: '',
		postalCode: '',
		street: '',
	});

	useEffect(() => {
		if (userData && userData.deliveryAddress) {
			const { fullName, phoneNumber, fullAddress, postalCode, street } = userData.deliveryAddress;
			setFormData({
				fullName: fullName || '',
				phoneNumber: phoneNumber || '',
				fullAddress: fullAddress || '',
				postalCode: postalCode || '',
				street: street || '',
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
			const response = await axiosInstancePrivate.put(`/collector/add-address/${user}`, formData);

			if (response.status === 200) {
				alert('Address saved successfully!');
			} else {
				alert('Failed to save address.');
			}
		} catch (err) {
			console.error('Error saving address:', err);
			alert('An error occurred while saving the address.');
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<div className='mb-5 flex items-center gap-x-2'>
				<h1 className='text-2xl text-slate-800 font-semibold'>Add Address</h1>
				<p className='text-2xl text-red-500'>
					<FaLocationDot />
				</p>
			</div>

			<form onSubmit={handleSubmit}>
				{/* CONTACT */}
				<div className='grid grid-cols-3 mb-10'>
					<div className='col-span-1'>
						<p className='tracking-wide font-medium'>Contact Details</p>
					</div>

					<div className='col-span-2 grid grid-cols-2 gap-x-10'>
						<div className='flex flex-col gap-y-1 mb-5'>
							<label className='text-left text-xs text-slate-500 font-semibold'>Full Name:</label>
							<input
								type='text'
								name='fullName'
								value={formData.fullName}
								onChange={handleInputChange}
								placeholder='Enter your full name'
								required
								className='bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg'
							/>
						</div>

						<div className='flex flex-col gap-y-1 mb-5'>
							<label className='text-left text-xs text-slate-500 font-semibold'>
								Phone Number:
							</label>
							<input
								type='text'
								name='phoneNumber'
								value={formData.phoneNumber}
								onChange={handleInputChange}
								placeholder='Enter your phone number'
								required
								className='bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg'
							/>
						</div>
					</div>
				</div>

				{/* ADDRESS */}
				<div className='grid grid-cols-3 mb-10'>
					<div className='col-span-1'>
						<p className='tracking-wide font-medium'>Address Info</p>
					</div>

					<div className='col-span-2'>
						<div className='flex flex-col gap-y-1 mb-5'>
							<label className='text-left text-xs text-slate-500 font-semibold'>
								Full Address:
							</label>
							<input
								type='text'
								name='fullAddress'
								value={formData.fullAddress}
								onChange={handleInputChange}
								placeholder='Region, Province, City, Barangay'
								required
								className='bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg'
							/>
						</div>

						<div className='flex flex-col gap-y-1 mb-5'>
							<label className='text-left text-xs text-slate-500 font-semibold'>Postal Code:</label>
							<input
								type='text'
								name='postalCode'
								value={formData.postalCode}
								onChange={handleInputChange}
								placeholder='1555'
								required
								className='bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg'
							/>
						</div>

						<div className='flex flex-col gap-y-1 mb-5'>
							<label className='text-left text-xs text-slate-500 font-semibold'>Street:</label>
							<input
								type='text'
								name='street'
								value={formData.street}
								onChange={handleInputChange}
								placeholder='Street Name, Building, House No.'
								required
								className='bg-gray-200 text-sm font-medium px-4 py-2 rounded-lg'
							/>
						</div>
					</div>
				</div>

				<div className='flex justify-end'>
					<button
						type='submit'
						className='bg-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-800 hover:font-semibold'
					>
						Save Address
					</button>
				</div>
			</form>
		</div>
	);
};

export default CollectorAddress;
