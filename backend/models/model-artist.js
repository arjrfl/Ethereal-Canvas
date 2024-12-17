import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, select: false },
		avatar: { type: String, default: '' },
		phoneNumber: { type: String, required: true },
		dateOfBirth: { type: Date },
		location: { type: String },
		gender: { type: String, enum: ['male', 'female', 'other'] },
		aboutYourself: { type: String },
		images: {
			workspace: { type: String, required: true },
			selfieWithWorkspace: { type: String, required: true },
			validId: { type: String, required: true },
			selfieWithId: { type: String, required: true },
		},
		sharedDrive: { type: String },
		role: { type: String, default: 'artist', enum: ['artist'] },
		status: { type: String, enum: ['pending', 'approve', 'reject', 'disable'], default: 'pending' },
		refreshToken: { type: String, select: false },
		artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }], // New field to store artwork IDs
	},
	{ timestamps: true }
);

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
