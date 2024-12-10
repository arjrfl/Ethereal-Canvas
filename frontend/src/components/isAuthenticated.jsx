import { Navigate } from 'react-router-dom';

const isAuthenticated = requiredRole => {
	const token = localStorage.getItem('accessToken');
	const role = localStorage.getItem('role');

	if (!token || !role) return false;

	try {
		const decodedToken = JSON.parse(atob(token.split('.')[1]));
		return decodedToken.role === requiredRole;
	} catch (error) {
		console.error('Invalid token:', error);
		return false;
	}
};

const ProtectedRoute = ({ children, requiredRole }) => {
	if (!isAuthenticated(requiredRole)) {
		return <Navigate to='/unauthorized' replace />;
	}

	return children;
};

export default ProtectedRoute;
