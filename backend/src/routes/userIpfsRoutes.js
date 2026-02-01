import express from 'express';
import { uploadUserDetailsToIPFS } from '../controllers/userIpfsController.js';

const router = express.Router();

// POST /api/ipfs/user
router.post('/user', uploadUserDetailsToIPFS);

export default router;
