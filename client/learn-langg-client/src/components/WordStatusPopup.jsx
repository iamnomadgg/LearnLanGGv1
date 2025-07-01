import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Paper,
    Tooltip,
    TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import CloseIcon from '@mui/icons-material/Close';

const WordStatusPopup = ({
    word,
    status,
    onChangeStatus,
    onClose,
    translation = '',
    note = '',
}) => {
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
                borderRadius: 2,
                bgcolor: '#fdfdfd',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                    {word}
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
                {status || 'New'}
            </Typography>

            <TextField
                label="Translation"
                value={translation}
                placeholder="No translation yet"
                size="small"
                fullWidth
                margin="dense"
                InputProps={{ readOnly: true }}
            />

            <TextField
                label="Note"
                value={note}
                placeholder="No note yet"
                size="small"
                fullWidth
                margin="dense"
                multiline
                minRows={2}
                InputProps={{ readOnly: true }}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Tooltip title="Discarded">
                    <IconButton
                        color={status === 'Discarded' ? 'error' : 'default'}
                        onClick={() => onChangeStatus('Discarded')}
                        size="small"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Unknown Level 1">
                    <IconButton
                        color={status === 'Unknown Level 1' ? 'primary' : 'default'}
                        onClick={() => onChangeStatus('Unknown Level 1')}
                        size="small"
                    >
                        <LooksOneIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Unknown Level 2">
                    <IconButton
                        color={status === 'Unknown Level 2' ? 'primary' : 'default'}
                        onClick={() => onChangeStatus('Unknown Level 2')}
                        size="small"
                    >
                        <LooksTwoIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Unknown Level 3">
                    <IconButton
                        color={status === 'Unknown Level 3' ? 'primary' : 'default'}
                        onClick={() => onChangeStatus('Unknown Level 3')}
                        size="small"
                    >
                        <Looks3Icon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Unknown Level 4">
                    <IconButton
                        color={status === 'Unknown Level 4' ? 'primary' : 'default'}
                        onClick={() => onChangeStatus('Unknown Level 4')}
                        size="small"
                    >
                        <Looks4Icon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Known">
                    <IconButton
                        color={status === 'Known' ? 'success' : 'default'}
                        onClick={() => onChangeStatus('Known')}
                        size="small"
                    >
                        <CheckCircleIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Paper>
    );
};

export default WordStatusPopup;