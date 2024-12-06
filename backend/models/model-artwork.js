// import mongoose from 'mongoose';

// const artworkSchema = new mongoose.Schema({
// 	images: {
// 		frontView: { type: String, required: true },
// 		artworkWithMaterials: { type: String, required: true },
// 		selfieWithArtwork: { type: String, required: true },
// 		angleOne: { type: String, required: true },
// 		angleTwo: { type: String, required: true },
// 		angleThree: { type: String, required: true },
// 	},
// });

// const Artwork = mongoose.model('Artwork', artworkSchema);

// export default Artwork;

import mongoose from 'mongoose';

const ArtworkSchema = new mongoose.Schema(
	{
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
