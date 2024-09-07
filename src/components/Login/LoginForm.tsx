import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/api'
import { saveToken, saveUserEmail, saveUserId } from '../../utils/jwt';
import { UserLoginResponse } from '../../types/User';
import CustomModal from '../Modal/CustomModal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/actions/account';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string | null>('');
  const [password, setPassword] = useState<string | null>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalOpen(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    setLoading(true);
    setError(null);
    setAlertMessage(null);
    setSuccess(false);
    try {
      const endpoint = api.API_ENDPOINTS.LOGIN;
      const data: { email: string; password: string } = {
        email: email,
        password: password,
      };
      const response: UserLoginResponse = await api.post(endpoint, data);
      if (response.token !== null) {
        saveToken(response.token);
        saveUserEmail(response.email);
        saveUserId(response.userId);
        setSuccess(true);
        setAlertMessage(response.message);
        setModalOpen(true);
        dispatch(addUser(response));
      }

    } catch (error: unknown) {
      setSuccess(false);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.error || 'Invalid credentials';
          setAlertMessage(errorMessage);
        } else {
          setAlertMessage('No response from server. Please try again.');
        }
      } else {
        setAlertMessage('An unexpected error occurred.');
      }
      console.error(error);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <Box className=' bg-white p-20 rounded-lg ' width={500}>
      <form onSubmit={handleSubmit} className='text-start'>
        <Typography variant='h4' className='text-center' color='black'>
          Login Page
        </Typography>
        <Stack className='form-group py-3'>
          <label className='font-medium text-slate-700 pb-2'>Email</label>
          <TextField
            type='email'
            placeholder='Enter email address'
            color='warning'
            variant='outlined'
            InputProps={{
              sx: {
                borderRadius: 30,
                borderColor: '#F8B959',
                height: 40,
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Stack>
        <Stack className='form-group py-3 mb-4'>
          <label className='font-medium text-slate-700 pb-2'>Password</label>
          <TextField
            type='password'
            color='warning'
            InputProps={{
              sx: {
                borderRadius: 30,
                borderColor: '#F8B959',
                height: 40,
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Stack>
        {error && <div className='alert alert-danger text-danger mb-3'>{error}</div>}
        <Button
          type='submit'
          variant='contained'
          color={'warning'}
          fullWidth={true}
          disabled={loading}
          sx={{
            borderRadius: 30,
            textTransform: 'none'
          }}
        >
          {loading && <CircularProgress color='warning' size={20} sx={{ mx: 1 }} />}
          Login
        </Button>
      </form>
      <Grid className='pt-4 text-center'>
        <Link
          href='/register'
          underline='none'
          variant='h6'
          sx={{
            color: '#F8B959',
          }}
        >
          Create an account
        </Link>
      </Grid>
      <CustomModal open={modalOpen} onClose={closeModal} type={success ? 'success' : 'error'} body={alertMessage} />
    </Box>
  );
};

export default LoginForm;
