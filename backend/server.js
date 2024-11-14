import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import dashboardArtistRoutes from './routes/dashboard-artist.js';
import dashboardCollectorRoutes from './routes/dashboard-collector.js';
import userRegistrationRoutes from './routes/userRegistration.js';

dotenv.config();

const app = express();

app.use(express.json()); // MW parse incoming JSON

// ACCOUNT REGISTRATION
app.use('/register', userRegistrationRoutes);

// ADMIN DASHBOARD ROUTES
app.use('/admin', dashboardArtistRoutes);
app.use('/admin', dashboardCollectorRoutes);

app.listen(5000, () => {
	connectDB();
	console.log('Server listen at http://localhost:5000');
});
