import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		middle: { type: String },
		gender: { type: String },
		birthDate: { type: Date },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true },
		region: { type: String, required: true },
		province: { type: String, required: true },
		city: { type: String, required: true },
		aboutYourself: { type: String, maxLength: 1000 },
		avatar: { type: String },
		workspace: { type: String },
		validId: { type: String, required: true },
		selfieWithId: { type: String, required: true },
		sharedDrive: { type: String, required: true },
		status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
	},
	{ timestamps: true }
);

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
