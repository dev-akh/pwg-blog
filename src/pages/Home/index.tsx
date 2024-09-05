import { useEffect, useState } from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../utils/jwt';
import { Button, Grid } from '@mui/material';
import PostList from '../../components/Post/PostList';
import Loading from '../../components/LoadingComponent';
import CustomPostModal from '../../components/Modal/CustomPostModal';

function Start() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [newPost, setNewPost] = useState<boolean>(false);

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
    removeToken();
    navigate('/login');
  }
  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <Grid container p={5}>
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
            paddingX: 10,
            textTransform: 'none',
            fontSize: 16,
            color:'black'
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
            paddingX: 10,
            textTransform: 'none',
            fontSize: 18
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Grid>

      <PostList />
      <CustomPostModal open ={newPost} post={null} onClose={handleOnClose} type='new'/>
    </Grid>
  );
}

export default Start;
