export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const saveUserEmail = (email: string) => {
  localStorage.setItem('userEmail', email);
}

export const getUserEmail= () => {
  return localStorage.getItem('userEmail');
};

export const removeUserEmail= () => {
  localStorage.removeItem('userEmail');
};
