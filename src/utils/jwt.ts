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

export const saveUserId = (id: number | string) => {
  localStorage.setItem('userId', `${id}`);
}

export const getUserId= () => {
  return localStorage.getItem('userId');
};

export const removeUserId= () => {
  localStorage.removeItem('userId');
};
