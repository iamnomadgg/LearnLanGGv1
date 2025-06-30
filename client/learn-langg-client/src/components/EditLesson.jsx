import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography,
    TextField,
    Button,
    Paper,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Stack,
} from '@mui/material';
import api from '../api';
import DeleteIcon from '@mui/icons-material/Delete';

const EditLesson = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        audioUrl: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const maxTitleLength = import.meta.env.VITE_TITLE_MAX_LENGTH || 60;

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await api.get(`/lessons/${id}`);
                setFormData(res.data);
            } catch (err) {
                setError('Failed to load lesson');
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [id]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put(`/lessons/${id}`, formData);
            navigate(`/lessons/${id}`);
        } catch (err) {
            setError('Failed to update lesson');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/lessons/${id}`);
            navigate('/');
        } catch (err) {
            alert('Failed to delete lesson');
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Edit Lesson
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
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" type="submit" disabled={saving}>
                        Save Changes
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        Delete Lesson
                    </Button>
                </Stack>
            </Box>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this lesson? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default EditLesson;
