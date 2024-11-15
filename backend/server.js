import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import dashboardArtistRoutes from './routes/dashboard-artist.js';
import dashboardCollectorRoutes from './routes/dashboard-collector.js';
import dashboardArtworks from './routes/dashboard-artwork.js';
import userRegistrationRoutes from './routes/userRegistration.js';
import artworkUpload from './routes/artwork-upload.js';

dotenv.config();

const app = express();

// (MW) parse incoming JSON
app.use(express.json());

// ACCOUNT REGISTRATION
app.use('/register', userRegistrationRoutes);

// ARTWORK UPLOAD
app.use('/artist', artworkUpload);

// ADMIN DASHBOARD ROUTES
app.use('/admin', dashboardArtistRoutes);
app.use('/admin', dashboardCollectorRoutes);
app.use('/admin', dashboardArtworks);

app.listen(5000, () => {
	connectDB();
	console.log('Server listen at http://localhost:5000');
});
