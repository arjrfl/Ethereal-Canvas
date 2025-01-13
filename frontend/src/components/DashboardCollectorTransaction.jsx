import useFetchUserData from '../hooks/useFetchUserData';
import { formatPrice } from '../utils/formatPrice';

const CollectorTransaction = () => {
	const { userData, loading, error } = useFetchUserData('/collector/transaction');

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	if (userData.transactions && userData.transactions.length === 0) {
		return <div>No transactions yet.</div>;
	}

	return (
		<div className='overflow-x-auto rounded-xl'>
			<table className='min-w-full table-auto'>
				<thead>
					<tr className='bg-gray-200 text-left'>
						<th className='px-4 py-2'>Artwork</th>
						<th className='px-4 py-2'>Artist</th>
						<th className='px-4 py-2'>Reference Number</th>
						<th className='px-4 py-2'>Amount</th>
						<th className='px-4 py-2'>Transaction Date</th>
						<th className='px-4 py-2'>Status</th>
					</tr>
				</thead>
				<tbody className='text-sm'>
					{userData.transactions.map(transaction => (
						<tr key={transaction.referenceNumber} className='border-b hover:bg-gray-100'>
							{/* <td className='px-4 py-2'>{transaction.artworkTitle}</td> */}
							<td className='px-4 py-2 flex items-center gap-x-2'>
								<img
									src={transaction.artworkImage}
									alt={transaction.artworkTitle}
									className='w-14 h-14 object-cover rounded'
								/>

								<div>
									<p className='font-medium'>{transaction.artworkTitle}</p>
									<p className='text-[10px]'>ID: {transaction.artworkId}</p>
								</div>
							</td>
							<td className='px-4 py-2'>
								<div>
									<p>{transaction.artistDetails.fullName}</p>
									<p className='text-xs'>{transaction.artistDetails.email}</p>
								</div>
							</td>
							<td className='px-4 py-2'>{transaction.referenceNumber}</td>
							<td className='px-4 py-2'>{formatPrice(transaction.amount)}</td>
							<td className='px-4 py-2'>
								{new Date(transaction.transactionDate).toLocaleString('en-US', {
									month: 'short',
									day: 'numeric',
									year: 'numeric',
									hour: 'numeric',
									minute: '2-digit',
									hour12: true,
								})}
							</td>
							<td className='px-4 py-2'>{transaction.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CollectorTransaction;
