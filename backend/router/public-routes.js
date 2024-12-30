import express from 'express';
import { loginAdmin } from '../controller/public/login-admin-controller.js';
import { loginArtist } from '../controller/public/login-artist-controller.js';
import { loginCollector } from '../controller/public/login-collector-controller.js';
import { registerArtist } from '../controller/public/register-artist-controller.js';
import { registerCollector } from '../controller/public/register-collector-controller.js';

import { refreshToken } from '../controller/public/refresh-token-controller.js';

import { validateArtistEmail } from '../controller/public/register-artist-email-search.js';

import {
	getApproveArtist,
	getApprovedArtistsWithRecentArtwork,
} from '../controller/public/get-artists.js';

import { getArtworks } from '../controller/public/get-artworks.js';
import { getArtworkById } from '../controller/public/get-artwork-by-id.js';
import { getArtistById } from '../controller/public/get-artist-by-id.js';

const router = express.Router();

// LOGIN
router.post('/login/admin', loginAdmin);
router.post('/login/artist', loginArtist);
router.post('/login/collector', loginCollector);

// REGISTER
// router.post('/register/admin', registerAdmin) // should be private
router.post('/register/artist', registerArtist);
router.get('/check-email/:email', validateArtistEmail);
router.post('/register/collector', registerCollector);

// REFRESH TOKEN
router.post('/refresh-token', refreshToken);

// RETRIEVE ARTIST
router.get('/artists', getApprovedArtistsWithRecentArtwork); // FOR HOME SECTION ONLY
router.get('/approve-artists', getApproveArtist);
router.get('/artist/:id', getArtistById);

// ARTWORK SECTION
router.get('/artworks', getArtworks);
router.get('/artwork/:id', getArtworkById);

export default router;
