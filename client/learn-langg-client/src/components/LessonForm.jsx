import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper
} from '@mui/material';
import api from '../api';

const LessonForm = ({ onLessonCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        audioUrl: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/lessons', formData);
            onLessonCreated(response.data.lesson);
            setFormData({ title: '', content: '', audioUrl: '' });
        } catch (error) {
            console.error('Error creating lesson:', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Add a New Lesson
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
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
                    Save Lesson
                </Button>
            </Box>
        </Paper>
    );
};

export default LessonForm;
