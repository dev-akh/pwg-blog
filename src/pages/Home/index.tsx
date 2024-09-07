import { useEffect, useState } from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../utils/jwt';
import { Button, Grid } from '@mui/material';
import PostList from '../../components/Post/PostList';
import Loading from '../../components/LoadingComponent';
import CustomPostModal from '../../components/Modal/CustomPostModal';
import CustomConfirmModal from '../../components/Modal/CustomComfirm';

function Start() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [newPost, setNewPost] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCloseLogout = () => {
    setError(null);
    setOpen(false);
  }
  const handleOnClose = () => {
    setNewPost(false);
  }

  const handleNewPost = () => {
    setNewPost(true);
  }

  useEffect(() => {
    if (getToken()) {
      setLoading(false);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    setError(null);
    setLoading(true);
    try {
      removeToken();
      navigate('/login');
    } catch (error) {
      setError('Something wrong in logging out process');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <Grid container py={5} alignItems="stretch" width="100%" className='main-container'>
      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: 2,
        }} >
        <Button
          variant="contained"
          color={'warning'}
          sx={{
            borderRadius: 25,
            paddingX: 3,
            textTransform: 'none',
            fontSize: 16,
            color: 'black'
          }}
          onClick={handleNewPost}
        >
          Add New Post
        </Button>
        <Button
          color={'warning'}
          sx={{
            color: 'warning',
            borderRadius: 25,
            paddingX: 3,
            textTransform: 'none',
            fontSize: 18
          }}
          onClick={() => setOpen(true)}
        >
          Logout
        </Button>
      </Grid>

      <PostList />
      <CustomPostModal open={newPost} post={null} onClose={handleOnClose} type='new' />
      <CustomConfirmModal open={open} onClose={handleCloseLogout} onConfirm={handleLogout} loading={loading} body='Are you sure want to logout?' errorMessage={error} />
    </Grid>
  );
}

export default Start;
