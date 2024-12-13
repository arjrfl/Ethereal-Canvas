// hooks/useRandomColor.js
const useRandomColor = () => {
	const generateRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const generateColorArray = length => Array.from({ length }, generateRandomColor);

	return { generateRandomColor, generateColorArray };
};

export default useRandomColor;
