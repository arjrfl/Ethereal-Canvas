import { Link, Outlet, useLocation } from 'react-router-dom';

const CollectorDashboard = () => {
	return (
		<div className='container max-w-full xl:max-w-[90rem] mx-auto font-custom'>
			<div>
				<div className='mb-4'>
					<h1 className='text-3xl font-bold'>Collector Dashboard</h1>
					<p>Welcome to your dashboard! Manage your collections here.</p>
				</div>

				<ul className='flex gap-x-1'>
					{[
						{
							path: '/collector/dashboard/edit-profile',
							label: 'Profile',
						},

						{
							path: '/collector/dashboard/address',
							label: 'Address',
						},

						{
							path: '/collector/dashboard/favorites',
							label: 'Favorites',
						},

						{
							path: '/collector/dashboard/transaction',
							label: 'Transaction',
						},
					].map((item, index) => (
						<li key={index}>
							<Link to={item.path}>
								<p>{item.label}</p>
							</Link>
						</li>
					))}
				</ul>

				<div>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default CollectorDashboard;
