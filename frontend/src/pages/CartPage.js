import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Paper, Grid, Box, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/store/cart/');
        if (response.data) {
          const gameIds = response.data.map(item => item.game);
          const gameDetailsResponse = await axios.get(`http://127.0.0.1:8000/api/games/games/?ids=${gameIds.join(',')}`);
          const itemsWithDetails = response.data.map(item => {
            const gameDetail = gameDetailsResponse.data.find(game => game.id === item.game);
            return {
              ...item,
              game: gameDetail || {}
            };
          });
          setCartItems(itemsWithDetails.filter(item => item.game !== null));
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/store/cart/${id}/`);
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      alert('Item removed from cart successfully!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response && response.status === 404) {
          alert('Item not found in cart.');
        } else {
          alert('An error occurred while removing item from cart.');
        }
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cart
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Cart Items
          </Typography>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} sx={{ marginBottom: '20px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Box width={100} height={100} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={item.game.cover_image || ''}
                        alt={item.game.title || 'Unknown Title'}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h6" gutterBottom>
                      {item.game.title || 'Unknown Title'}
                    </Typography>
                    <ListItemText
                      secondary={`Added on: ${new Date(item.created_at).toLocaleDateString()}`}
                    />
                    <Typography variant="body1">
                      Description: {item.game.description || 'No description available'}
                    </Typography>
                    <Typography variant="body1">
                      Release Date: {item.game.release_date || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                      Price: {item.game.price ? `$${parseFloat(item.game.price).toFixed(2)}` : 'N/A'}
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </div>
  );
};

export default CartPage;
