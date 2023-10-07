import React from 'react';
import PropTypes from 'prop-types';

const ProfileDot = ({ imageUrl }) => {
  return (
    <div className="profile-dot" style={{ backgroundImage: `url(${imageUrl})` }} />
  );
};

ProfileDot.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ProfileDot;
