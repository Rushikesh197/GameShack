import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, AppBar,Toolbar,Link } from '@mui/material';
import { useParams,useNavigate } from 'react-router-dom';

const DeveloperDashboard = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { userEmail } = useParams(); // Extracting userEmail from URL parameter
  const navigate = useNavigate();

console.log(userEmail);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/game-developer/${userEmail}/`);
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]);

  const handleFieldChange = (fieldName, value) => {
    setUserData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/game-developer/${userEmail}/`, userData);
      setIsEditing(false);
      alert('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('An error occurred while updating user profile.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/game-developer/${userEmail}/`);
        alert('Account deleted successfully!');
        navigate('/login');
        // Redirect or perform logout actions
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting account.');
      }
    }
  };
  const handleLogout = () => {
    navigate('/login'); // Redirect to login page on logout
  };
  const handlered1 = () => {
    navigate('/games/add'); // Redirect to login page on logout
  }
  const handlered2 = () => {
    navigate('/games/list'); // Redirect to login page on logout
  }
  return (
    <div>
      <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <h2>Developer Dashboard</h2>
        <div>
          {/* Link to View Games Page */}
          <Link to="/games/list" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit" onClick = {handlered2}>View Games</Button>
          </Link>
          
          {/* Link to Add Games Page */}
          <Link to="/games/add" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit" onClick = {handlered1}>Add Games</Button>
          </Link>

          {/* Logout Button */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
      <div style={{ padding: '16px' }}>
          <TextField
            label="Name"
            value={userData.name || ''}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Email"
            value={isEditing ? userData.email || '' : userEmail}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />

          <TextField
            label="Phone Number"
            value={userData.phoneno || ''}
            onChange={(e) => handleFieldChange('phoneno', e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Address"
            value={userData.address || ''}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={userData.dob || ''}
            onChange={(e) => handleFieldChange('dob', e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Location"
            value={userData.location || ''}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Employee ID"
            value={userData.employee_id || ''}
            onChange={(e) => handleFieldChange('employee_id', e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Company Name"
            value={userData.company_name || ''}
            onChange={(e) => handleFieldChange('company_name', e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Company URL"
            value={userData.company_url || ''}
            onChange={(e) => handleFieldChange('company_url', e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Password"
            type="password"
            value={userData.password || ''}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          {isEditing ? (
            <>
              <Button onClick={handleUpdateUser} variant="contained" color="primary" style={{ marginLeft: 8 ,marginTop: 16}}>
                Save Changes
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="contained" color="secondary" style={{ marginLeft: 8 ,marginTop: 16}}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" style={{ marginLeft: 8 ,marginTop: 16}}>
              Edit Profile
            </Button>
          )}
          <Button onClick={handleDeleteAccount} variant="outlined" color="secondary" style={{ marginTop: 16 ,marginLeft:12 }}>
            Delete Account
          </Button>
        </div>
    </div>
  );
};

export default DeveloperDashboard;
