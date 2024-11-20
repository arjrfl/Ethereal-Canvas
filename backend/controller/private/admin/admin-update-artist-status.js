import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

import Artist from '../../../models/model-artist.js';

// endpoint:
// /api/admin/approve-artist/1234
export const approveArtist = async (req, res) => {
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
};

// endpoint:
// /api/admin/reject-artist/1234
export const rejectArtist = async (req, res) => {
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
};
