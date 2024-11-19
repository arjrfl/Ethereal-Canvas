import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import RegisterAdmin from './router/routes-admin/registration-admin.js';
import RegisterArtist from './router/routes-artist/registration-artist.js';
import RegisterCollector from './router/routes-collector/registration-collector.js';

import LoginAdmin from './router/routes-admin/login-admin.js';
import LoginArtist from './router/routes-artist/login-artist.js';
import LoginCollector from './router/routes-collector/login-collector.js';

import AdminDashboard from './router/routes-admin/dashboard-admin.js';

import PublicRoute from './router/public-route.js';

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// public routes
app.use('/', PublicRoute);

app.use('/', RegisterAdmin);
app.use('/', RegisterArtist);
app.use('/', RegisterCollector);

app.use('/', LoginAdmin);
app.use('/', LoginArtist);
app.use('/', LoginCollector);

// RBAC (private) ROUTES
app.use('/api', AdminDashboard);

app.listen(5000, () => {
	connectDB();
	console.log('Server listen at http://localhost:5000');
});
