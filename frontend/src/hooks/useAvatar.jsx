import { useState, useMemo } from 'react';
import axios from 'axios';

const useAvatar = (initialAvatar, fullName, setFormData) => {
	const [avatar, setAvatar] = useState(initialAvatar);
	const [avatarPreview, setAvatarPreview] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ddeqjbdzb/image/upload';
	const UPLOAD_PRESET = 'artist_avatar';

	const avatarContent = useMemo(() => {
		if (avatar?.startsWith('http')) {
			return <img src={avatar} alt='User Avatar' className='w-full h-full object-cover' />;
		} else if (fullName) {
			return (
				<span className='text-4xl font-bold'>
					{fullName
						.split(' ')
						.map(word => word[0]?.toUpperCase())
						.slice(0, 2)
						.join('')}
				</span>
			);
		}
		return null;
	}, [avatar, fullName]);

	const handleAvatarChange = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setAvatar(reader.result);
				setAvatarPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const updateAvatar = async () => {
		try {
			const userId = localStorage.getItem('id');
			const accessToken = localStorage.getItem('accessToken');
			if (!userId || !accessToken) throw new Error('No user ID or access token found');

			const file = await fetch(avatar)
				.then(res => res.blob())
				.then(blob => new File([blob], 'avatar.jpg', { type: blob.type }));

			setIsUploading(true);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', UPLOAD_PRESET);

			const cloudinaryResponse = await fetch(CLOUDINARY_UPLOAD_URL, {
				method: 'POST',
				body: formData,
			});

			if (!cloudinaryResponse.ok) throw new Error('Failed to upload image to Cloudinary');
			const cloudinaryData = await cloudinaryResponse.json();

			const response = await axios.put(
				'http://localhost:5000/api/artist/dashboard-update-avatar',
				{ avatar: cloudinaryData.secure_url },
				{ headers: { Authorization: `Bearer ${accessToken}` } }
			);

			if (response.status === 200) {
				setAvatar(cloudinaryData.secure_url);
				setFormData(prev => ({ ...prev, avatar: cloudinaryData.secure_url }));
				alert('Avatar updated successfully!');

				// Store the avatar URL in localStorage after upload
				localStorage.setItem('avatar', cloudinaryData.secure_url);
			} else {
				throw new Error('Failed to update avatar on the backend');
			}
		} catch (error) {
			console.error('Error updating avatar:', error);
			alert('Failed to update avatar. Please try again.');
		} finally {
			setIsUploading(false);
		}
	};

	const removeAvatar = async () => {
		try {
			const userId = localStorage.getItem('id');
			const accessToken = localStorage.getItem('accessToken');
			if (!userId || !accessToken) throw new Error('No user ID or access token found');

			// Send request to backend to remove avatar (set it to null)
			const response = await axios.put(
				'http://localhost:5000/api/artist/dashboard-remove-avatar',
				{ avatar: null }, // Send null to remove avatar
				{ headers: { Authorization: `Bearer ${accessToken}` } }
			);

			if (response.status === 200) {
				// Immediately update localStorage to reflect avatar removal
				localStorage.setItem('avatar', ''); // Set to empty string or null

				// Trigger the component to reflect this change
				setAvatar(null);
				setAvatarPreview(null);
				setFormData(prev => ({ ...prev, avatar: null }));
				alert('Avatar removed successfully!');
			} else {
				throw new Error('Failed to remove avatar on the backend');
			}
		} catch (error) {
			console.error('Error removing avatar:', error);
			alert('Failed to remove avatar. Please try again.');
		}
	};

	return {
		avatarContent,
		handleAvatarChange,
		updateAvatar,
		isUploading,
		avatarPreview,
		setAvatarPreview,
		removeAvatar, // Expose the removeAvatar function
	};
};

export default useAvatar;
