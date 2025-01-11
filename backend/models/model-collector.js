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
				status: { type: String, enum: ['pending', 'processing'], default: 'pending' },
				artistDetails: { fullName: String, email: String },
				artworkImage: { type: String },
				artworkTitle: String,
				artworkId: mongoose.Schema.Types.ObjectId,
				transactionDate: { type: Date },
			},
		],
		favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
		deliveryAddress: {
			fullName: { type: String },
			phoneNumber: { type: String },
			fullAddress: { type: String },
			postalCode: { type: String },
			street: { type: String },
		},
	},
	{ timestamps: true }
);

collectorSchema.pre('save', function (next) {
	if (this.isModified('fullName')) {
		const names = this.fullName.trim().split(' ');
		this.avatar = names.map(name => name[0].toUpperCase()).join('');
	}
	next();
});

const Collector = mongoose.model('Collector', collectorSchema);

export default Collector;
