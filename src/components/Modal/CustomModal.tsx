import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './CustomModal.css'

interface ModalProps {
  open: boolean;
  onClose: () => void;
  type: string;
  body: string | null;
}

const CustomModal: React.FC<ModalProps> = ({ open, onClose, type, body }) => {

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
        {type == 'success' ? (
          <CheckCircleIcon sx={{ color: 'green', fontSize: 50 }} />
        ) : (
          <HighlightOffIcon sx={{ color: 'red', fontSize: 50 }} />
        )}

      </DialogTitle>
      <DialogContent className="p-6 bg-white text-gray-700">
        {body}
      </DialogContent>
      {type !== 'success' && (
        <DialogActions className="flex flex-col">
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: 30,
              background: '#F8B959',
              paddingX: 10
            }}
            color={'warning'}
          >
            Ok
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomModal;
