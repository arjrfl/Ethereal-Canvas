import nodemailer from 'nodemailer';
import Artwork from '../../../models/model-artwork.js';
import Artist from '../../../models/model-artist.js';

export const artworkApprove = async (req, res) => {
	try {
		const artworkId = req.params.id;

		const artwork = await Artwork.findById(artworkId);
		if (!artwork) return res.status(404).json({ error: 'Artwork not found.' });

		if (artwork.status === 'approve')
			return res.status(400).json({ error: 'Artwork is already approved.' });

		const artist = await Artist.findById(artwork.user);
		if (!artist) return res.status(400).json({ error: 'Artist not found.' });

		const artistEmail = artist.email;
		if (!artistEmail) return res.status(400).json({ error: 'Artist email not found.' });

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: 'Ethereal Canvas <no-reply@etherealcanvas.com>',
			to: artistEmail,
			subject: 'Your Artwork Has Been Approved',
			text: `Dear ${artist.fullName || 'Artist'},

Congratulations! Your artwork titled "${
				artwork.title
			}" has been successfully approved and is now displayed on our platform.

Thank you for sharing your creativity with us.

Best regards,
Ethereal Canvas Team`,
		};

		await transporter.sendMail(mailOptions);

		artwork.status = 'approve';
		await artwork.save();

		res.status(200).json({ message: 'Artwork approved and email sent to the artist.' });
	} catch (error) {
		res.status(500).json({ error: 'Error approving artwork', details: error.message });
		console.error('Approval Error:', error);
	}
};

export const artworkReject = async (req, res) => {
	try {
		const artworkId = req.params.id;
		const { reason } = req.body;

		const artwork = await Artwork.findById(artworkId);
		if (!artwork) return res.status(404).json({ error: 'Artwork not found.' });

		if (artwork.status === 'reject')
			return res.status(400).json({ error: 'Artwork is already rejected.' });

		const artist = await Artist.findById(artwork.user);
		if (!artist) return res.status(400).json({ error: 'Artist not found.' });

		const artistEmail = artist.email;
		if (!artistEmail) return res.status(400).json({ error: 'Artist email not found.' });

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: 'Ethereal Canvas <no-reply@etherealcanvas.com>',
			to: artistEmail,
			subject: 'Your Artwork Has Been Rejected',
			text: `Dear ${artist.fullName || 'Artist'},

We regret to inform you that your artwork titled "${artwork.title}" has been rejected.

Reason: ${reason}

If you have any questions or need further clarification, please contact our support team.

Thank you for your understanding.

Best regards,
Ethereal Canvas Team`,
		};

		await transporter.sendMail(mailOptions);

		artwork.status = 'reject';
		await artwork.save();

		res.status(200).json({ message: 'Artwork rejected and email sent to the artist.' });
	} catch (error) {
		res.status(500).json({ error: 'Error rejecting artwork', details: error.message });
	}
};

export const artworkDisable = async (req, res) => {
	try {
		const artworkId = req.params.id;
		const { reason } = req.body;

		const artwork = await Artwork.findById(artworkId);
		if (!artwork) return res.status(404).json({ error: 'Artwork not found.' });

		if (artwork.status === 'disable')
			return res.status(400).json({ error: 'Artwork is already disabled.' });

		const artist = await Artist.findById(artwork.user);
		if (!artist) return res.status(400).json({ error: 'Artist not found.' });

		const artistEmail = artist.email;
		if (!artistEmail) return res.status(400).json({ error: 'Artist email not found.' });

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: 'Ethereal Canvas <no-reply@etherealcanvas.com>',
			to: artistEmail,
			subject: 'Your Artwork Has Been Disabled',
			text: `Dear ${artist.fullName || 'Artist'},

We regret to inform you that your artwork titled "${artwork.title}" has been disabled.

Reason: ${reason}

If you have any questions or need further clarification, please contact our support team.

Thank you for your understanding.

Best regards,
Ethereal Canvas Team`,
		};

		await transporter.sendMail(mailOptions);

		artwork.status = 'disable';
		await artwork.save();

		res.status(200).json({ message: 'Artwork disabled and email sent to the artist.' });
	} catch (error) {
		res.status(500).json({ error: 'Error disabling artwork', details: error.message });
	}
};
