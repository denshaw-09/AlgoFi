import express from 'express';
import multer from 'multer';
import path from 'path';
import * as ipfsController from '../controllers/ipfsController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/ipfs/upload
router.post('/upload', upload.single('file'), ipfsController.uploadToIPFS);

export default router;
