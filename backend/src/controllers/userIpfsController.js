import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import pinataConfig from '../config/pinataConfig.js';
const { pinataApiKey, pinataSecretApiKey } = pinataConfig;

import crypto from 'crypto';

// Simple input sanitization
function sanitizeInput(str) {
  return String(str).replace(/[^a-zA-Z0-9_\- ]/g, '');
}

export async function uploadUserDetailsToIPFS(req, res) {
  try {
    let { address, name, signature } = req.body;
    if (!address || !name) {
      return res.status(400).json({ error: 'Address and name are required' });
    }
    address = sanitizeInput(address);
    name = sanitizeInput(name);

    // TODO: Signature verification (pseudo-code, implement with wallet provider)
    // if (!verifySignature(address, signature)) {
    //   return res.status(401).json({ error: 'Signature verification failed' });
    // }

    const userData = { address, name };
    const tempPath = path.join('uploads', `${address}-user.json`);
    fs.writeFileSync(tempPath, JSON.stringify(userData));

    const fileStream = fs.createReadStream(tempPath);
    const data = new FormData();
    data.append('file', fileStream, `${address}-user.json`);
    // Pinata metadata and pin policy
    const metadata = JSON.stringify({
      name: `${address}-user.json`,
      keyvalues: {
        type: 'user',
        address,
        created: new Date().toISOString(),
      },
    });
    data.append('pinataMetadata', metadata);
    // Pin policy: always keep this file pinned
    const pinPolicy = JSON.stringify({ regions: [{ id: 'FRA1', desiredReplicationCount: 1 }] });
    data.append('pinataOptions', pinPolicy);

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
    fs.unlinkSync(tempPath);

    // Optional: verify hash integrity
    const uploadedHash = response.data.IpfsHash;
    const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${uploadedHash}`;
    const verifyRes = await axios.get(gatewayUrl);
    const hashCheck = crypto.createHash('sha256').update(JSON.stringify(verifyRes.data)).digest('hex');
    const localHash = crypto.createHash('sha256').update(JSON.stringify(userData)).digest('hex');
    const integrity = hashCheck === localHash;

    return res.status(200).json({
      success: true,
      ipfsHash: uploadedHash,
      pinataResponse: response.data,
      integrity,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
