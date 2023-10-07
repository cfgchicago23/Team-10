import React from 'react';
import ProfileDot from './ProfileDot';
import './TwitterSpace.css'; // Import your CSS file

const AppSpace = () => {
  // Sample user profiles
  const profiles = [
    'https://via.placeholder.com/30', // Replace with actual image URLs
    'https://via.placeholder.com/30',
    'https://via.placeholder.com/30',
    // Add more profile URLs as needed
  ];

  return (
    <div className="twitter-space">
      <div className="circle">
        {profiles.map((profile, index) => (
          <ProfileDot key={index} imageUrl={profile} />
        ))}
      </div>
    </div>
  );
};

export default AppSpace;
