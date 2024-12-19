import { useMemo } from 'react';
import fallbackOne from '../assets/images/fallback-avatar/fallbackOne.png';
import fallbackTwo from '../assets/images/fallback-avatar/fallbackTwo.png';
import fallbackThree from '../assets/images/fallback-avatar/fallbackThree.png';
import fallbackFour from '../assets/images/fallback-avatar/fallbackFour.png';

const useFallBackAvatar = () => {
	const fallbackAvatars = [
		fallbackOne?.default || fallbackOne,
		fallbackTwo?.default || fallbackTwo,
		fallbackThree?.default || fallbackThree,
		fallbackFour?.default || fallbackFour,
	];

	return useMemo(() => {
		const randomIndex = Math.floor(Math.random() * fallbackAvatars.length);
		return fallbackAvatars[randomIndex];
	}, []);
};

export default useFallBackAvatar;
