import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function MintForm({ account, onMintSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'art',
    purchasable: false,
    price: '',
    description: '',
    file: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if wallet is connected
      if (!account) {
        setError('Please connect your wallet first');
        setLoading(false);
        return;
      }

      // Validate form
      if (!formData.name || !formData.file) {
        setError('Name and file are required');
        setLoading(false);
        return;
      }

      if (formData.purchasable && (!formData.price || parseFloat(formData.price) <= 0)) {
        setError('Valid price required for purchasable NFTs');
        setLoading(false);
        return;
      }

      // Convert price to microAlgos if purchasable
      const priceInMicroAlgos = formData.purchasable 
        ? Math.floor(parseFloat(formData.price) * 1000000) 
        : 0;

      // console log
      console.log('Submitting mint request:', {
        creator: account,
        name: formData.name,
        type: formData.type,
        purchasable: formData.purchasable,
        price: priceInMicroAlgos
      });

      // Send JSON data (not FormData)
      const response = await axios.post(`${API_URL}/nfts/mint`, {
        creator: account,  
        name: formData.name,
        type: formData.type,
        purchasable: formData.purchasable,
        price: priceInMicroAlgos,
        description: formData.description,
        assetName: formData.name,
        unitName: 'NFT',
        metadata: formData.description
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Mint response:', response.data);

      if (response.data.success) {
        alert('Mint transaction created! Please sign in your wallet.');
        
        // Reset form
        setFormData({
          name: '',
          type: 'art',
          purchasable: false,
          price: '',
          description: '',
          file: null
        });
        setPreview(null);

        if (onMintSuccess) {
          onMintSuccess(response.data.data);
        }
      }
    } catch (err) {
      console.error('Mint error:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Failed to mint NFT';
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-sketch-dark p-8">
      <h2 className="text-3xl font-bold text-[#fca311] mb-6 font-['Fredoka_One']">Mint New NFT</h2>
      
      {error && (
        <div className="bg-red-900/20 border-2 border-red-500 rounded-xl p-4 mb-6">
          <p className="text-red-400 font-bold">{error}</p>
        </div>
      )}

      {!account && (
        <div className="bg-[#fca311]/20 border-2 border-[#fca311] rounded-xl p-4 mb-6">
          <p className="text-[#fca311] font-bold">⚠️ Please connect your wallet to mint NFTs</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-[#f3e9d2] font-bold mb-2 text-xl font-['Patrick_Hand']">
            Upload File *
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*,audio/*,video/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              required
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center w-full h-48 border-4 border-dashed border-[#fca311] bg-[#1c1917] rounded-xl cursor-pointer hover:bg-[#292524] transition shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
            >
              {preview ? (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="h-full w-full object-contain rounded-lg p-2"
                />
              ) : (
                <div className="text-center">
                  <div className="text-5xl mb-2">📁</div>
                  <p className="mt-2 text-[#f3e9d2] font-bold text-lg">Click to upload file</p>
                  <p className="text-sm text-gray-500">PNG, JPG, MP3, MP4</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* NFT Name */}
        <div>
          <label className="block text-[#f3e9d2] font-bold mb-2 text-xl font-['Patrick_Hand']">
            NFT Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 input-sketch"
            placeholder="Enter NFT name"
            required
          />
        </div>

        {/* NFT Type */}
        <div>
          <label className="block text-[#f3e9d2] font-bold mb-2 text-xl font-['Patrick_Hand']">
            NFT Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 input-sketch cursor-pointer"
            required
          >
            <option value="art">🎨 Art NFT</option>
            <option value="music">🎵 Music NFT</option>
            <option value="standard">💎 Standard NFT</option>
          </select>
        </div>

        {/* description */}
        <div>
          <label className="block text-[#f3e9d2] font-bold mb-2 text-xl font-['Patrick_Hand']">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-3 input-sketch"
            placeholder="Describe your NFT..."
          />
        </div>

        {/* Purchasable toggle */}
        <div className="flex items-center space-x-3 bg-[#1c1917] p-4 rounded-xl border-2 border-[#3e3834]">
          <input
            type="checkbox"
            name="purchasable"
            checked={formData.purchasable}
            onChange={handleInputChange}
            className="w-6 h-6 rounded bg-[#f3e9d2] border-[#3e3834] text-[#fca311] focus:ring-[#fca311] cursor-pointer"
            id="purchasable"
          />
          <label htmlFor="purchasable" className="text-[#f3e9d2] font-bold text-lg cursor-pointer">
            Make this NFT purchasable
          </label>
        </div>

        {/* Price (conditional) */}
        {formData.purchasable && (
          <div className="animate-fade-in">
            <label className="block text-[#f3e9d2] font-bold mb-2 text-xl font-['Patrick_Hand']">
              Price (ALGO) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.000001"
              min="0"
              className="w-full px-4 py-3 input-sketch"
              placeholder="0.00"
              required={formData.purchasable}
            />
            <p className="text-sm text-[#fca311] mt-2 font-bold">
              Platform fee: 2.5%
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !account}
          className="w-full btn-sketch-primary text-xl py-4"
        >
          {loading ? 'Minting...' : account ? 'Mint NFT' : 'Connect Wallet First'}
        </button>
      </form>
    </div>
  );
}

export default MintForm;