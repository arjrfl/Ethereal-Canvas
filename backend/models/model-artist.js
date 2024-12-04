import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, select: false },
		avatar: {
			type: String,
			default: function () {
				// Extracts the initials from fullName (first and last word initials)
				const nameParts = this.fullName.split(' ');
				const initials = nameParts.map(name => name.charAt(0).toUpperCase()).join('');
				return initials;
			},
		},
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
