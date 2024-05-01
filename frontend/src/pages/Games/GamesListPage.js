import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Paper, Grid, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GamesListPage = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate(); // Initialize navigate outside of any specific function

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/games/games/');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleEditGame = (gameId) => {
    // Log the gameId before navigating
    console.log('Editing game with ID:', gameId);
    // Navigate to the EditGamePage with gameId as a URL parameter
    navigate(`/games/edit/${gameId}/`);
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom>
        Current Games
      </Typography>
      <Paper style={styles.gameListContainer}>
        <List>
          {games.map((game) => (
            <ListItem key={game.id}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box width={100} height={100} style={styles.imageContainer}>
                    <img
                      src={`https://raw.githubusercontent.com/Rushikesh197/GameShack/gameshack/main/media/game_covers/apple_store_logo.png`}
                      alt={game.title}
                      style={styles.coverImage}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <ListItemText
                    primary={<strong>{game.title}</strong>}
                    secondary={
                      <React.Fragment>
                        <Typography variant="body1">
                          Release Date: {new Date(game.release_date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1">Description: {game.description}</Typography>
                        <Typography variant="body1">Price: ${parseFloat(game.price).toFixed(2)}</Typography>
                      </React.Fragment>
                    }
                  />
                  <Button variant="outlined" onClick={() => handleEditGame(game.id)}>Edit</Button>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  gameListContainer: {
    marginTop: '20px',
    padding: '20px',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain', // or 'cover' depending on your preference
  },
};

export default GamesListPage;
