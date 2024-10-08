import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../utils/jwt';
import BlankCard from '../../components/Post/BlankCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PostData } from '../../types/Post';
import * as api from '../../services/api';
import axios from 'axios';
import Loading from '../../components/LoadingComponent';
import { capitalizeFirstLetter } from '../../services/firstCharacter';
import CustomConfirmModal from '../../components/Modal/CustomComfirm';

const PostDetail = () => {

  const navigate = useNavigate();

  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleCloseLogout = () => {
    setLogoutError(null);
    setOpen(false);
  }

  const fetchPostDetail = async (postId: string) => {
    setLoading(true);
    setError(null);
    const endpoint = api.API_ENDPOINTS.VIEW.replace(':postId', postId);
    try {
      const response = await api.get(endpoint);
      setPost(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.error || 'Error in fetching post data';
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
  }

  useEffect(() => {
    if (getToken()) {
      setLoading(false);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const typePostId = postId as string;
    fetchPostDetail(typePostId);
  }, [postId]);

  const handleBack = () => {
    navigate('/');
  }

  const handleLogout = () => {
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

  const tags = post?.tags.map((tag, key) => <Chip key={key} sx={{ mr: 1, mt: 1, background: '#FDEACD' }} label={capitalizeFirstLetter(tag)} />);

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
            paddingX: 4,
            textTransform: 'none',
            fontSize: 16,
            color: 'black'
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          color={'warning'}
          sx={{
            color: 'warning',
            borderRadius: 25,
            paddingX: 4,
            textTransform: 'none',
            fontSize: 18
          }}
          onClick={() => setOpen(true)}
        >
          Logout
        </Button>
      </Grid>
      {loading ? (
        <Loading />
      ) : (post && !error) ? (
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          item
          xs={12}
          sm={12}
          md={10}
          lg={8}
          sx={{ marginLeft: { md: 'auto', lg: 'auto' }, marginRight: { md: 'auto', lg: 'auto' } }}
        >
          <Box
            className="flex flex-col space-y-5 p-5"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <Typography variant='h4' py={4} color={'black'}>
              View Post
            </Typography>
            <BlankCard>
              <Stack>
                <Typography variant='h5' py={4}>
                  {post?.title}
                </Typography>
                <Typography variant='body1'>
                  {post?.body}
                </Typography>
                <Grid py={4}>
                  {tags}
                </Grid>
              </Stack>
            </BlankCard>
          </Box>
        </Grid>
      ) : (error) ? (
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ flexGrow: 1 }}
        >
          <Box
            className="flex flex-col space-y-5 p-5"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '70%' }}
          >
            <Typography variant='h4' py={4} color={'red'}>
              {error}
            </Typography>
          </Box>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ flexGrow: 1 }}
        >
          <Box
            className="flex flex-col space-y-5 p-5"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '70%' }}
          >
            <Typography variant='h4' py={4} color={'black'}>
              Empty Post!
            </Typography>
          </Box>
        </Grid>
      )}
      <CustomConfirmModal open={open} onClose={handleCloseLogout} onConfirm={handleLogout} loading={loading} body='Are you sure want to logout?' errorMessage={logoutError} />
    </Grid>
  )
}

export default PostDetail;
