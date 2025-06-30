import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography,
    Paper,
    CircularProgress,
    Alert,
    Box,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api';
import ClickableWord from './ClickableWord';

const LessonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await api.get(`/lessons/${id}`);
                setLesson(response.data);
            } catch (err) {
                setError('Failed to load lesson.');
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!lesson) return <Alert severity="warning">Lesson not found.</Alert>;

    const handleDelete = async () => {
        try {
            await api.delete(`/lessons/${id}`);
            navigate('/');
        } catch (err) {
            alert('Failed to delete the lesson.');
        }
    };

    const handleWordClick = (word, index) => {
        setSelectedIndex(index);
        console.log('Clicked word:', word, 'at index:', index);
        // later attach a popover/modal here
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} mb={3}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                >
                    Back to Lessons
                </Button>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/lessons/${id}/edit`)}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => setDeleteDialogOpen(true)}
                >
                    Delete
                </Button>
            </Stack>
            <Typography variant="h4" gutterBottom>
                {lesson.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                {lesson.content.split(/\s+/).map((word, index) => (
                    <React.Fragment key={index}>
                        <ClickableWord
                            word={word}
                            onClick={() => handleWordClick(word, index)}
                            selected={index === selectedIndex}
                        />{' '}
                    </React.Fragment>
                ))}
            </Typography>

            {lesson.audioUrl && (
                <Box sx={{ mt: 3 }}>
                    <audio controls src={lesson.audioUrl}>
                        Your browser does not support the audio element.
                    </audio>
                </Box>
            )}

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this lesson? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default LessonDetail;
