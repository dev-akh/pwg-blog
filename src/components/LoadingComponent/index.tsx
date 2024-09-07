import { Box, CircularProgress, Typography } from '@mui/material'
export default function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width={'100%'}
      flexDirection="column"
    >
      <CircularProgress size={40} />
      <Typography variant="h5" style={{ marginTop: 10 }}>
        Loading...
      </Typography>
    </Box>
  )
}
