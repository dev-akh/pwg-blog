import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/Login/LoginForm';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/jwt';
import Loading from '../../components/LoadingComponent';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkToken = async () => {
      if (getToken()) {
        navigate('/');
      } else {
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <Grid className='p-10'>
      <Box className="flex flex-col space-y-5 p-5" sx={{ placeItems: 'center' }}>
        <LoginForm />
      </Box>
    </Grid>
  );
};

export default LoginPage;
