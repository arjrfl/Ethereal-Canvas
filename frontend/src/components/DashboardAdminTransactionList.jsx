import NavbarAdmin from './NavbarAdmin';

const DashboardAdminTransactionList = () => {
	return (
		<div className='container mx-auto'>
			<div className='hidden lg:block'>
				<NavbarAdmin />
			</div>

			<h1 className='text-3xl font-bold mb-4'>Transaction List</h1>
			<p>Transaction 1</p>
			<p>Transaction 2</p>
			<p>Transaction 3</p>
			<p>Transaction 4</p>
		</div>
	);
};

export default DashboardAdminTransactionList;
