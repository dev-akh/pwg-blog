import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { postStates } from '../../store/reducers/post';
import { fetchPosts } from '../../store/actions/post';
import { PostData } from '../../types/Post';
import PostItem from './PostItem';
import Loading from '../LoadingComponent';
import { removeToken } from '../../utils/jwt';
import { useNavigate } from 'react-router-dom';

interface ReducerPostStates {
  postReducer: postStates;
}
const mapStateToProps = (state: ReducerPostStates) => ({
  loading: state.postReducer.loading,
  posts: state.postReducer.posts,
  error: state.postReducer.error,
});

const mapDispatchToProps = {
  fetchPosts,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PostList: React.FC<PropsFromRedux> = ({ loading, posts, error, fetchPosts }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const postItems: PostData[] = posts.data;
  const limit: number = posts.limit;
  const totalPages: number = posts.totalPages;

  useEffect(() => {
    fetchPosts({ limit: 9, page: page });
  }, [fetchPosts, limit, page]);

  const handleChangePage = (_event: unknown, newPage: number): void => {
    if (page !== newPage) {
      setPage(newPage);
    }
  };

  if (error === 'Invalid token') {
    removeToken();
    navigate('/login');
  }
  const postListData = postItems.length > 0 ? postItems.map((post, key) => <PostItem key={key} post={post} />) : 'Empty';

  return (
    <>
      {loading ? (
        <Loading />
      ) : postListData.length > 0 ? (
        <>

          <Grid container
            justifyContent="center"
            alignItems="center">
            <Typography
              variant='h4'
              color={'black'}
              my={3}
            >
              Post List
            </Typography>
          </Grid>

          <Grid container spacing={5}>
            {postListData}
          </Grid>
          <Grid item xs={12} mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, newPage) => handleChangePage(event, newPage)}
              color="primary"
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
          width={'100%'}
          flexDirection="column"
        >
          <Typography variant="h6" style={{ marginTop: 16 }}>
            Empty Post Data!
          </Typography>
        </Box>
      )}

    </>
  );
};

export default connector(PostList);
