import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		if (window.history.length > 2) {
			navigate(-1); // Navigate to the previous page
		} else {
			navigate('/'); // Redirect to the home page
		}
	};

	return (
		<div style={{ textAlign: 'center', padding: '50px' }}>
			<h1>Unauthorized</h1>
			<p>You do not have permission to access this page.</p>
			<button
				onClick={handleGoBack}
				style={{
					marginTop: '20px',
					padding: '10px 20px',
					fontSize: '16px',
					cursor: 'pointer',
					backgroundColor: '#007bff',
					color: '#fff',
					border: 'none',
					borderRadius: '5px',
				}}
			>
				Back
			</button>
		</div>
	);
};

export default Unauthorized;
