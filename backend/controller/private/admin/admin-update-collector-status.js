import nodemailer from 'nodemailer';
import Collector from '../../../models/model-collector.js';

// endpoint:
// /api/admin/disable-collector/1234
export const disableCollector = async (req, res) => {
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
};
