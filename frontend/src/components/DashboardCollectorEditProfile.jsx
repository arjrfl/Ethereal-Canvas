import { useEffect, useState } from 'react';
import useFetchUserData from '../hooks/useFetchUserData';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

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
			await axios.put(`http://localhost:5000/api/collector/update-profile/${user}`, formData);

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
			<div className=''>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Full Name:</label>
						<input
							type='text'
							name='fullName'
							value={formData.fullName}
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label>Gender:</label>
						<select name='gender' value={formData.gender} onChange={handleInputChange}>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
							<option value='other'>Other</option>
						</select>
					</div>

					<div>
						<label>Email:</label>
						<input type='email' name='email' value={formData.email} onChange={handleInputChange} />
					</div>

					<div>
						<label>Date of Birth:</label>
						<input
							type='date'
							name='dateOfBirth'
							value={formData.dateOfBirth}
							onChange={handleInputChange}
						/>
					</div>

					<button type='submit'>Save Changes</button>
				</form>
			</div>
		</div>
	);
};

export default UserProfile;
