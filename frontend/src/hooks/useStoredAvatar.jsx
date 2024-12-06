import { useState, useEffect } from 'react';

const useStoredAvatar = () => {
	const [userData, setUserData] = useState({
		avatar: localStorage.getItem('avatar') || '',
		name: localStorage.getItem('fullName') || '',
		email: localStorage.getItem('email') || '',
	});

	// Update state whenever relevant data in localStorage changes
	useEffect(() => {
		const handleStorageChange = () => {
			const updatedAvatar = localStorage.getItem('avatar');
			const updatedName = localStorage.getItem('fullName');
			const updatedEmail = localStorage.getItem('email');

			setUserData({
				avatar: updatedAvatar || userData.avatar,
				name: updatedName || userData.fullName,
				email: updatedEmail || userData.email,
			});
		};

		// Listen for changes to localStorage
		window.addEventListener('storage', handleStorageChange);

		// Periodically check for updates to localStorage
		const interval = setInterval(() => {
			const updatedAvatar = localStorage.getItem('avatar');
			const updatedName = localStorage.getItem('fullName');
			const updatedEmail = localStorage.getItem('email');

			if (
				updatedAvatar !== userData.avatar ||
				updatedName !== userData.fullName ||
				updatedEmail !== userData.email
			) {
				setUserData({
					avatar: updatedAvatar || userData.avatar,
					name: updatedName || userData.fullName,
					email: updatedEmail || userData.email,
				});
			}
		}, 100);

		// Cleanup on unmount
		return () => {
			window.removeEventListener('storage', handleStorageChange);
			clearInterval(interval);
		};
	}, [userData]);

	return userData; // Return the user data (avatar, name, email)
};

export default useStoredAvatar;
