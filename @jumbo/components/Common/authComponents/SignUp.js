import React, { useState } from 'react';
import { Box, IconButton, Popover, Tooltip, useTheme } from '@material-ui/core';
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
import MenuItem from '@material-ui/core/MenuItem';
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
  alrTextRoot: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
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
  iconRoot: {
    color: alpha(theme.palette.text.primary, 0.38),
    '&:hover, &:focus': {
      color: 'blue',
    },
    float:'right',
  },
  errormsg:{
    color:'red'
  },
  TextRoot:{
    textAlign:'center',
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
const SignUp = ({ variant = 'default', wrapperVariant = 'default' }) => {
  const classes = useStyles({ variant });
  const router=useRouter()
  const { isLoading, error, message, userSignup, renderSocialMediaLogin } = useAuth();

  const  Schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phoneNumber:"",
      verifyType:"",
      role:""
    },
    validationSchema: Schema,
    onSubmit: (values) => userSignup({
      email:values.email,password:values.password,phoneNumber:values.phoneNumber,verifyType:values.verifyType,role:values.role
    }),
  });

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/signin')
  }
  const Click = (e) => {
    e.preventDefault()
    router.push('/verifyotp')
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
          <CmtImage src="/images/logo.png"   className={classes.authimg} onClick={handleClick}/>
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Create an account
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
              label={<IntlMessages id="appModule.phone" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              {...formik.getFieldProps("phoneNumber")}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.verifytype" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              select
              {...formik.getFieldProps("verifyType")}
            >
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
            </TextField>
          </Box>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.role" />}
              fullWidth
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
              select
              {...formik.getFieldProps("role")}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="MERCHANT">Merchant</MenuItem>
              <MenuItem value="SUPPORT">Support</MenuItem>
              <MenuItem value="MANAGER">Manager</MenuItem>
              <MenuItem value="CONSUMER">Consumer</MenuItem>
            </TextField>
            <div className={classes.errormsg}>{formik.errors.role && formik.touched.role?<div>{formik.errors.role}</div>:null}</div>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent={{ sm: 'space-between' }}
            mb={3}>
            <Box mb={{ xs: 2, sm: 0 }}>
              <Button type="submit" className={classes.bgorange}>
                <IntlMessages id="appModule.regsiter" />
              </Button>
            </Box>

            {/* <Typography className={classes.alrTextRoot}>
              <Button color="primary" onClick={Click}>
                <IntlMessages id="appModule.verifyemail" />
              </Button>
            </Typography> */}
          </Box>
          <Typography className={classes.TextRoot}>
            Have an account? <Button className={classes.textOrange} onClick={handleClick}>Sign In</Button>
          </Typography>
        </form>
        {/* <Tooltip title="Github">
          <IconButton  className={classes.iconRoot}>
            <i class="fab fa-github"></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Twitter">
          <IconButton  className={classes.iconRoot}>
            <i class="fab fa-twitter"></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Google">
          <IconButton  className={classes.iconRoot}>
            <i class="fab fa-google"></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Facebook">
          <IconButton  className={classes.iconRoot}>
            <i class="fab fa-facebook-square"></i>
          </IconButton>
        </Tooltip> */}
        {renderSocialMediaLogin()}

        <NotificationLoader loading={isLoading} error={error} />
        <NotificationLoader loading={isLoading} message={message} />
      </Box>
    </AuthWrapper>
  );
};

export default SignUp;
