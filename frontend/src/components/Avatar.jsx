const getInitials = name => {
	const nameArray = name.split(' ');
	const initials = nameArray.map(part => part[0]).join('');
	return initials.toUpperCase();
};

const Avatar = ({ src, alt, name }) => {
	const initials = getInitials(name);

	return (
		<div className='w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center bg-gray-300 text-white font-bold'>
			{src ? (
				<img src={src} alt={alt} className='w-full h-full object-cover rounded-lg' />
			) : (
				<span className='text-xs'>{initials}</span>
			)}
		</div>
	);
};

export default Avatar;
