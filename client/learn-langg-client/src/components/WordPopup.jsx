import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    Paper,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';

const STATUS_OPTIONS = [
    { value: 'discarded', label: 'Discarded', icon: <DeleteIcon fontSize="small" /> },
    { value: 'level1', label: 'Unknown Level 1', icon: <LooksOneIcon fontSize="small" /> },
    { value: 'level2', label: 'Unknown Level 2', icon: <LooksTwoIcon fontSize="small" /> },
    { value: 'level3', label: 'Unknown Level 3', icon: <Looks3Icon fontSize="small" /> },
    { value: 'level4', label: 'Unknown Level 4', icon: <Looks4Icon fontSize="small" /> },
    { value: 'known', label: 'Known', icon: <CheckIcon fontSize="small" /> }
];

const WordPopup = ({ word, data, onChangeStatus, onClose }) => {
    const currentStatus = data?.status || 'New';

    return (
        <Paper
            elevation={4}
            sx={{
                position: 'absolute',
                top: '100%',
                mt: 1,
                p: 2,
                width: 280,
                zIndex: 1000,
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {word}
                </Typography>
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
                Status: <strong>{currentStatus}</strong>
            </Typography>

            {data?.translation?.length > 0 && (
                <Box mb={1}>
                    <Typography variant="body2" fontWeight="bold">Translations:</Typography>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {data.translation.map((t, idx) => (
                            <li key={idx}>
                                <Typography variant="body2">{t}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}

            {data?.note && (
                <Box mb={1}>
                    <Typography variant="body2" fontWeight="bold">Note:</Typography>
                    <Typography variant="body2">{data.note}</Typography>
                </Box>
            )}

            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" justifyContent="space-between">
                {STATUS_OPTIONS.map(option => (
                    <Tooltip title={option.label} key={option.value}>
                        <IconButton
                            size="small"
                            onClick={() => onChangeStatus(option.value)}
                            color={option.value === currentStatus ? 'primary' : 'default'}
                        >
                            {option.icon}
                        </IconButton>
                    </Tooltip>
                ))}
            </Stack>
        </Paper>
    );
};

export default WordPopup;