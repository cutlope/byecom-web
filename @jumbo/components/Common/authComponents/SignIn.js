import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@material-ui/core/Button';
import { Box, IconButton, Popover, Tooltip, useTheme } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import AuthWrapper from './AuthWrapper';
import { useAuth } from '../../../../authentication';
import { NotificationLoader } from '../../ContentLoader';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import cookies from 'next-cookies';

const useStyles = makeStyles((theme) => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: (props) => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
    '& .MuiInputBase-input': {
      padding: '14px',
    },
  },
  iconRoot: {
    color: alpha(theme.palette.text.primary, 0.38),
    '&:hover, &:focus': {
      color: 'blue',
    },
    float: 'right',
  },
  errormsg: {
    color: 'red',
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
  authimg: {
    cursor: 'pointer',
  },
  textOrange: {
    color: '#ff9400',
  },
  textGrey: {
    color: '#666666',
  },
  bgorange: {
    '&:hover, &:focus': {
      backgroundColor: '#ff9400',
      color: 'white',
    },
    backgroundColor: '#ff9400',
    color: 'white',
  },
  bggreen: {
    '&:hover, &:focus': {
      backgroundColor: '#04aa53',
      color: 'white',
    },
    backgroundColor: '#04aa53',
    color: 'white',
    padding: '6px 12px',
  },
  bggray: {
    '&:hover, &:focus': {
      backgroundColor: '#E0E0E0',
      color: 'white',
    },
    backgroundColor: '#E0E0E0',
    color: 'white',
    padding: '6px 12px',
  },
}));

const SignIn = ({ variant = 'default', wrapperVariant = 'default', initialRememberValue = false, cookiepassword }) => {
  const classes = useStyles({ variant });
  const router = useRouter();
  const { isLoading, error, userLogin, renderSocialMediaLogin } = useAuth();
  const [rememberMe, setRememberMe] = useState(() => JSON.parse(initialRememberValue));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(() => cookiepassword);

  const Schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Schema,
    // onSubmit: (values) => userLogin({email:values.email,password:values.password}),
  });
  const siginClick = () => {
    userLogin({ email, password });
  };
  useEffect(() => {
    Cookies.set('rememberMe', JSON.stringify(rememberMe));
    if (rememberMe == true) {
      Cookies.set('email', email, { expires: 1 / 24 });
      Cookies.set('password', password);
    }
  }, [rememberMe, email, password]);

  const Click = (e) => {
    e.preventDefault();
    router.push('/forgot-password');
  };
  const handleClick = (e) => {
    e.preventDefault();
    router.push('/signin');
  };
  const RegisterClick = (e) => {
    e.preventDefault();
    router.push('/signup');
  };

  return (
    <AuthWrapper variant={wrapperVariant} sx={{ maxWidth: 250 }}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src="/images/auth/login-img.png" />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={2} width={'120px'}>
          <CmtImage src="/images/logo.png" className={classes.authimg} onClick={handleClick} />
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <TextField
              type="text"
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              {...formik.getFieldProps('email')}
              value={email || ''}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className={classes.errormsg}>
              {email == '' && formik.touched.email ? <div>{formik.errors.email}</div> : null}
            </div>
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              {...formik.getFieldProps('password')}
              value={password || ''}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className={classes.errormsg}>
              {password == '' && formik.touched.password ? <div>{formik.errors.password}</div> : null}
            </div>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <FormControlLabel
              className={classes.formcontrolLabelRoot}
              control={<Checkbox name="checkedA" />}
              label="Remember me"
              value={rememberMe}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <Button onClick={Click} className={classes.textGrey}>
                <IntlMessages id="sidebar.appModule.forgotPassword" />
                {cookiepassword}
              </Button>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Button onClick={siginClick} className={isLoading ? classes.bggray : classes.bggreen} disabled={isLoading}>
              {isLoading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: '#04AA53',
                  }}
                />
              ) : (
                <IntlMessages id="appModule.signIn" />
              )}
            </Button>
          </Box>
        </form>
        {renderSocialMediaLogin()}
      </Box>
    </AuthWrapper>
  );
};

SignIn.getInitialProps = ({ req }) => {
  const cookie = parseCookies(req);
  cookie.rememberMe;
  cookie.password;
  return {
    initialRememberValue: cookies.rememberMe,
    cookiepassword: cookies.password,
  };
};
export default SignIn;
