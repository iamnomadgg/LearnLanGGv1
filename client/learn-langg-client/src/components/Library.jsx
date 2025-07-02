import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CardActionArea,
} from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api';

const Library = () => {
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
                            <CardActionArea component={Link} to={`/read/${lesson._id}`}>
                                <CardContent>
                                    <Typography variant="h6">{lesson.title}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Library;
