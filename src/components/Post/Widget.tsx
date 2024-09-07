import { Grid, Typography, Card, CardContent } from '@mui/material';

interface Widget {
  totalAccount: number;
  totalPost: number;
  totalMyPost: number;
}

export default function Widget({ totalAccount, totalPost, totalMyPost }: Widget) {
  return (
    <Grid
      container
      spacing={5}
      justifyContent="center"
      alignItems="center"
      sx={{ mb: 4, mt: 2 }}
    >
      <Grid item xs={12} md={4} lg={4}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: '#FDEACD',
          }}
        >
          <CardContent sx={{textAlign:'center', py:5}}>
            <Typography variant="h4" color="textSecondary" gutterBottom>
              Total Account
            </Typography>
            <Typography variant="h3" color="primary">
              {totalAccount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: '#E6A5A1',
          }}
        >
          <CardContent sx={{textAlign:'center', py:5}}>
            <Typography variant="h4" color="textSecondary" gutterBottom>
              Total Post
            </Typography>
            <Typography variant="h3" color="primary">
              {totalPost}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4} lg={4}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: '#D9F8CF',
          }}
        >
          <CardContent sx={{textAlign:'center', py:5}}>
            <Typography variant="h4" color="textSecondary" gutterBottom>
              My Post
            </Typography>
            <Typography variant="h3" color="primary">
              {totalMyPost}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
