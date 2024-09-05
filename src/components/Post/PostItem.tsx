
import {
  Button,
  CardMedia,
  Chip,
  Grid,
  Typography
} from '@mui/material';
import { PostData } from '../../types/Post';
import BlankCard from './BlankCard';

const PostItem = ({ post }: { post: PostData }) => {

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
              marginTop:-3,
              marginRight: -2
            }}
          />
        </Grid>

        <Typography
          variant='h4'
          my={1}
        >
          {post.title}
        </Typography>
        <Typography
          variant='body1'
        >
          {post.body}
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
              px: 3,
              mx: 1,
              color: 'black',
              background: '#D9F8CF'
            }}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color={'warning'}
            sx={{
              borderRadius: 5,
              px: 3,
              mx: 1,
              color: 'black',
              background: '#F8B959'
            }}
          >
            View
          </Button>
          <Button
            variant='contained'
            color={'error'}
            sx={{
              borderRadius: 5,
              px: 3,
              mx: 1,
              color: 'black',
              background: '#F95A50'
            }}
          >
            Delete
          </Button>
        </Grid>
      </BlankCard>

    </Grid>
  )
}

export default PostItem;
