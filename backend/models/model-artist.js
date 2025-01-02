import mongoose from 'mongoose';

const avatars = [
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735241404/zg5lx0tjqfnemlakcz3z.png',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735241404/xf8kwzoiynafvawzspz1.png',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735241404/metp9hjaqzugfr8pf3bp.png',
	'https://res.cloudinary.com/ddeqjbdzb/image/upload/v1735241404/cht5acqkhwojqw2y0kug.png',
];

const artistSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, select: false },
		avatar: {
			type: String,
			default: () => avatars[Math.floor(Math.random() * avatars.length)],
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
		status: { type: String, enum: ['pending', 'approve', 'reject', 'disable'], default: 'pending' },
		refreshToken: { type: String, select: false },
		artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
		socialLinks: [{ type: String }],
	},
	{ timestamps: true }
);

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
