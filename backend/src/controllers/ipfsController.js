
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import pinataConfig from '../config/pinataConfig.js';
const { pinataApiKey, pinataSecretApiKey } = pinataConfig;

// Handles file upload to Pinata (IPFS)
export async function uploadToIPFS(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileStream = fs.createReadStream(req.file.path);
    const data = new FormData();
    data.append('file', fileStream, req.file.originalname);

    // Optional: Add metadata
    const metadata = JSON.stringify({ name: req.file.originalname });
    data.append('pinataMetadata', metadata);

    // Pinata API endpoint
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

    const response = await axios.post(url, data, {
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        ...data.getHeaders(),
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    // Remove file from server after upload
    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      success: true,
      fileName: req.file.originalname,
      ipfsHash: response.data.IpfsHash,
      pinataResponse: response.data,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: error.message });
  }
}
