import { Link, Outlet, useLocation } from 'react-router-dom';
import useFetchUserData from '../hooks/useFetchUserData';
import { useState } from 'react';

const CollectorDashboard = () => {
	const location = useLocation();
	const [refetchTrigger, setRefetchTrigger] = useState(0);
	const user = localStorage.getItem('id');

	const { userData, loading, error } = useFetchUserData(
		`/collector/dashboard-profile/${user}`,
		refetchTrigger
	);

	const handleProfileUpdate = () => {
		setRefetchTrigger(prev => prev + 1);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='font-custom container max-w-[90rem] mx-auto mt-5 px-4'>
			<div className='bg-gray-100'>
				<div className='mb-7'>
					<h1 className='text-3xl font-bold'>Collector Dashboard</h1>
					<p>Welcome to your dashboard! Manage your account here.</p>
				</div>

				<ul className='flex gap-x-10 mb-5'>
					{[
						{
							path: '/collector/dashboard/edit-profile',
							label: 'Profile',
							emoji: '👤',
						},

						{
							path: '/collector/dashboard/address',
							label: 'Address',
							emoji: '📍',
						},

						{
							path: '/collector/dashboard/favorites',
							label: 'Favorites',
							emoji: '🩷',
						},

						{
							path: '/collector/dashboard/transaction',
							label: 'Transaction',
							emoji: '📃',
						},
					].map((item, index) => (
						<li key={index} className='border-b-4 border-gray-300 rounded-lg pb-1'>
							<Link
								to={item.path}
								className={`text-slate-800 font-semibold px-6 py-2 rounded-lg space-x-2 ${
									location.pathname === item.path
										? 'bg-cyan-500 text-white'
										: 'hover:bg-cyan-500 hover:text-white hover:border-b-4 hover:border-cyan-900'
								}`}
							>
								<span>{item.emoji}</span>
								<span>{item.label}</span>
							</Link>
						</li>
					))}
				</ul>

				<div className='grid grid-cols-6 grid-rows-1 gap-x-3'>
					<div className='col-span-1'>
						{userData && userData.data ? (
							<div className='flex flex-col items-center p-10 space-y-1 truncate bg-white rounded-xl'>
								<p className='w-20 underline h-20 bg-purple-400 font-semibold text-3xl flex items-center justify-center rounded-xl'>
									{userData.data.avatar}
								</p>
								<p className='font-medium'>{userData.data.fullName}</p>
								<p className='text-[10px] tracking-wider'>{userData.data.email}</p>
							</div>
						) : (
							<p>No user data available</p>
						)}
					</div>

					<div className='col-span-5 bg-white rounded-xl p-10'>
						<Outlet context={{ refetchUserData: handleProfileUpdate }} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CollectorDashboard;
