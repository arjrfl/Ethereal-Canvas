import useFetchUserData from '../hooks/useFetchUserData';

const CollectorTransaction = () => {
	// Use the custom hook to fetch transaction data
	const { userData, loading, error } = useFetchUserData('/collector/transaction');

	// Check if the data is still loading or if there is an error
	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	// If there are no transactions, display a message
	if (userData.transactions && userData.transactions.length === 0) {
		return <div>No transactions yet.</div>;
	}

	// Render the list of transactions
	return (
		<div>
			<ul className='grid grid-cols-4 gap-5'>
				{userData.transactions.map(transaction => (
					<li key={transaction.referenceNumber} className='bg-green-100'>
						<h3>{transaction.artworkTitle}</h3>
						<p>Ref num: {transaction.referenceNumber}</p>
						<p>Artist: {transaction.artistDetails.fullName}</p>
						<p>Amount: ${transaction.amount}</p>
						<p>Artwork Title: {transaction.artworkTitle}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CollectorTransaction;
