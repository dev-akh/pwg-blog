import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './CustomModal.css'
import { CircularProgress, Grid, Typography } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  body: string | null;
  errorMessage: string | null;
}

const CustomConfirmModal: React.FC<ModalProps> = ({ open, onClose, onConfirm, loading, body, errorMessage }) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: 'rounded-xl overflow-hidden p-10 MsgBoxRedius',
      }}
    >
      <DialogTitle
        className='text-white text-center'
      >
        <HelpOutlineIcon sx={{ color: '#F8b959', fontSize: 70 }} />

      </DialogTitle>
      <DialogContent className="p-6 bg-white text-gray-700">
        {body}
      </DialogContent>
      <DialogActions className="flex flex-col confirm-form">
        <Typography variant='body2' color={'error'}>
          {errorMessage}
        </Typography>
        <Grid>
          <Button
            onClick={onConfirm}
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: 30,
              background: '#F95A50',
              paddingX: 5,
              mx: 2
            }}
            color={'error'}
            disabled={loading}
          >
            {loading && (
              <CircularProgress size={20} sx={{ mx: 1 }} />
            )}
            Confirm
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: 30,
              background: '#F8B959',
              paddingX: 5,
              mx: 2
            }}
            color={'warning'}
          >
            Cancel
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirmModal;
