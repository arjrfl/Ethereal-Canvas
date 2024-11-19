import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		role: { type: String, default: 'admin', enum: ['admin'] },
		refreshToken: { type: String, select: false },
	},
	{ timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
