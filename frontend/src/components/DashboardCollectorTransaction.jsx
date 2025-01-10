// import useFetchUserData from '../hooks/useFetchUserData';

// const CollectorTransaction = () => {
// 	const { userData, loading, error } = useFetchUserData('/collector/transaction');

// 	if (loading) return <div>Loading...</div>;
// 	if (error) return <div>{error}</div>;

// 	if (userData.transactions && userData.transactions.length === 0) {
// 		return <div>No transactions yet.</div>;
// 	}

// 	return (
// 		<div>
// 			<ul className='grid grid-cols-4 gap-5'>
// 				{userData.transactions.map(transaction => (
// 					<li key={transaction.referenceNumber} className='bg-green-100'>
// 						<h3>{transaction.artworkTitle}</h3>
// 						<img src={transaction.artworkImage} alt='' />
// 						<p>Ref num: {transaction.referenceNumber}</p>
// 						<p>Artist: {transaction.artistDetails.fullName}</p>
// 						<p>Amount: ${transaction.amount}</p>
// 						<p>Artwork Title: {transaction.artworkTitle}</p>
// 						<p>
// 							Date:{' '}
// 							{new Date(transaction.transactionDate).toLocaleString('en-US', {
// 								month: 'long', // Full month name
// 								day: 'numeric', // Day of the month
// 								year: 'numeric', // Full year
// 								hour: 'numeric', // Hour (12-hour format)
// 								minute: '2-digit', // Two-digit minute
// 								hour12: true, // Enable AM/PM format
// 							})}
// 						</p>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default CollectorTransaction;

import useFetchUserData from '../hooks/useFetchUserData';

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
						<th className='px-4 py-2'>Reference Number</th>
						<th className='px-4 py-2'>Artist</th>
						<th className='px-4 py-2'>Amount</th>
						<th className='px-4 py-2'>Transaction Date</th>
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
							<td className='px-4 py-2'>{transaction.referenceNumber}</td>
							<td className='px-4 py-2'>
								<div>
									<p>{transaction.artistDetails.fullName}</p>
									<p>{transaction.artistDetails.email}</p>
								</div>
							</td>
							<td className='px-4 py-2'>₱{transaction.amount.toLocaleString()}</td>
							<td className='px-4 py-2'>
								{new Date(transaction.transactionDate).toLocaleString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
									hour: 'numeric',
									minute: '2-digit',
									hour12: true,
								})}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CollectorTransaction;
