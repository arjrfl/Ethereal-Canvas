import useFetchData from '../hooks/useFetchDataPrivateRoute';
import { formatPrice } from '../utils/formatPrice';

const DashboardArtistTransaction = () => {
	const filters = { display: 'marketplace', status: 'approve' };

	const {
		responseData: artworks,
		loading,
		error,
	} = useFetchData('/artist/dashboard-retrieve-artworks', filters);

	return (
		<div className='overflow-x-auto rounded-xl'>
			<table className='min-w-full table-auto'>
				<thead>
					<tr className='bg-gray-200 text-left'>
						<th className='px-4 py-2'>Artwork</th>
						<th className='px-4 py-2'>Collector</th>
						<th className='px-4 py-2'>Reference Number</th>
						<th className='px-4 py-2'>Amount</th>
						<th className='px-4 py-2'>Date of order</th>
						<th className='px-4 py-2 text-center'>Action</th>
					</tr>
				</thead>

				<tbody className='text-sm'>
					{artworks?.length === 0 ? (
						<p>No transaction yet</p>
					) : (
						artworks?.map(artwork => (
							<tr key={artwork._id} className='border-b hover:bg-gray-100'>
								<td className='px-4 py-2 flex items-center gap-x-2'>
									<img
										src={artwork.images.frontView}
										alt='artwork'
										className='w-14 h-14 object-cover rounded aspect-square'
									/>

									<div>
										<p className='font-medium'>{artwork.title}</p>
										<p className='text-[10px]'>ID:{artwork._id}</p>
									</div>
								</td>
								<td className='px-4 py-2'>
									<div>
										<p className='font-medium'>Arjay Rafael</p>
										<p className='text-[10px]'>arjayrafael@gmail.com</p>
									</div>
								</td>
								<td className='px-4 py-2'>ART-1736780899256</td>
								<td className='px-4 py-2'>
									{artwork.display === 'marketplace' ? `${formatPrice(artwork.price)}` : ' '}
								</td>
								<td className='px-4 py-2'>Jan 13, 2025, 11:08 PM</td>
								<td className='px-5 py-2 text-center	'>
									<button className='bg-blue-600 text-white px-4 text-sm py-1 rounded-md hover:bg-blue-800'>
										Process
									</button>
								</td>
							</tr>
						))
					)}
					{/* <tr className='border-b hover:bg-gray-100'>
						<td></td>
					</tr> */}
				</tbody>
			</table>
		</div>
	);
};

export default DashboardArtistTransaction;
