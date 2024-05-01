import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Paper, Grid, Box } from '@mui/material';

const GamesListPage = () => {
  const [games, setGames] = useState([]);

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
                  <Box width={100}>
                    <img
                      src={`http://127.0.0.1:8000/gameshack/media/game_covers/${game.cover_image}`}
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
  coverImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
  },
};

export default GamesListPage;
