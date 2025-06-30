import React from 'react';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';

const STATUS_OPTIONS = [
    'Known',
    'Discarded',
    'Unknown Level 1',
    'Unknown Level 2',
    'Unknown Level 3',
    'Unknown Level 4',
];

const WordStatusPopup = ({ word, status, onChangeStatus, onClose }) => {
    return (
        <Paper
            elevation={4}
            sx={{
                position: 'absolute',
                top: '100%',
                mt: 1,
                p: 2,
                width: 250,
                zIndex: 1000,
            }}
        >
            <Typography variant="subtitle1" gutterBottom>
                <strong>{word}</strong>
            </Typography>
            <Typography variant="body2" gutterBottom>
                <strong>{status || 'New'}</strong>
            </Typography>
            <Stack spacing={1}>
                {STATUS_OPTIONS.map((option) => (
                    <Button
                        key={option}
                        variant={option === status ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => onChangeStatus(option)}
                    >
                        {option}
                    </Button>
                ))}
            </Stack>
            <Box mt={1} textAlign="right">
                <Button size="small" onClick={onClose}>
                    Close
                </Button>
            </Box>
        </Paper>
    );
};

export default WordStatusPopup;