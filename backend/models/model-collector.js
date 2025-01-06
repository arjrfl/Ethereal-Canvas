import mongoose from 'mongoose';

const collectorSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true, trim: true },
		avatar: { type: String },
		gender: { type: String, enum: ['male', 'female', 'other'], required: true },
		dateOfBirth: { type: Date },
		email: { type: String, required: true, unique: true, trim: true },
		password: { type: String, required: true, select: false },
		role: { type: String, default: 'collector', enum: ['collector'] },
		status: { type: String, default: 'active', enum: ['active', 'disable'] },
		refreshToken: { type: String, select: false },
		payments: [
			{
				referenceNumber: String,
				amount: Number,
				description: String,
				artistDetails: { fullName: String, email: String },
				artworkTitle: String,
				artworkId: mongoose.Schema.Types.ObjectId,
			},
		],
	},
	{ timestamps: true }
);

// Pre-save middleware to set the avatar to the user's initials
collectorSchema.pre('save', function (next) {
	if (this.isModified('fullName')) {
		const names = this.fullName.trim().split(' ');
		this.avatar = names.map(name => name[0].toUpperCase()).join('');
	}
	next();
});

const Collector = mongoose.model('Collector', collectorSchema);

export default Collector;
