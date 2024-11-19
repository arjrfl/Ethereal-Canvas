import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, select: false },
		role: { type: String, default: 'artist', enum: ['artist'] },
		status: {
			type: String,
			enum: ['pending', 'approve', 'reject'],
			default: 'pending',
		},
		refreshToken: { type: String, select: false },
	},
	{ timestamps: true }
);

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
