import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditGamePage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState({
    title: '',
    description: '',
    release_date: '',
    price: '',
    cover_image: null,
    developer_email: 'rushikeshgadewar@icloud.com'
  });

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/games/games/${gameId}`);
        if (response.data) {
          setGameData(response.data); // Set entire game data object
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    if (gameId) {
      fetchGameData();
    }
  }, [gameId]);

  const handleFieldChange = (fieldName, value) => {
    setGameData({ ...gameData, [fieldName]: value });
  };

  const handleFileChange = (e) => {
    setGameData({ ...gameData, cover_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithFile = new FormData();
      for (const key in gameData) {
        formDataWithFile.append(key, gameData[key]);
      }

      await axios.put(`http://127.0.0.1:8000/api/games/games/${gameId}/`, formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Game updated successfully!');
      navigate('/games/list'); // Navigate to the games list page after successful update
    } catch (error) {
      console.error('Error updating game:', error);
      alert('An error occurred while updating the game. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/games/games/${gameId}/`);
        alert('Game deleted successfully!');
        navigate('/games/list'); // Navigate to the games list page after successful deletion
      } catch (error) {
        console.error('Error deleting game:', error);
        alert('An error occurred while deleting the game.');
      }
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 50 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Edit Game
          </Typography>
          <Button color="inherit" onClick={() => navigate('/games/list')}>
            Back to Games
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" style={{ marginBottom: 20 }}>Edit Game</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={gameData.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          placeholder={gameData.title}
          required
          style={{ marginBottom: 20 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={gameData.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          placeholder={gameData.description}
          required
          style={{ marginBottom: 20 }}
        />
        <TextField
          label="Release Date"
          type="date"
          fullWidth
          value={gameData.release_date}
          onChange={(e) => handleFieldChange('release_date', e.target.value)}
          placeholder={gameData.release_date}
          required
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          value={gameData.price}
          onChange={(e) => handleFieldChange('price', e.target.value)}
          placeholder={gameData.price}
          required
          style={{ marginBottom: 20 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: 20 }}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>
          Update Game
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleDelete}>
          Delete Game
        </Button>
      </form>
    </Container>
  );
};

export default EditGamePage;
