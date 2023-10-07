import React from 'react';
import ProfileDot from './ProfileDot';
import './TwitterSpace.css'; // Import your CSS file

const AppSpace = () => {
  // Sample user profiles
  const profiles = [
    'https://randomuser.me/api/portraits/women/2.jpg', // Replace with actual image URLs
    'https://randomuser.me/api/portraits/women/3.jpg',
    'https://randomuser.me/api/portraits/women/36.jpg',
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
