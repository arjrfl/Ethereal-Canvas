import express from 'express';
import Artist from '../../models/model-artist.js';
import Collector from '../../models/model-collector.js';
import { authorizeRoles } from '../../middleware/authorizeRoles.js';

import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

const router = express.Router();

// endpoint: approve, pending, reject
// /api/admin/artist?status=approve
// /api/admin/artist?status=pending
// /api/admin/artist?status=reject
router.get('/admin/artist', authorizeRoles('admin'), async (req, res) => {
	try {
		const { status } = req.query;

		if (!status) {
			return res.status(400).json({ success: false, message: 'Missing status' });
		}

		const filter = { status };

		const artist = await Artist.find(filter);
		res.status(200).json({ success: true, data: artist });
	} catch (error) {
		console.log(`Error: ${error}`);
		res.status(500).json({ message: 'Error fetching artworks', error });
	}
});

// endpoint: active, disable
// /api/admin/collector/?status=active
// /api/admin/collector/?status=disable
router.get('/admin/collector', authorizeRoles('admin'), async (req, res) => {
	try {
		const { status } = req.query;

		if (!status) {
			return res.status(400).json({ success: false, message: 'Missing status' });
		}

		const filter = { status };

		const collector = await Collector.find(filter);
		res.status(200).json({ success: true, data: collector });
	} catch (error) {
		console.log(`Error: ${error}`);
		res.status(500).json({ message: 'Error fetching artworks', error });
	}
});

///////////////////////////////////////////////////////////////
// UPDATE USER

// update artist (STATUS MUST BE PENDING!!!)
// `BUTTON`: UPDATE USER STATUS TO APPROVE
router.patch('/admin/approve/:id', authorizeRoles('admin'), async (req, res) => {
	try {
		const artistId = req.params.id;

		const artist = await Artist.findById(artistId);

		if (!artist) {
			return res.status(404).json({ error: 'Artist not found' });
		}

		if (artist.status === 'approve') {
			return res.status(400).json({ error: 'Artist is already approved.' });
		}

		const temporaryPassword = Math.random().toString(36).slice(-8);
		const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

		artist.status = 'approve';
		artist.password = hashedPassword;
		await artist.save();

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: 'Ethereal Yeah Yeah Canvas',
			to: artist.email,
			subject: 'Your Artist Account Has Been Approved',
			text: `Congratulations! Your artist account has been approved.\n\nUsername: ${artist.email}\nTemporary Password: ${temporaryPassword}\n\nPlease log in and change your password.`,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: 'Artist approved and email sent.' });
	} catch (error) {
		res.status(500).json({ error: 'Error approving artist', details: error.message });
	}
});

// update artist (STATUS MUST BE PENDING!!!)
// `BUTTON`: UPDATE USER STATUS TO REJECT
router.patch('/admin/reject/:id', authorizeRoles('admin'), async (req, res) => {
	try {
		const artistId = req.params.id;

		const artist = await Artist.findById(artistId);

		if (!artist) {
			return res.status(404).json({ error: 'Artist not found' });
		}

		if (artist.status === 'reject') {
			return res.status(400).json({ error: 'Artist is already rejected.' });
		}

		artist.status = 'reject';
		await artist.save();

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: 'Ethereal Yeah Yeah Canvas',
			to: artist.email,
			subject: 'Your Artist Account Registration Has Been Rejected',
			text: `We regret to inform you that your artist account registration has been rejected.\n\nIf you believe this was a mistake or need further clarification, please contact our support team.\n\nThank you for your interest in Ethereal Canvas.`,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: 'Artist rejected and email sent.' });
	} catch (error) {
		res.status(500).json({ error: 'Error rejecting artist', details: error.message });
	}
});

// update collector (STATUS MUST BE DISABLE!!!)
// `BUTTON`: UPDATE USER STATUS TO DISABLE
router.patch('/admin/disable/:id', authorizeRoles('admin'), async (req, res) => {
	try {
		const collectorId = req.params.id;

		const collector = await Collector.findById(collectorId);

		if (!collector) {
			return res.status(404).json({ error: 'Collector not found' });
		}

		if (collector.status === 'disable') {
			return res.status(400).json({ error: 'Collector account is already disabled.' });
		}

		collector.status = 'disable';
		await collector.save();

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: 'Ethereal Yeah Yeah Canvas',
			to: collector.email,
			subject: 'Your Collector Account Has Been Disabled',
			text: `Your collector account has been disabled. If you need further assistance, please contact support.`,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: 'Collector disabled and email sent.' });
	} catch (error) {
		res.status(500).json({ error: 'Error disabling collector', details: error.message });
	}
});

export default router;
