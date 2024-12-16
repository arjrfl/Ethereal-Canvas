import { Outlet } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';

const AdminLayout = () => {
	return (
		<div>
			<div className='lg:hidden'>
				<NavbarAdmin />
			</div>
			<Outlet />
		</div>
	);
};

export default AdminLayout;
