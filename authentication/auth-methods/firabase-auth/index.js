import React, { useEffect, useState } from 'react';
import { auth, facebookAuthProvider, githubAuthProvider, googleAuthProvider, twitterAuthProvider } from './config';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 6,
    },
  },
}));

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoadingUser, setLoadingUser] = useState(true);
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

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

  const loginWithSocial = (platform, callbackFun) => {
    let authProvider = googleAuthProvider;
    if (platform === 'facebook') {
      authProvider = facebookAuthProvider;
    }

    if (platform === 'github') {
      authProvider = githubAuthProvider;
    }

    if (platform === 'twitter') {
      authProvider = twitterAuthProvider;
    }

    try {
      fetchStart();
      return auth
        .signInWithPopup(authProvider)
        .then((response) => {
          fetchSuccess();
          setAuthUser(response.user);
          if (callbackFun) callbackFun();
          return response.user;
        })
        .catch((error) => {
          fetchError(error.message);
        });
    } catch (error) {
      fetchError(error.message);
    }
  };

  const renderSocialMediaLogin = (callbackFun) => {
    const classes = useStyles();

    return (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box component="p" fontSize={{ xs: 13, sm: 16 }}>
          Or Login with
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton className={classes.iconBtn} onClick={() => loginWithSocial('google', callbackFun)}>
            <GTranslateIcon />
          </IconButton>
          <IconButton className={classes.iconBtn} onClick={() => loginWithSocial('twitter', callbackFun)}>
            <TwitterIcon />
          </IconButton>
          <IconButton className={classes.iconBtn} onClick={() => loginWithSocial('facebook', callbackFun)}>
            <FacebookIcon />
          </IconButton>
          <IconButton className={classes.iconBtn} onClick={() => loginWithSocial('github', callbackFun)}>
            <GitHubIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  const userLogin = (user, callbackFun) => {
    const { email, password } = user;
    try {
      fetchStart();
      return auth
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          fetchSuccess();
          setAuthUser(response.user);
          if (callbackFun) callbackFun();
          return response.user;
        })
        .catch((error) => {
          fetchError(error.message);
        });
    } catch (error) {
      fetchError(error.message);
    }
  };

  const userSignup = (user, callbackFun) => {
    const { email, password } = user;

    try {
      fetchStart();
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          fetchSuccess();
          setAuthUser(response.user);
          if (callbackFun) callbackFun();
          return response.user;
        })
        .catch((error) => {
          fetchError(error.message);
        });
    } catch (error) {
      fetchError(error.message);
    }
  };

  const userSignOut = (callbackFun) => {
    return auth.signOut().then(() => {
      setAuthUser(false);
      if (callbackFun) callbackFun();
    });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    try {
      fetchStart();
      return auth
        .sendPasswordResetEmail(email)
        .then(() => {
          fetchSuccess();
          if (callbackFun) callbackFun();
          return true;
        })
        .catch((error) => {
          fetchError(error.message);
        });
    } catch (error) {
      fetchError(error.message);
    }
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    try {
      fetchStart();
      return auth
        .confirmPasswordReset(code, password)
        .then(() => {
          fetchSuccess();
          if (callbackFun) callbackFun();
          return true;
        })
        .catch((error) => {
          fetchError(error.message);
        });
    } catch (error) {
      fetchError(error.message);
    }
  };

  const getAuthUser = () => {
    fetchStart();
    try {
      auth.onAuthStateChanged((user) => {
        fetchSuccess();
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(false);
        }
      });
    } catch (error) {
      fetchError(error.message);
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(false);
      }

      setLoadingUser(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    isLoadingUser,
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
