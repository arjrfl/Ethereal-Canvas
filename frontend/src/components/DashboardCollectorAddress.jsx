import { useEffect, useState } from 'react';
import { axiosInstancePrivate } from '../utils/axiosConfig';
import useFetchUserData from '../hooks/useFetchUserData';

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
			<h1>Address</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Full Name:</label>
					<input
						type='text'
						name='fullName'
						value={formData.fullName}
						onChange={handleInputChange}
						placeholder='Enter your full name'
						required
					/>
				</div>
				<div>
					<label>Phone Number:</label>
					<input
						type='text'
						name='phoneNumber'
						value={formData.phoneNumber}
						onChange={handleInputChange}
						placeholder='Enter your phone number'
						required
					/>
				</div>
				<div>
					<label>Full Address:</label>
					<input
						type='text'
						name='fullAddress'
						value={formData.fullAddress}
						onChange={handleInputChange}
						placeholder='Region, Province, City, Barangay'
						required
					/>
				</div>
				<div>
					<label>Postal Code:</label>
					<input
						type='text'
						name='postalCode'
						value={formData.postalCode}
						onChange={handleInputChange}
						placeholder='1555'
						required
					/>
				</div>
				<div>
					<label>Street:</label>
					<input
						type='text'
						name='street'
						value={formData.street}
						onChange={handleInputChange}
						placeholder='Street Name, Building, House No.'
						required
					/>
				</div>
				<button type='submit'>Save Address</button>
			</form>
		</div>
	);
};

export default CollectorAddress;
