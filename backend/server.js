import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Artist from './models/artistModel.js';

dotenv.config();

const app = express();

app.use(express.json()); // MW parse incoming JSON

// ARTIST: registration
app.post('/artist/register', async (req, res) => {
	const { firstName, lastName, email, phone, validId, selfieWithId, sharedDrive } = req.body;

	if (!firstName || !lastName || !email || !phone || !validId || !selfieWithId || !sharedDrive) {
		return res.status(400).json({
			success: false,
			message: 'Provide missing fields',
		});
	}

	const newArtist = new Artist(req.body);

	console.log(newArtist);

	try {
		await newArtist.save();
		res.status(201).json({ success: true, data: newArtist });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// ARTIST: retrieving pending request
app.get('/admin/artists/requests', async (req, res) => {
	try {
		const pendingArtists = await Artist.find({ status: 'Pending' });
		res.status(200).json({ success: true, data: pendingArtists });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// ARTIST: Approve an artist by updating status to "Approved"
app.patch('/admin/artists/approve/:id', async (req, res) => {
	try {
		const { id } = req.params;
		console.log(`id: ${id}`);
		const updatedArtist = await Artist.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });

		if (!updatedArtist) {
			return res.status(404).json({ success: false, message: 'Artist not found' });
		}

		res.status(200).json({ success: true, data: updatedArtist });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

// ARTIST: Get all artists with "Approved" status
app.get('/admin/artists/approved', async (req, res) => {
	try {
		const approvedArtists = await Artist.find({ status: 'Approved' });
		res.status(200).json({ success: true, data: approvedArtists });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

app.delete('/artist/data/:id', async (req, res) => {
	const { id } = req.params;

	console.log(`id: ${id}`);

	try {
		await Artist.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: 'Artist deleted' });
	} catch (error) {}
});

app.listen(5000, () => {
	connectDB();
	console.log('Server listen at http://localhost:5000');
});
