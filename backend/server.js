import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import AdminDashboard from './router/routes-admin/dashboard-admin.js';

import AuthRoutes from './router/authRoutes.js';

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// routes (public)
app.use('/', AuthRoutes);

// RBAC (private) ROUTES
app.use('/api', AdminDashboard);

app.listen(5000, () => {
	connectDB();
	console.log('Server listen at http://localhost:5000');
});
