import jwt from 'jsonwebtoken';

export const authorizeRoles = (...allowedRoles) => {
	return (req, res, next) => {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ error: 'No token provided' });
		}

		const token = authHeader.split(' ')[1];

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// console.log('Decoded Token:', decoded);

			req.user = decoded;

			if (!allowedRoles.includes(decoded.role)) {
				return res.status(403).json({ error: 'Access denied' });
			}

			next();
		} catch (error) {
			console.error('Token verification error:', error.message);
			res.status(401).json({ error: 'Invalid or expired token' });
		}
	};
};
