import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import './CustomModal.css';
import { PostData } from '../../types/Post';
import tagsData from '../../data/tags.json';
import * as api from '../../services/api';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addPost, updatePost, removeLastPost } from '../../store/actions/post';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  post: PostData | null;
  type: 'new' | 'edit'
}

const CustomPostModal: React.FC<ModalProps> = ({ open, onClose, post, type }) => {

  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>(post?.title || '');
  const [content, setContent] = useState<string>(post?.body || '');
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const tagOptions = Array.from(new Set([...tags, ...tagsData.tags]));

  const handlePostSubmit = async () => {
    if (title.trim() === '' || content.trim() === '' || tags.length === 0) {
      setError('Please fill in all fields and select at least one tag.');
      return;
    }

    const data = {
      title,
      body: content,
      tags,
    };
    setLoading(true);
    try {
      if (post) {
        const postIdStr = String(post.id);
        const endpoint = api.API_ENDPOINTS.UPDATE.replace(':postId', postIdStr);
        const response = await api.put(endpoint, data);
        dispatch(updatePost(response.post));
      } else {
        const endpoint = api.API_ENDPOINTS.CREATE;
        const response = await api.post(endpoint, data);
        dispatch(addPost(response.post));
        dispatch(removeLastPost());
      }
      handleClose();
      setError('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.error || 'Error in storing post data';
          setError(errorMessage);
        } else {
          setError('No response from server. Please try again.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTags = (_event: unknown, newTags: string[]) => {
    setTags(newTags);
  };

  const handleClose = () => {
    setError('');
    setTitle('');
    setContent('');
    setTags([]);
    onClose();
  }

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.body);
      setTags(post.tags);
    }
  }, [post]);

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      PaperProps={{
        className: 'rounded-xl overflow-hidden p-10 MsgBoxRedius',
      }}
    >
      <DialogTitle className='text-white text-center'>
        {type == 'new' ? (
          <Typography fontSize={28} color={'black'}>
            Add A New Post
          </Typography>
        ) : (
          <Typography fontSize={28} color={'black'}>
            Edit Post
          </Typography>
        )}
      </DialogTitle>
      <DialogContent className="p-6 bg-white text-gray-700 text-start">
        <Stack className="form-group py-3">
          <label className="font-medium text-slate-700 pb-2">Title</label>
          <TextField
            type="text"
            placeholder="Post Title"
            color="warning"
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: 5,
                borderColor: '#F8B959',
                height: 50,
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 1000px white inset',
                  WebkitTextFillColor: '#000',
                },
              },
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Stack>
        <Stack className="form-group py-3">
          <label className="font-medium text-slate-700 pb-2">Content</label>
          <TextField
            type="text"
            multiline={true}
            minRows={3}
            maxRows={6}
            color="warning"
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: 5,
                borderColor: '#F8B959',
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 1000px white inset',
                  WebkitTextFillColor: '#000',
                },
              },
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Stack>
        <Stack className="form-group py-3">
          <label className="font-medium text-slate-700 pb-2">Tags</label>
          <Autocomplete
            multiple
            options={tagOptions}
            value={tags}
            onChange={(event, newValue) => handleTags(event, newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                color='warning'
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    borderRadius: 5,
                    borderColor: '#F8B959',
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px white inset',
                      WebkitTextFillColor: '#000',
                    },
                    '& input:-webkit-autofill:focus': {
                      WebkitBoxShadow: '0 0 0 1000px white inset',
                      WebkitTextFillColor: '#000',
                    },
                    '& input:-webkit-autofill:hover': {
                      WebkitBoxShadow: '0 0 0 1000px white inset',
                      WebkitTextFillColor: '#000',
                    },
                  },
                }}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions className="flex flex-col">
        <Typography variant='h6' color={'error'}>
          {error}
        </Typography>
        <Grid py={2}>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: 20,
              background: '#FDEACD',
              paddingX: 5,
              m: 2,
              color: 'black'
            }}
            color={'warning'}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePostSubmit}
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: 20,
              background: '#F8B959',
              paddingX: 5,
              m: 2,
              color: 'black'
            }}
            color={'warning'}
            disabled={loading}
          >
            {loading && (
              <CircularProgress size={20} sx={{ mx: 1 }} />
            )}
            {post ? 'Edit' : 'Add'}
          </Button>

        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default CustomPostModal;
