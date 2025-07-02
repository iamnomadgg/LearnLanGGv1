import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography,
    Paper,
    CircularProgress,
    Alert,
    Box,
    Button,
    Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import api from '../api';
import ClickableWord from './ClickableWord';
import WordStatusPopup from './WordStatusPopup';

const Reader = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedWordData, setSelectedWordData] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const containerRef = useRef(null);
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target)
            ) {
                setSelectedIndex(null); // Close the popup
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await api.get(`/lessons/${lessonId}`);
                setLesson(response.data);
            } catch (err) {
                setError('Failed to load lesson.');
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [lessonId]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!lesson) return <Alert severity="warning">Lesson not found.</Alert>;

    const handleWordClick = async (event, word, index) => {
        setSelectedIndex(index);

        // Position popup
        const rect = event.target.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setPopupPosition({
            top: rect.bottom - containerRect.top + window.scrollY,
            left: rect.left - containerRect.left + window.scrollX,
        });

        try {
            const res = await api.get(`/vocabulary/${word.toLowerCase()}`);
            setSelectedWordData(res.data);
        } catch (err) {
            setSelectedWordData(null);
            if (err.response?.status === 404) {
                console.error('Word Not Found', err);
            } else {
                console.error('Failed to fetch vocabulary:', err);
            }
        }
    };

    const handleChangeStatus = (newStatus) => {
        console.log(`new status: ${newStatus}`)
        // TODO: Save to DB or update local vocab tracking state
    };

    const handleClosePopup = () => {
        setSelectedIndex(null);
        setSelectedWordData(null);
    };

    return (
        <Paper ref={containerRef} elevation={3} sx={{ p: 3, position: 'relative' }}>
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
                    onClick={() => navigate(`/editor/${lessonId}`)}
                >
                    Edit
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
                            onClick={(e) => handleWordClick(e, word, index)}
                            selected={index === selectedIndex}
                        />{' '}
                    </React.Fragment>
                ))}
            </Typography>

            {selectedIndex !== null && (
                <Box
                    ref={popupRef}
                    sx={{
                        position: 'absolute',
                        top: popupPosition.top,
                        left: popupPosition.left,
                        zIndex: 1000,
                        // optionally add some maxWidth or width if needed
                    }}
                >
                    <WordStatusPopup
                        word={lesson.content.split(/\s+/)[selectedIndex]}
                        data={selectedWordData}
                        onChangeStatus={handleChangeStatus}
                        onClose={handleClosePopup}
                    />
                </Box>
            )}

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

export default Reader;
