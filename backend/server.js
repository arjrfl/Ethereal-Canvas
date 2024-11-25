import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import cors from 'cors';

import publicRoutes from './router/public-routes.js';
import privateRoutes from './router/private-routes.js';

dotenv.config();

const app = express();

app.use(cors());

// middleware
app.use(express.json());

// route
app.use('/', publicRoutes);
app.use('/api', privateRoutes);

app.listen(5000, () => {
	connectDB();
	console.log('Server listen at http://localhost:5000');
});
