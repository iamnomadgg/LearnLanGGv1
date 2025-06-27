import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
} from '@mui/material';
import api from '../api';

const LessonList = () => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await api.get('/lessons');
                setLessons(response.data);
            } catch (error) {
                console.error('Failed to fetch lessons:', error);
            }
        };

        fetchLessons();
    }, []);

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                All Lessons
            </Typography>
            <Grid container spacing={3}>
                {lessons.map((lesson) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={lesson._id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6">{lesson.title}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {lesson.content.length > 100
                                        ? `${lesson.content.slice(0, 100)}...`
                                        : lesson.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default LessonList;
