import { useState, useEffect, useRef, useMemo } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';

import { showToast } from '../utils/toastUtils';

import useFetchData from '../hooks/useFetchDataPrivateRoute';
import usePostData from '../hooks/usePostData';
import useRandomColor from '../hooks/useRandomColor';

import { formatDate } from '../utils/dateUtils';

import Navbar from './NavbarAdminDashboard';

const DashboardAdminCollectorList = () => {
	const [reason, setReason] = useState('');
	const [refetchTrigger, setRefetchTrigger] = useState(0);
	const [filters, setFilters] = useState({ status: '' });
	const [selectedCollector, setSelectedCollector] = useState(null);

	const { postData, isPosting, postError, postResponse } = usePostData();
	const {
		responseData: collectors,
		statusSummary,
		loading,
		error,
	} = useFetchData('/admin/collectors', filters, refetchTrigger);

	const { generateColorArray } = useRandomColor();
	const randomColorsRef = useRef([]);
	useEffect(() => {
		if (collectors && collectors.length > 0 && randomColorsRef.current.length === 0) {
			randomColorsRef.current = generateColorArray(collectors.length);
		}
	}, [collectors, generateColorArray]);

	const handleDisable = async () => {
		if (!reason.trim()) {
			showToast.error('Please provide a reason for disabling the artist');
			return;
		}

		try {
			showToast.info('Processing disabling...');

			const { responseData, error } = await postData(
				`/admin/disable-collector/${selectedCollector._id}`,
				{ reason },
				'PATCH'
			);

			if (!error) {
				showToast.success(responseData);
				setRefetchTrigger(prev => prev + 1);
			} else {
				showToast.error('Disabling failed');
				console.error('Disabling failed:', error);
			}
		} catch (error) {
			showToast.error('Unexpected error occurred');
			console.log(error);
		}
		setReason('');
		setSelectedCollector(null);
	};

	const handleFilterChange = e => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	const getInitials = name => {
		if (!name) return '';
		const nameParts = name.split(' ');
		const initials = nameParts.map(part => part[0]).join('');
		return initials.toUpperCase().slice(0, 2);
	};

	return (
		<div className='container mx-auto font-custom'>
			<Navbar />

			{loading && <p>Loading collector...</p>}
			{error && <p className='text-red-500'>{error}</p>}

			{/* SUM OF EACH STATUS */}
			<div className='grid grid-cols-4 text-sm xl:text-base gap-3 mb-6'>
				<div className='bg-green-200 rounded-xl flex flex-col px-4 gap-2 lg:py-5 xl:py-4'>
					<p className='w-8 h-8 xl:w-10 xl:h-10 bg-green-500 text-white rounded-lg flex justify-center items-center text-lg xl:text-2xl font-semibold'>
						{statusSummary?.active || 0}
					</p>
					<p className='text-green-500 font-bold'>Collector Active</p>
				</div>
				<div className='bg-gray-200 rounded-xl flex flex-col px-4 gap-2 lg:py-5 xl:py-4'>
					<p className='w-8 h-8 xl:w-10 xl:h-10 bg-gray-500 text-white rounded-lg flex justify-center items-center text-lg xl:text-2xl font-semibold'>
						{statusSummary?.disable || 0}
					</p>
					<p className='text-gray-500 font-bold'>Collector Disable</p>
				</div>
			</div>

			{/* HEADERS */}
			<div className='grid grid-cols-3 text-sm font-medium pb-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 lg:px-2 xl:grid-cols-12'>
				<p className='col-span-2'>Name</p>
				<p className='col-span-2'>Email</p>
				<p className='col-span-1 xl:col-span-2 xl:text-center'>Registered</p>
				<p className='col-span-1 text-center xl:col-span-2'>Gender</p>
				<div className='relative flex items-center col-span-1 xl:col-span-2'>
					<select
						name='status'
						value={filters.status}
						onChange={handleFilterChange}
						className='appearance-none bg-transparent flex-1 text-center pr-2'
					>
						<option value=''>All Status</option>
						<option value='active'>Active</option>
						<option value='disable'>Disable</option>
					</select>
					<MdKeyboardArrowDown className='absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none' />
				</div>
				<p className='col-span-1 text-center xl:col-span-2'>Action</p>
			</div>

			{/* COLLECTOR LIST */}
			<div className='text-xs overflow-y-auto lg:max-h-[587px] xl:max-h-[586px] rounded-lg scrollbar-none'>
				{collectors?.map((collector, index) => (
					<div
						key={collector._id}
						className='border-b grid grid-cols-3 bg-white sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-12 items-center py-3 px-2'
					>
						<div className='col-span-2 flex items-center'>
							{collector.avatar ? (
								<img
									src={collector.avatar}
									alt='collector avatar'
									className='w-7 h-7 rounded-md object-cover'
								/>
							) : (
								// FALLBACK AVATAR
								<div
									className='w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-semibold'
									style={{ backgroundColor: randomColorsRef.current[index] }}
								>
									{getInitials(collector.fullName)}
								</div>
							)}
							<p className='pl-3'>{collector.fullName}</p>
						</div>
						<p className='col-span-2'>{collector.email}</p>
						<p className='col-span-1 xl:col-span-2 xl:text-center'>
							{formatDate(collector.createdAt)}
						</p>
						<p className='col-span-1 text-center xl:col-span-2'>{collector.gender}</p>
						<div className='flex justify-center'>
							<span
								className={`text-xs font-medium px-2 py-1 rounded-md ${
									collector.status === 'active'
										? 'bg-green-100 text-green-600'
										: 'bg-gray-100 text-gray-600'
								}`}
							>
								{collector.status}
							</span>
						</div>
						<button
							className='col-span-1 xl:col-span-2 bg-red-500 mx-auto max-w-20 w-full text-white text-[10px] py-1 rounded-md hover:bg-red-600'
							onClick={() => setSelectedCollector(collector)}
						>
							Disable
						</button>
					</div>
				))}
			</div>

			{/* MODAL */}
			{selectedCollector && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
					<div className='bg-white p-5 rounded-md w-[90%] max-w-md'>
						<h3 className='text-lg font-semibold mb-3'>
							Disable {selectedCollector.fullName}'s account
						</h3>
						<textarea
							className='w-full border rounded-md p-2 mb-4'
							rows='4'
							placeholder='Provide a reason for disabling this account...'
							value={reason}
							onChange={e => setReason(e.target.value)}
						></textarea>
						<div className='flex justify-end gap-2'>
							<button
								className='bg-gray-300 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-400'
								onClick={() => {
									setSelectedCollector(null);
									setReason('');
								}}
							>
								Cancel
							</button>
							<button
								className='bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600'
								onClick={handleDisable}
							>
								Confirm Disable
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardAdminCollectorList;
