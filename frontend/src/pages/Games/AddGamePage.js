import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';

const AddGamePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    release_date: '',
    price: '',
    cover_image: null
  });

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cover_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append('title', formData.title);
      formDataWithFile.append('description', formData.description);
      formDataWithFile.append('release_date', formData.release_date);
      formDataWithFile.append('price', formData.price);
      formDataWithFile.append('cover_image', formData.cover_image);

      await axios.post('http://127.0.0.1:8000/api/games/games/create/', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Game added successfully!');
      // Optionally, redirect to another page after successful addition
    } catch (error) {
      console.error('Error adding game:', error);
      alert('An error occurred while adding the game. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 50 }}>
      <Typography variant="h4" style={{ marginBottom: 20 }}>Add New Game</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Release Date"
              type="date"
              fullWidth
              value={formData.release_date}
              onChange={(e) => handleFieldChange('release_date', e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={(e) => handleFieldChange('price', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ marginBottom: 20 }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Add Game</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddGamePage;
