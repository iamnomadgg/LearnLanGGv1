import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Paper,
    CircularProgress,
    Alert,
    Box
} from '@mui/material';
import api from '../api';

const LessonDetail = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                {lesson.title}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {lesson.content}
            </Typography>

            {lesson.audioUrl && (
                <Box sx={{ mt: 3 }}>
                    <audio controls src={lesson.audioUrl}>
                        Your browser does not support the audio element.
                    </audio>
                </Box>
            )}
        </Paper>
    );
};

export default LessonDetail;
