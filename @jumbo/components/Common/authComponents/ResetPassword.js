import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import Button from '@material-ui/core/Button';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import AuthWrapper from './AuthWrapper';
import Link from 'next/link';
import { useAuth } from '../../../../authentication';
import { NotificationLoader } from '../../ContentLoader';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import {useFormik} from 'formik';


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
  },
  textCapital: {
    textTransform: 'capitalize',
  },
  textAcc: {
    textAlign: 'center',
    '& a': {
      marginLeft: 4,
    },
  },
  errormsg:{
    color:'red'
  },
  alrTextRoot: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
  authimg:{
    cursor:'pointer'
  },
  textOrange:{
    color:'#ff9400'
  },
  bgorange: {
    '&:hover, &:focus':{
    backgroundColor:'#ff9400',
    color:'white'
    },
    backgroundColor:'#ff9400',
    color:'white'
  }
}));

//variant = 'default', 'standard', 'bgColor'
// eslint-disable-next-line react/prop-types
const PasswordReset = ({ variant = 'default', wrapperVariant = 'default' }) => {
  const classes = useStyles({ variant });
  const { isLoading, error, message,confirmPasswordReset, renderSocialMediaLogin } = useAuth();
  const router = useRouter();

  const  Schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().required('Confirm Password is required'),
    code: yup.string().required('Code is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword:"",
      code:""
    },
    validationSchema: Schema,
    onSubmit: (values) => confirmPasswordReset({
      email:values.email,password:values.password,confirmPassword:values.confirmPassword,code:values.code
    }),
  });

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/signin')
  }

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src="/images/auth/sign-up-img.png" />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src="/images/logo.png"  className={classes.authimg} onClick={handleClick}/>
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          ResetPassword
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              {...formik.getFieldProps("email")}
              />
            <div className={classes.errormsg}>{formik.errors.email && formik.touched.email?<div>{formik.errors.email}</div>:null}</div>
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              {...formik.getFieldProps("password")}
              />
              <div className={classes.errormsg}>{formik.errors.password && formik.touched.password?<div>{formik.errors.password}</div>:null}</div>
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.confirmpassword" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              {...formik.getFieldProps("confirmPassword")}
              />
              <div className={classes.errormsg}>{formik.errors.confirmPassword && formik.touched.confirmPassword?<div>{formik.errors.confirmPassword}</div>:null}</div>
          </Box>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.verifycode" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              {...formik.getFieldProps("code")}
              />
            <div className={classes.errormsg}>{formik.errors.code && formik.touched.code?<div>{formik.errors.code}</div>:null}</div>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent={{ sm: 'space-between' }}
            mb={3}>
            <Box mb={{ xs: 2, sm: 0 }}>
              <Button type="submit" className={classes.bgorange}>
                <IntlMessages id="appModule.resetpassword" />
              </Button>
            </Box>
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <Button onClick={handleClick} className={classes.textOrange}>
                <IntlMessages id="appModule.signIn" />
              </Button>
            </Box>
          </Box>
        </form>

        {renderSocialMediaLogin()}

        <NotificationLoader loading={isLoading} error={error} />
        <NotificationLoader loading={isLoading} message={message} />
      </Box>
    </AuthWrapper>
  );
};

export default PasswordReset;
