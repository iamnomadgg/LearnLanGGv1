import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    Alert
} from '@mui/material';
import api from '../api';

const maxTitleLength = parseInt(import.meta.env.VITE_MAX_TITLE_LENGTH);

const Importer = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        audioUrl: '',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await api.post('/lesson', formData);
            if (response.status === 201) navigate(`/read/${response.data.lesson._id}`)
            else navigate('/lib')
        }
        catch (error) {
            setError(`'Error creating lesson: ${error}`);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Add a New Lesson
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    slotProps={{ htmlInput: { maxLength: maxTitleLength } }}
                    helperText={`${formData.title.length}/${maxTitleLength} characters`}
                />
                <TextField
                    label="Content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                    margin="normal"
                />
                <TextField
                    label="Audio URL (optional)"
                    name="audioUrl"
                    value={formData.audioUrl}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Save
                </Button>
            </Box>
        </Paper>
    );
};

export default Importer;
