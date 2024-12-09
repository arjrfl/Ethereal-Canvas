import mongoose from 'mongoose';

const ArtworkSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		artistName: { type: String, required: true },
		yearCreated: { type: String, required: true },
		medium: { type: String, required: true },
		dimension: { type: String, required: true },
		description: { type: String, required: true },
		display: { type: String, required: true },
		price: {
			type: Number,
			required: function () {
				return this.display !== 'museum';
			},
		},
		images: {
			frontView: { type: String, required: true },
			artworkWithMaterials: { type: String, required: true },
			selfieWithArtwork: { type: String, required: true },
			angleOne: { type: String, required: true },
			angleTwo: { type: String, required: true },
			angleThree: { type: String, required: true },
		},
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
		status: {
			type: String,
			enum: ['pending', 'approve', 'reject'],
			default: 'pending',
		},
	},
	{ timestamps: true }
);

const Artwork = mongoose.model('Artwork', ArtworkSchema);

export default Artwork;
