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
import { useSelector } from 'react-redux';
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
const Verifyotp = ({ variant = 'default', wrapperVariant = 'default' }) => {
  const classes = useStyles({ variant });
  const signup=useSelector(states=>states.common.signup)
  const router=useRouter()
  const { isLoading, error, message, VerifyOTP, renderSocialMediaLogin } = useAuth();

  const  Schema = yup.object().shape({
    email: yup.string().required('Email/Phone is required'),
    code: yup.string().required('Code is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      code:""
    },
    validationSchema: Schema,
    onSubmit: (values) => {signup=='phone'?VerifyOTP({
      phone:values.email,code:values.code
    }):VerifyOTP({
      email:values.email,code:values.code
    })}
  
  });
  

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/signin')
  }


  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src="/images/auth/login-img.png" />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
        <CmtImage src="/images/logo.png"  className={classes.authimg} onClick={handleClick}/>
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Verify OTP
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {signup=='phone'?(
            <Box mb={2}>
              <TextField
              label={<IntlMessages id="appModule.phone" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              {...formik.getFieldProps("email")}
              />
              <div className={classes.errormsg}>{formik.errors.email && formik.touched.email?<div>{formik.errors.email}</div>:null}</div>
            </Box>
          ):(<Box mb={2}>
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
          )
          }
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
                <IntlMessages id="appModule.verify" />
              </Button>
            </Box>
            <Typography className={classes.alrTextRoot}>
                <Button className={classes.textOrange} onClick={handleClick}>
                  <IntlMessages id="appModule.signIn" />
                </Button>
            </Typography>
          </Box>
        </form>

        {renderSocialMediaLogin()}

        <NotificationLoader loading={isLoading} error={error} />
        <NotificationLoader loading={isLoading} message={message} />
      </Box>
    </AuthWrapper>
  );
};

export default Verifyotp;
