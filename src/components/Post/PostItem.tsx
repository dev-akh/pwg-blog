
import {
  Button,
  CardMedia,
  Chip,
  Grid,
  Typography
} from '@mui/material';
import { PostData } from '../../types/Post';
import BlankCard from './BlankCard';
import { useState } from 'react';
import CustomConfirmModal from '../Modal/CustomComfirm';
import * as api from '../../services/api';
import axios from 'axios';
import { capitalizeFirstLetter } from '../../services/firstCharacter';
import CustomPostModal from '../Modal/CustomPostModal';
import { useNavigate } from 'react-router-dom';
import { removePost } from '../../store/actions/post';
import { useDispatch } from 'react-redux';

const PostItem = ({ post }: { post: PostData, isAdmin: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [postOpen, setPostOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setDeleteErrorMsg(null);
    setSelectedPostId(0);
  }

  const handlePostClose = () => {
    setPostOpen(false);
    setDeleteErrorMsg(null);
  }

  const handleOpenPost = () => {
    setPostOpen(true);
    setDeleteErrorMsg(null);
  }

  const handleViewPost = (postId: number) => {
    navigate(`/post/${postId}`);
  }

  const handleDeleteClick = (postId: number) => {
    setSelectedPostId(postId);
    setDeleteErrorMsg(null);
    setOpen(true);
  }

  const handleDeleteConfirm = async () => {
    if (selectedPostId <= 0) {
      alert('Select valid post to delete');
      return;
    }
    setLoading(true);
    setDeleteErrorMsg(null);
    try {
      const postIdStr = String(selectedPostId);
      const endpoint = api.API_ENDPOINTS.DELETE.replace(':postId', postIdStr);
      await api.destroy(endpoint);
      dispatch(removePost(post));
      setOpen(false);
      setDeleteErrorMsg(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.error || 'Error in deleting post';
          setDeleteErrorMsg(errorMessage);
        } else {
          setDeleteErrorMsg('No response from server. Please try again.');
        }
      } else {
        setDeleteErrorMsg('An unexpected error occurred.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return `${words.slice(0, wordLimit).join(' ')}...`;
  };

  const postDate = post?.date ?? new Date();
  const formattedDate = new Date(postDate).toISOString().split('T')[0];

  const tags = post.tags.map((tag, key) => <Chip key={key} sx={{ mr: 1, mt: 1, background: '#FDEACD' }} label={capitalizeFirstLetter(tag)} />);

  return (
    <Grid
      item
      xs={12}
      lg={4}
      md={4}
      sm={6}
      display="flex"
      alignItems="stretch"
      width={'100%'}
    >
      <BlankCard>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant='h6'
            sx={{
              color: '#F8B959'
            }}
          >
            {formattedDate}
          </Typography>
          <CardMedia
            component="img"
            image={'/pwg-logo.png'}
            alt="PWG Logo"
            sx={{
              width: 100,
              transform: 'rotate(-45deg)',
              transformOrigin: 'center',
              marginTop: -3,
              marginRight: -2
            }}
          />
        </Grid>

        <Typography
          variant='h5'
          my={2}
        >
          {truncateText(post.title, 4)}
        </Typography>
        <Typography
          variant='body1'
        >
          {truncateText(post.body, 20)}
        </Typography>
        <Grid py={4}>
          {tags}
        </Grid>
        <Grid pt={2} pb={3}>
          <Button
            variant='contained'
            color={'success'}
            sx={{
              borderRadius: 5,
              px: 2,
              m: 1,
              color: 'black',
              background: '#D9F8CF'
            }}
            onClick={handleOpenPost}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color={'warning'}
            sx={{
              borderRadius: 5,
              px: 2,
              m: 1,
              color: 'black',
              background: '#F8B959'
            }}
            onClick={() => handleViewPost(post.id)}
          >
            View
          </Button>
          <Button
            variant='contained'
            color={'error'}
            sx={{
              borderRadius: 5,
              px: 2,
              m: 1,
              color: 'black',
              background: '#F95A50'
            }}
            onClick={() => handleDeleteClick(post.id)}
          >
            Delete
          </Button>
        </Grid>
      </BlankCard>
      <CustomConfirmModal open={open} onClose={handleClose} onConfirm={handleDeleteConfirm} loading={loading} body='Are you sure want to delete this post?' errorMessage={deleteErrorMsg} />
      <CustomPostModal open={postOpen} post={post} onClose={handlePostClose} type='edit' />
    </Grid>
  )
}

export default PostItem;
