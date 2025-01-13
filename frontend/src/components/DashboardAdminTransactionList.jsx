import useFetchArtworks from '../hooks/useFetchArtworks';
import { formatPrice } from '../utils/formatPrice';
import NavbarAdmin from './NavbarAdmin';

const DashboardAdminTransactionList = () => {
	const users = [
		{ fullName: 'Alex Smith', email: 'alexS@gmail.com' },
		{ fullName: 'Jordan Johnson', email: 'jordanJ@gmail.com' },
		{ fullName: 'Taylor Brown', email: 'taylorB@gmail.com' },
		{ fullName: 'Casey Davis', email: 'caseyD@gmail.com' },
		{ fullName: 'Morgan Miller', email: 'morganM@gmail.com' },
		{ fullName: 'Bailey Wilson', email: 'baileyW@gmail.com' },
		{ fullName: 'Riley Moore', email: 'rileyM@gmail.com' },
		{ fullName: 'Dakota Taylor', email: 'dakotaT@gmail.com' },
		{ fullName: 'Quinn Anderson', email: 'quinnA@gmail.com' },
		{ fullName: 'Jamie Thomas', email: 'jamieT@gmail.com' },
	];

	function generateRandomUser() {
		return users[Math.floor(Math.random() * users.length)];
	}

	function generateRandomReference() {
		const randomDigits = Math.floor(Math.random() * 1_000_000_000_000)
			.toString()
			.padStart(12, '0'); // Ensures the number has 12 digits
		return `ART-${randomDigits}`;
	}

	const { artworks, loading, error } = useFetchArtworks('marketplace', null);

	console.log(artworks);

	return (
		<div className='container mx-auto'>
			<div className='hidden lg:block'>
				<NavbarAdmin />
			</div>

			<div>
				<table className='min-w-full table-auto'>
					<thead>
						<tr className='bg-gray-200 text-left'>
							<th className='px-4 py-2'>Artwork</th>
							<th className='px-4 py-2'>Artist</th>
							<th className='px-4 py-2'>Collector</th>
							<th className='px-4 py-2'>Amount</th>
							<th className='px-4 py-2'>Date</th>
							<th className='px-4 py-2'>Ref#</th>
							<th className='px-4 py-2'>Status</th>
						</tr>
					</thead>

					<tbody className='text-sm'>
						{artworks && artworks.length > 0 ? (
							artworks.map(artwork => (
								<tr key={artwork._id} className='border-b hover:bg-gray-200'>
									<td className='px-4 py-2 flex items-center gap-x-2'>
										<img
											src={artwork.images.frontView}
											alt='artwork'
											className='w-14 h-14 object-cover rounded aspect-square'
										/>

										<div>
											<p className='font-medium'>{artwork.title}</p>
											<p className='text-[10px]'>ID: {artwork._id}</p>
										</div>
									</td>

									<td className='px-4 py-2'>
										<div>
											<p className='font-medium'>{artwork.user?.fullName}</p>
											<p className='text-xs'>{artwork.user?.email}</p>
										</div>
									</td>

									<td className='px-4 py-2'>
										<div>
											{(() => {
												const { fullName, email } = generateRandomUser();
												return (
													<>
														<p className='font-medium'>{fullName}</p>
														<p className='text-xs'>{email}</p>
													</>
												);
											})()}
										</div>
									</td>

									<td className='px-4 py-2'>{formatPrice(artwork.price)}</td>

									<td className='px-4 py-2'>Jan 13, 2025, 11:08 PM</td>

									<td className='px-4 py-2'>{generateRandomReference()}</td>

									<td className='px-4 py-2'>
										<button className='bg-blue-600 text-white px-4 text-xs py-1 rounded-md border border-blue-800 hover:bg-blue-800'>
											Processing
										</button>
									</td>
								</tr>
							))
						) : (
							<p>No transaction yet</p>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DashboardAdminTransactionList;
