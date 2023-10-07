import React from 'react';
import ProfileDot from './ProfileDot';

const TriangleProfileDots = () => {
  // Sample profile pictures (replace with actual image URLs)
  const profilePictures = [
    'https://via.placeholder.com/50',
    'https://via.placeholder.com/50',
    'https://via.placeholder.com/50',
  ];

  return (
    <div className="triangle">
      {profilePictures.map((imageUrl, index) => (
        <ProfileDot key={index} imageUrl={imageUrl} />
      ))}
    </div>
  );
};

export default TriangleProfileDots;
