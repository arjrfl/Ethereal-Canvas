const getInitials = name => {
	const nameArray = name.split(' ');
	const initials = nameArray.map(part => part[0]).join('');
	return initials.toUpperCase();
};

const Avatar = ({ src, alt, name }) => {
	const initials = getInitials(name);

	return (
		<div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-white font-bold border-2 border-gray-300'>
			{src ? (
				<img src={src} alt={alt} className='w-full h-full rounded-full' />
			) : (
				<span>{initials}</span>
			)}
		</div>
	);
};

export default Avatar;
