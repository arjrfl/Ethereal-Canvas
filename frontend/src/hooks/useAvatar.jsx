import { useMemo } from 'react';

export const useAvatar = (avatar, fullName) => {
	const avatarContent = useMemo(() => {
		if (avatar && avatar.length === 2) {
			// If avatar is just two characters, display them as text
			return <span className='text-4xl'>{avatar}</span>;
		} else if (avatar && avatar.startsWith('https')) {
			// If avatar is a URL, display the image
			return <img src={avatar} alt='User Avatar' className='w-full h-full object-cover' />;
		} else if (fullName) {
			// Default to the first two initials of the full name
			return <span className='text-4xl'>{fullName.slice(0, 2).toUpperCase()}</span>;
		}
		return null;
	}, [avatar, fullName]);

	return avatarContent;
};
