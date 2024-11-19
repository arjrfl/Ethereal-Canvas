import mongoose from 'mongoose';

const collectorSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, trim: true },
		password: { type: String, required: true, select: false },
		role: { type: String, default: 'collector', enum: ['collector'] },
		status: { type: String, default: 'active', enum: ['active', 'disable'] },
		refreshToken: { type: String, select: false },
	},
	{ timestamps: true }
);

const Collector = mongoose.model('Collector', collectorSchema);

export default Collector;
