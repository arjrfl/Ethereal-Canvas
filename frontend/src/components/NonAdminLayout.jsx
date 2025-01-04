import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const NonAdminLayout = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
			{/* Pass the state to the Outlet content */}
			<div className={`${isDropdownOpen ? '-z-50' : ''} relative flex-grow`}>
				<Outlet context={{ isDropdownOpen }} />
			</div>
			<Footer />
		</div>
	);
};

export default NonAdminLayout;
