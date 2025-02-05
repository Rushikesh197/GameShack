import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField,AppBar,Toolbar,Container, Typography, Button, Grid, Card, CardContent, CardActions  } from '@mui/material';
import { useParams,useNavigate } from 'react-router-dom';

const UserDashboard = ({addToCart,addToWishlist}) => {
  const [userData, setUserData] = useState({});
  const [games, setGames] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { userEmail } = useParams(); // Extracting userEmail from URL parameter
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/normal-user/${userEmail}/`);
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

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/games/games/');
      if (response.data) {
        setGames(response.data);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setUserData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/normal-user/${userEmail}/`, userData);
      setIsEditing(false);
      alert('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('An error occurred while updating user profile.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/normal-user/${userEmail}/`);
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
  const handleGoToCart = () => {
    navigate('/cart'); // Redirect to the cart page
  };
  const handleGoToFavorites = () => {
    navigate('/favorites');
  };


  const handleAddToCart = async (gameId) => {
    try {
      if (!userData || !userData.email) {
        throw new Error('User data is missing or invalid.');
      }

      await axios.post(`http://127.0.0.1:8000/api/store/cart/create/`, {
        user: userData.email,
        user_email: userData.email,
        game: gameId,
      });

      alert('Game added to cart!');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding game to cart:', error);
      alert('An error occurred while adding game to cart.');
    }
  };

  const handleAddToWishlist = async (gameId) => {
    try {
      if (!userData || !userData.email) {
        throw new Error('User data is missing or invalid.');
      }

      await axios.post(`http://127.0.0.1:8000/api/store/favorite/create/`, {
        user: userData.email,
        user_email: userData.email,
        game: gameId,
      });

      alert('Game added to favorites!');
      navigate('/favorites');
    } catch (error) {
      console.error('Error adding game to favorites:', error);
      alert('An error occurred while adding game to favorites.');
    }
  };
  

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <h2>User Dashboard</h2>
          <Button color="inherit" onClick={handleGoToCart}>
            Cart
          </Button>
          <Button color="inherit" onClick={handleGoToFavorites}>
            Favorites
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
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
            value={userData.email || ''}
            fullWidth
            margin="normal"
            disabled
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
              <Button onClick={handleUpdateUser} variant="contained" color="primary" style={{ marginTop: 16 }}>
                Save Changes
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="contained" color="secondary" style={{ marginLeft: 8, marginTop: 16 }}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" style={{ marginTop: 16 }}>
              Edit Profile
            </Button>
          )}
          <Button onClick={handleDeleteAccount} variant="outlined" color="secondary" style={{ marginTop: 16, marginLeft: 12 }}>
            Delete Account
          </Button>
        </div>
        {/* Game List Section */}

        <Typography variant="h4" style={{ marginBottom: 20 }}>Browse Games</Typography>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item key={game.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">{game.title}</Typography>
                <Typography variant="body2" color="textSecondary">{game.description}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleAddToCart(game.id)} variant="outlined" color="primary">
                  Add to Cart
                </Button>
                <Button onClick={() => handleAddToWishlist(game.id)} variant="outlined" color="secondary">
                  Add to Wishlist
                </Button>
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
    </div>
  );
};

export default UserDashboard;