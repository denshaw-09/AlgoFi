import React from 'react';

// Skeleton loader for NFT cards
export const NFTCardSkeleton = () => {
  return (
    <div className="card-sketch overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-[#3e3834]"></div>
      
      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="h-7 bg-[#3e3834] rounded w-3/4"></div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-[#3e3834] rounded w-full"></div>
          <div className="h-4 bg-[#3e3834] rounded w-5/6"></div>
        </div>
        
        {/* Creator info */}
        <div className="flex items-center space-x-2 bg-[#e5dac1] p-2 rounded-lg">
          <div className="w-8 h-8 bg-[#3e3834] rounded-full"></div>
          <div className="flex-1 space-y-1">
            <div className="h-3 bg-[#3e3834] rounded w-16"></div>
            <div className="h-4 bg-[#3e3834] rounded w-24"></div>
          </div>
        </div>
        
        {/* Price skeleton */}
        <div className="border-t-2 border-[#3e3834] pt-4">
          <div className="h-4 bg-[#3e3834] rounded w-12 mb-2"></div>
          <div className="h-8 bg-[#3e3834] rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};

// Grid of skeleton loaders
export const NFTGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, index) => (
        <NFTCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Stats card skeleton
export const StatsCardSkeleton = () => {
  return (
    <div className="bg-[#292524] rounded-xl p-6 border-2 border-[#3e3834] shadow-[4px_4px_0px_0px_#000] animate-pulse">
      <div className="h-4 bg-[#3e3834] rounded w-20 mb-2"></div>
      <div className="h-8 bg-[#3e3834] rounded w-16"></div>
    </div>
  );
};

export default NFTCardSkeleton;
