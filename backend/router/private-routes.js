import express from 'express';
import { registerAdmin } from '../controller/private/admin/admin-register.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

import { artists } from '../controller/private/admin/admin-get-users.js';
import { collectors } from '../controller/private/admin/admin-get-users.js';

import {
	approveArtist,
	rejectArtist,
} from '../controller/private/admin/admin-update-artist-status.js';

import { disableCollector } from '../controller/private/admin/admin-update-collector-status.js';

const router = express.Router();

router.post('/admin/admin-registration', authorizeRoles('admin'), registerAdmin);

// RETRIEVE
router.get('/admin/artists', authorizeRoles('admin'), artists);
// router.get('/admin/artworks', authorizeRoles('admin'), artworks);
router.get('/admin/collectors', authorizeRoles('admin'), collectors);

// UPDATE ARTIST STATUS
router.patch('/admin/approve-artist/:id', authorizeRoles('admin'), approveArtist);
router.patch('/admin/reject-artist/:id', authorizeRoles('admin'), rejectArtist);

// UPDATE COLLECTOR STATUS
router.patch('/admin/disable-collector/:id', authorizeRoles('admin'), disableCollector);

export default router;
