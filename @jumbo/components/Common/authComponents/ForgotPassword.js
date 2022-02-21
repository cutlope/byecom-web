import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import Button from '@material-ui/core/Button';
import { Box, Collapse, IconButton } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import AuthWrapper from './AuthWrapper';
import { useRouter } from 'next/router';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { useAuth } from '../../../../authentication';
import Link from 'next/link';
import { NotificationLoader } from '../../ContentLoader';
import * as yup from 'yup';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    [theme.breakpoints.up('md')]: {
      order: 1,
      width: (props) => (props.variant === 'default' ? '50%' : '100%'),
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
  },
  errormsg: {
    color: 'red',
  },
  alertRoot: {
    marginBottom: 10,
  },
  authimg: {
    cursor: 'pointer',
  },
  textOrange: {
    color: '#04aa53',
  },
  bgorange: {
    '&:hover, &:focus': {
      backgroundColor: '#04aa53',
      color: 'white',
    },
    backgroundColor: '#04aa53',
    color: 'white',
  },
}));

//variant = 'default', 'standard', 'bgColor'
// eslint-disable-next-line react/prop-types
const ForgotPassword = ({ variant = 'default', wrapperVariant = 'default' }) => {
  const classes = useStyles({ variant });
  const { isLoading, error, message, sendPasswordResetEmail } = useAuth();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const Schema = yup.object().shape({
    email: yup.string().required('Email is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Schema,
    onSubmit: (values) => sendPasswordResetEmail({ email: values.email }),
  });

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/signin');
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={'/images/auth/forgot-img.png'} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src="/images/logo.png" className={classes.authimg} onClick={handleClick} />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Forgot Your Password?
        </Typography>
        <Collapse in={open}>
          <Alert
            variant="outlined"
            severity="success"
            className={classes.alertRoot}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            A mail has been sent on your email address with reset password link.
          </Alert>
        </Collapse>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={5}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              {...formik.getFieldProps('email')}
            />
            <div className={classes.errormsg}>
              {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
            </div>
          </Box>
          <Box mb={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" className={classes.bgorange}>
              <IntlMessages id="appModule.resetPassword" />
            </Button>
            <Box component="span" ml={0}>
              <Button className={classes.textOrange} onClick={handleClick}>
                Back to Login
              </Button>
            </Box>
          </Box>
          <Box></Box>
        </form>

        <NotificationLoader loading={isLoading} error={error} />
        <NotificationLoader loading={isLoading} message={message} />
      </Box>
    </AuthWrapper>
  );
};

export default ForgotPassword;
