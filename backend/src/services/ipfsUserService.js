import axios from 'axios';

export async function fetchUserFromIPFS(ipfsHash) {
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user info from IPFS');
  }
}
