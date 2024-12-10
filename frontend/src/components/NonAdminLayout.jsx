import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const NonAdminLayout = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	);
};

export default NonAdminLayout;
