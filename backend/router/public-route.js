import express from 'express';

const router = express.Router();

router.get('/public-route', async (req, res) => {
	res.status(200).json({ message: 'Welcome to EC' });
});

export default router;
