import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Dropdown = ({ label, options, logout, avatar, role }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleOptionClick = option => {
		if (option.value === 'logout') {
			logout();
		} else {
			if (option.value === 'dashboard') {
				navigate(`/${role}/dashboard`);
			}
		}
		setIsOpen(false);
	};

	const handleClickOutside = event => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative' ref={dropdownRef}>
			<button onClick={toggleDropdown} className='flex items-center'>
				{avatar ? avatar : label}
			</button>

			{isOpen && (
				<div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg text-sm'>
					{options.map(option => (
						<div
							key={option.value}
							onClick={() => handleOptionClick(option)}
							className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
						>
							{option.label}
						</div>
					))}
					{logout && (
						<div
							onClick={() => handleOptionClick({ value: 'logout', label: 'Logout' })}
							className='px-4 py-2 hover:bg-red-500 hover:rounded-b-lg hover:text-white cursor-pointer text-red-500'
						>
							Logout
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
