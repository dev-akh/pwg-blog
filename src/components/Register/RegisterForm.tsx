import {
  Autocomplete,
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
import CustomModal from '../Modal/CustomModal';
import axios from 'axios';
import { UserRegisterResponse, UserRegister } from '../../types/User';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/actions/account';
import './index.css';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [password, setPassword] = useState<string | null>('');
  const [role, setRole] = useState<string | null>('');
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

  const handleRole = (_event: unknown, role: string) => {
    setRole(role);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username || !role) {
      setError('All fields are required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (role !== 'admin' && role !== 'user') {
      setError('Role must be either "admin" or "user".');
      return;
    }
    setLoading(true);
    setError(null);
    setAlertMessage(null);
    setSuccess(false);
    try {
      const endpoint = api.API_ENDPOINTS.REGISTER;
      const data: UserRegister = {
        username: username,
        email: email,
        password: password,
        role: role
      };
      const response: UserRegisterResponse = await api.post(endpoint, data);
      if (response.token !== null) {
        saveToken(response.token);
        saveUserEmail(response.account.email);
        saveUserId(response.account.userId);
        setSuccess(true);
        setAlertMessage(response.message);
        setModalOpen(true);
        dispatch(addUser(response.account));
      }

    } catch (error: unknown) {
      setSuccess(false);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.error || 'Failed in registration';
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
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <Box className=" bg-white p-20 rounded-lg auth-form">
      <form onSubmit={handleSubmit} className="text-start">
        <Typography variant="h4" className="text-center auth-title-text" color="black">
          Register User
        </Typography>

        <Stack className="form-group py-3">
          <label className="font-medium text-slate-700 pb-2">Username</label>
          <TextField
            type="text"
            placeholder="Enter username"
            color="warning"
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: 25,
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Stack>
        <Stack className="form-group py-3">
          <label className="font-medium text-slate-700 pb-2">Email</label>
          <TextField
            type="email"
            placeholder="Enter email address"
            color="warning"
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: 25,
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
        <Stack className="form-group py-3 py-3">
          <label className="font-medium text-slate-700 pb-2">Password</label>
          <TextField
            type="password"
            color="warning"
            InputProps={{
              sx: {
                borderRadius: 25,
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
        <Stack className="form-group py-3 mb-4">
          <label className="font-medium text-slate-700 pb-2">Role</label>
          <Autocomplete
            options={['admin', 'user']}
            value={role}
            onChange={(event, newValue) => handleRole(event, newValue?.toLowerCase() || '')}
            sx={{
              py:0
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                color="warning"
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    borderRadius: 5,
                    borderColor: '#F8B959',
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
              />
            )}
          />
        </Stack>
        {error && <div className="alert alert-danger text-danger mb-3">{error}</div>}
        <Button
          type="submit"
          variant="contained"
          color={'warning'}
          fullWidth={true}
          disabled={loading}
          sx={{
            borderRadius: 25,
            textTransform: 'none'
          }}
        >
          {loading && <CircularProgress color="warning" size={20} sx={{ mx: 1 }} />}
          Register
        </Button>
      </form>
      <Grid className="pt-4 text-center">
        <Link
          className='auth-link-text'
          href="/login"
          underline="none"
          variant="h6"
          sx={{
            color: '#F8B959',
          }}
        >
          Back to Login Page
        </Link>
      </Grid>
      <CustomModal open={modalOpen} onClose={closeModal} type={success ? 'success' : 'error'} body={alertMessage} />
    </Box>
  );
};

export default RegisterForm;
