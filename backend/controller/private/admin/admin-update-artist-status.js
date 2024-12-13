import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

import Artist from '../../../models/model-artist.js';

// endpoint:
// /api/admin/approve-artist/1234
export const approveArtist = async (req, res) => {
	try {
		const artistId = req.params.id;
		const artist = await Artist.findById(artistId);

		if (!artist) return res.status(404).json({ error: 'Artist not found' });

		if (artist.status === 'approve')
			return res.status(400).json({ error: 'Artist is already approved.' });

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
			from: 'Ethereal Canvas <no-reply@etherealcanvas.com>',
			to: artist.email,
			subject: 'Welcome to Ethereal Canvas: Your Artist Account Is Approved',
			text: `Dear ${artist.name || 'Artist'},

We are thrilled to inform you that your artist account has been approved! You can now log in and start showcasing your creativity on Ethereal Canvas.

Here are your login details:

Username: ${artist.email}
Temporary Password: ${temporaryPassword}

For your security, please log in and change your password immediately.

Welcome to our vibrant community of artists. We look forward to seeing your work!

Best regards,
Ethereal Canvas Team`,
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
		const { reason } = req.body;
		const artist = await Artist.findById(artistId);

		if (!artist) return res.status(404).json({ error: 'Artist not found' });

		if (artist.status === 'reject')
			return res.status(400).json({ error: 'Artist is already rejected.' });

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
			from: 'Ethereal Canvas <no-reply@etherealcanvas.com>',
			to: artist.email,
			subject: 'Your Artist Account Registration Status',
			text: `Dear ${artist.name || 'Artist'},

Thank you for your interest in joining Ethereal Canvas. After careful review, we regret to inform you that your artist account registration has been rejected.

Reason for rejection: ${reason}

If you have any questions or believe this decision was made in error, please don’t hesitate to contact our support team at support@etherealcanvas.com.

We appreciate your understanding and wish you all the best in your artistic endeavors.

Sincerely,
Ethereal Canvas Team`,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: 'Artist rejected and email sent.' });
	} catch (error) {
		res.status(500).json({ error: 'Error rejecting artist', details: error.message });
	}
};

export const disableArtist = async (req, res) => {
	try {
		const artistId = req.params.id;
		const { reason } = req.body;

		const artist = await Artist.findById(artistId);

		if (!artist) {
			return res.status(404).json({ error: 'Artist not found' });
		}

		if (artist.status === 'disable') {
			return res.status(400).json({ error: 'Artist is already disabled.' });
		}

		artist.status = 'disable';
		await artist.save();

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: 'Ethereal Canvas <no-reply@etherealcanvas.com>',
			to: artist.email,
			subject: 'Your Artist Account Has Been Disabled',
			text: `Dear ${artist.name || 'Artist'},

We regret to inform you that your artist account has been disabled.

Reason: ${reason}

If you have any questions or require further clarification, please contact our support team at support@etherealcanvas.com.

Thank you for your understanding.

Sincerely,
Ethereal Canvas Team`,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: 'Artist disabled and email sent.' });
	} catch (error) {
		res.status(500).json({ error: 'Error disabling artist', details: error.message });
	}
};
