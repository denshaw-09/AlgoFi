import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  icon = '📦', 
  title = 'Nothing here yet', 
  description = 'Start by exploring or creating something new!',
  actionText,
  actionLink,
  actionOnClick,
  secondaryActionText,
  secondaryActionLink,
  secondaryActionOnClick
}) => {
  return (
    <div className="text-center py-20">
      <div className="card-sketch-dark p-12 max-w-2xl mx-auto">
        {/* Icon */}
        <div className="text-8xl mb-6 animate-bounce">{icon}</div>
        
        {/* Title */}
        <h3 className="text-4xl font-bold text-[#f3e9d2] mb-4">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 text-xl mb-8 leading-relaxed">
          {description}
        </p>
        
        {/* Action Buttons */}
        {(actionText || secondaryActionText) && (
          <div className="flex flex-wrap justify-center gap-4">
            {actionText && (
              actionLink ? (
                <Link to={actionLink}>
                  <button className="btn-sketch-primary text-lg px-8 py-3">
                    {actionText}
                  </button>
                </Link>
              ) : (
                <button 
                  onClick={actionOnClick}
                  className="btn-sketch-primary text-lg px-8 py-3"
                >
                  {actionText}
                </button>
              )
            )}
            
            {secondaryActionText && (
              secondaryActionLink ? (
                <Link to={secondaryActionLink}>
                  <button className="btn-sketch-secondary text-lg px-8 py-3">
                    {secondaryActionText}
                  </button>
                </Link>
              ) : (
                <button 
                  onClick={secondaryActionOnClick}
                  className="btn-sketch-secondary text-lg px-8 py-3"
                >
                  {secondaryActionText}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Preset empty states for common scenarios
export const NoNFTsFound = ({ hasFilters = false, onClearFilters }) => (
  <EmptyState
    icon="🔍"
    title="No NFTs Found"
    description={
      hasFilters 
        ? "No NFTs match your current filters. Try adjusting your search criteria or clearing all filters."
        : "There are no NFTs available at the moment. Check back soon or be the first to mint!"
    }
    actionText={hasFilters ? "Clear Filters" : "Explore Marketplace"}
    actionOnClick={hasFilters ? onClearFilters : undefined}
    actionLink={hasFilters ? undefined : "/marketplace"}
    secondaryActionText="Mint Your NFT"
    secondaryActionLink="/"
  />
);

export const EmptyPortfolio = ({ connected }) => (
  <EmptyState
    icon="🎨"
    title={connected ? "Your Portfolio is Empty" : "Connect Your Wallet"}
    description={
      connected 
        ? "You don't have any NFTs yet. Start your collection by exploring the marketplace or creating your first NFT!"
        : "Connect your wallet to view your NFT portfolio and start collecting amazing digital assets."
    }
    actionText={connected ? "Start Minting" : "Connect Wallet"}
    actionLink={connected ? "/" : undefined}
    secondaryActionText="Explore Marketplace"
    secondaryActionLink="/marketplace"
  />
);

export const EmptyCreatedNFTs = () => (
  <EmptyState
    icon="✨"
    title="You Haven't Created Any NFTs"
    description="Unleash your creativity! Mint your first NFT and share it with the world. It's easy and only takes a few seconds."
    actionText="Create Your First NFT"
    actionLink="/"
    secondaryActionText="Learn More"
    secondaryActionLink="/#mint"
  />
);

export const EmptyMarketplace = () => (
  <EmptyState
    icon="🏪"
    title="Marketplace is Empty"
    description="Be the pioneer! Mint and list the first NFT on this marketplace. Your art could be the foundation of something amazing."
    actionText="Mint First NFT"
    actionLink="/"
    secondaryActionText="Learn About NFTs"
    secondaryActionLink="/#how-it-works"
  />
);

export default EmptyState;
