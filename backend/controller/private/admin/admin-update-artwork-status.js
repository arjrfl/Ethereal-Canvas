import nodemailer from 'nodemailer';
import Artwork from '../../../models/model-artwork.js';
import Artist from '../../../models/model-artist.js';

export const artworkApprove = async (req, res) => {
	try {
		const artworkId = req.params.id;

		// Fetch the artwork by ID
		const artwork = await Artwork.findById(artworkId);

		if (!artwork) return res.status(404).json({ error: 'Artwork not found.' });

		// If the artwork is already approved
		if (artwork.status === 'approve')
			return res.status(400).json({ error: 'Artwork is already approved.' });

		// Fetch the artist using the user reference from the artwork model
		const artist = await Artist.findById(artwork.user);

		if (!artist) return res.status(400).json({ error: 'Artist not found.' });

		// Get the artist's email
		const artistEmail = artist.email;

		if (!artistEmail) return res.status(400).json({ error: 'Artist email not found.' });

		// Set up nodemailer transporter with environment variables for security
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER, // Your email here
				pass: process.env.EMAIL_PASS, // Your email password here
			},
		});

		// Email content
		const mailOptions = {
			from: 'Ethereal Yeah Yeah Canvas <no-reply@example.com>', // sender address
			to: artistEmail, // recipient address
			subject: 'Your Artwork Has Been Approved', // Subject line
			text: `Dear ${artist.fullName},\n\nCongratulations! Your artwork titled "${artwork.title}" has been successfully approved. It will now be displayed on our platform.\n\nThank you for your submission!`, // Email body
		};

		// Send the email to the artist
		await transporter.sendMail(mailOptions);

		// If email is sent successfully, update the artwork status to 'approve'
		artwork.status = 'approve';
		await artwork.save();

		// Respond with a success message
		res.status(200).json({ message: 'Artwork approved and email sent to the artist.' });
	} catch (error) {
		// Catch any errors and send appropriate response
		res.status(500).json({ error: 'Error approving artwork', details: error.message });
		console.error('Approval Error:', error);
	}
};

export const artworkReject = async (req, res) => {
	try {
		const artworkId = req.params.id;

		// Fetch the artwork by ID
		const artwork = await Artwork.findById(artworkId);

		if (!artwork) return res.status(404).json({ error: 'Artwork not found.' });

		// If the artwork is already approved
		if (artwork.status === 'reject')
			return res.status(400).json({ error: 'Artwork is already reject.' });

		// Fetch the artist using the user reference from the artwork model
		const artist = await Artist.findById(artwork.user);

		if (!artist) return res.status(400).json({ error: 'Artist not found.' });

		// Get the artist's email
		const artistEmail = artist.email;

		if (!artistEmail) return res.status(400).json({ error: 'Artist email not found.' });

		// Set up nodemailer transporter with environment variables for security
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER, // Your email here
				pass: process.env.EMAIL_PASS, // Your email password here
			},
		});

		// Email content
		const mailOptions = {
			from: 'Ethereal Yeah Yeah Canvas <no-reply@example.com>', // sender address
			to: artistEmail, // recipient address
			subject: 'Your Artwork Has Been Approved', // Subject line
			text: `Dear ${artist.fullName},\n\nCongratulations! Your artwork titled "${artwork.title}" has been successfully approved. It will now be displayed on our platform.\n\nThank you for your submission!`, // Email body
		};

		// Send the email to the artist
		await transporter.sendMail(mailOptions);

		// If email is sent successfully, update the artwork status to 'approve'
		artwork.status = 'reject';
		await artwork.save();

		// Respond with a success message
		res.status(200).json({ message: 'Artwork Reject and email sent to the artist.' });
	} catch (error) {}
};

export const artworkDisable = async (req, res) => {
	try {
		const artworkId = req.params.id;
		const { reason } = req.body;

		// Fetch the artwork by ID
		const artwork = await Artwork.findById(artworkId);

		if (!artwork) return res.status(404).json({ error: 'Artwork not found.' });

		// If the artwork is already approved
		if (artwork.status === 'disable')
			return res.status(400).json({ error: 'Artwork is already disable.' });

		// Fetch the artist using the user reference from the artwork model
		const artist = await Artist.findById(artwork.user);

		if (!artist) return res.status(400).json({ error: 'Artist not found.' });

		// Get the artist's email
		const artistEmail = artist.email;

		if (!artistEmail) return res.status(400).json({ error: 'Artist email not found.' });

		// Set up nodemailer transporter with environment variables for security
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER, // Your email here
				pass: process.env.EMAIL_PASS, // Your email password here
			},
		});

		// Email content
		const mailOptions = {
			from: 'Ethereal Yeah Yeah Canvas <no-reply@example.com>', // sender address
			to: artistEmail, // recipient address
			subject: 'Your Artwork Has Been Disable', // Subject line
			text: `Dear ${artist.fullName},\n\nCongratulations! Your artwork titled "${artwork.title}" has been successfully disabled. The reason is ${reason} It will now be displayed on our platform.\n\nThank you for your submission!`, // Email body
		};

		// Send the email to the artist
		await transporter.sendMail(mailOptions);

		// If email is sent successfully, update the artwork status to 'approve'
		artwork.status = 'disable';
		await artwork.save();

		// Respond with a success message
		res.status(200).json({ message: 'Artwork Disabled and email sent to the artist.' });
	} catch (error) {}
};
