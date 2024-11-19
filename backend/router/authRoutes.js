import express from 'express';
import { loginAdmin } from '../controller/public/login-admin-controller.js';
import { loginArtist } from '../controller/public/login-artist-controller.js';
import { loginCollector } from '../controller/public/login-collector-controller.js';
import { registerArtist } from '../controller/public/register-artist-controller.js';
import { registerCollector } from '../controller/public/register-collector-controller.js';

import { refreshToken } from '../controller/public/refresh-token-controller.js';

const router = express.Router();

// LOGIN
router.post('/login/admin', loginAdmin);
router.post('/login/artist', loginArtist);
router.post('/login/collector', loginCollector);

// REGISTER
// router.post('/register/admin', registerAdmin) // should be private
router.post('/register/artist', registerArtist);
router.post('/register/collector', registerCollector);

// REFRESH TOKEN
router.post('/refresh-token', refreshToken);

export default router;
