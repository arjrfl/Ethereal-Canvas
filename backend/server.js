import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import cors from 'cors';

import publicRoutes from './router/public-routes.js';
import privateRoutes from './router/private-routes.js';

dotenv.config();

const app = express();

const corsOptions = {
	origin: (origin, callback) => {
		if (origin === process.env.FRONTEND_URL || origin === process.env.FRONTEND_URL + '/') {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// middleware
app.use(express.json());

// route
app.use('/', publicRoutes);
app.use('/api', privateRoutes);

app.listen(5000, () => {
	connectDB();
	console.log('Server listen at http://localhost:5000');
});
