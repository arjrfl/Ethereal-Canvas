import { Outlet } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';

const AdminLayout = () => {
	return (
		<div>
			<NavbarAdmin />
			<Outlet />
		</div>
	);
};

export default AdminLayout;
