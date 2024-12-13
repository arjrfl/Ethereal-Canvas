export const formatDate = isoString => {
	if (!isoString) return '';
	const date = new Date(isoString);
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}).format(date);
};
