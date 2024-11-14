import mongoose from 'mongoose';

const collectorSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		gender: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		status: { type: String, enum: ['Approved', 'Disabled'], default: 'Approved' },
	},
	{ timestamps: true }
);

const Collector = mongoose.model('Collector', collectorSchema);

export default Collector;
