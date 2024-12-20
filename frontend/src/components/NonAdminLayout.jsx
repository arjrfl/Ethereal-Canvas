import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const NonAdminLayout = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default NonAdminLayout;
