export const formatPrice = price => {
	if (price == null) return 'Contact for price';

	return `${new Intl.NumberFormat('en-PH', {
		style: 'currency',
		currency: 'PHP',
		minimumFractionDigits: 2,
	})
		.format(price)
		.replace('PHP', '')
		.trim()}`;
};
