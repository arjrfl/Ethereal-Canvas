import express from 'express';
import { registerAdmin } from '../controller/private/admin/admin-register.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

import { artists } from '../controller/private/admin/admin-get-users.js';
import { artworks } from '../controller/private/admin/admin-get-artworks.js';
import { collectors } from '../controller/private/admin/admin-get-users.js';

import {
	approveArtist,
	rejectArtist,
} from '../controller/private/admin/admin-update-artist-status.js';

import { disableCollector } from '../controller/private/admin/admin-update-collector-status.js';

import { getArtistDashboardProfile } from '../controller/private/artist/artist-dashboard-get-profile.js';
import { ArtistUpdateDetails } from '../controller/private/artist/artist-dashboard-update-details.js';
import { ArtistUpdateAvatar } from '../controller/private/artist/artist-dashboard-update-avatar.js';
import { ArtistRemoveAvatar } from '../controller/private/artist/artist-dashboard-remove-avatar.js';
import { ArtworkUpload } from '../controller/private/artist/artist-upload-artwork.js';
import { RetrieveArtworks } from '../controller/private/artist/artist-dashboard-retrieve-artworks.js';

const router = express.Router();

router.post('/admin/admin-registration', authorizeRoles('admin'), registerAdmin);

// RETRIEVE
router.get('/admin/artists', authorizeRoles('admin'), artists);
router.get('/admin/artworks', authorizeRoles('admin'), artworks);
router.get('/admin/collectors', authorizeRoles('admin'), collectors);

// UPDATE ARTIST STATUS
router.patch('/admin/approve-artist/:id', authorizeRoles('admin'), approveArtist);
router.patch('/admin/reject-artist/:id', authorizeRoles('admin'), rejectArtist);

// UPDATE COLLECTOR STATUS
router.patch('/admin/disable-collector/:id', authorizeRoles('admin'), disableCollector);

// ARTIST DASHBOARD EDIT PROFILE
router.get('/artist/dashboard-profile', authorizeRoles('artist'), getArtistDashboardProfile);
router.put('/artist/dashboard-update-details', authorizeRoles('artist'), ArtistUpdateDetails);
router.put('/artist/dashboard-update-avatar', authorizeRoles('artist'), ArtistUpdateAvatar);
router.put('/artist/dashboard-remove-avatar', authorizeRoles('artist'), ArtistRemoveAvatar);
router.post('/artist/dashboard-upload-artwork', authorizeRoles('artist'), ArtworkUpload);
router.get('/artist/dashboard-retrieve-artworks', authorizeRoles('artist'), RetrieveArtworks);
export default router;
