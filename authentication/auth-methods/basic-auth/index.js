import { useEffect, useState } from 'react';

export const useProvideAuth = () => {
  const [loadingAuthUser, setLoadingAuthUser] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStart = () => {
    setLoading(true);
    setError('');
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError('');
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const userLogin = (user, callbackFun) => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        localStorage.setItem('user', JSON.stringify(user));
        setAuthUser(user);
        if (callbackFun) callbackFun();
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  const userSignup = (user, callbackFun) => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        localStorage.setItem('user', JSON.stringify({ ...user, name: 'Admin' }));
        setAuthUser({ ...user, name: 'Admin' });
        if (callbackFun) callbackFun();
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        if (callbackFun) callbackFun();
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        if (callbackFun) callbackFun();
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        localStorage.removeItem('user');
        setAuthUser(false);
        if (callbackFun) callbackFun();
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  const getAuthUser = () => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        setAuthUser(JSON.parse(localStorage.getItem('user')));
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    setTimeout(() => {
      fetchSuccess();
      setAuthUser(JSON.parse(localStorage.getItem('user')));
      setLoadingAuthUser(false);
    }, 300);
  }, []);

  // Return the user object and auth methods
  return {
    loadingAuthUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
