// AdminProfile.js
import React from 'react';

const AdminProfile = ({ user }) => {
  return (
    <div>
      <h2>Welcome, Admin!</h2>
      <p>This is your admin profile page.</p>
      <h3>User Details</h3>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default AdminProfile;
