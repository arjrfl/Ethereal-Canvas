import mongoose from 'mongoose';

const artworkUpload = new mongoose.Schema(
	{
		artworkTitle: { type: String, required: true, maxLength: 100 },
		artistName: { type: String, required: true, maxLength: 50 },
		yearCreated: { type: Date, required: false },
		materials: { type: String, required: true, maxLength: 200 },
		description: { type: String, required: false, maxLength: 1000 },
		dimensions: {
			width: { type: Number, required: true },
			height: { type: Number, required: true },
			depth: { type: Number, required: false },
		},
		price: {
			type: Number,
			required: function () {
				return this.displaySection === 'Marketplace';
			},
			min: [0, 'Price cannot be negative'],
		},
		displaySection: {
			type: String,
			required: true,
			enum: ['Museum', 'Marketplace'],
		},
		images: {
			frontView: { type: String, required: true },
			closeupView: { type: String, required: false },
			artworkWithMaterials: { type: String, required: false },
			artistWithArtwork: { type: String, required: false },
		},
		status: {
			type: String,
			enum: ['Pending', 'Approve', 'Reject'],
			default: 'Pending',
		},
	},
	{ timestamps: true }
);

const Artwork = mongoose.model('Artwork', artworkUpload);

export default Artwork;

// TESTING!!!!
/*
import mongoose from 'mongoose';

const artworkUpload = new mongoose.Schema(
	{
		artworkTitle: { type: String, required: true, maxLength: 100 },
		artistName: { type: String, required: true, maxLength: 50 },
		price: {
			type: Number,
			required: function () {
				return this.displaySection === 'Marketplace';
			},
			min: [0, 'Price cannot be negative'],
		},
		displaySection: { type: String, required: true, enum: ['Museum', 'Marketplace'] },
		status: { type: String, enum: ['Pending', 'Approve', 'Reject'], default: 'Pending' },
	},
	{ timestamps: true }
);

const Artwork = mongoose.model('Artwork', artworkUpload);

export default Artwork;
*/
