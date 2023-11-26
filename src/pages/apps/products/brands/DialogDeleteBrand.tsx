import React from 'react';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

interface DialogDeleteBrandProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DialogDeleteBrand: React.FC<DialogDeleteBrandProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Brand</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this brand?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    sx={{
                        bgcolor: 'error.light',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'error.dark',
                        }
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogDeleteBrand;