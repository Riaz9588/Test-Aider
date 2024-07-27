import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
      </div>
    </div>
  )
}

export default SkeletonLoader
