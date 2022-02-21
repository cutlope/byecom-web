import React, { useState } from 'react';
import { Box, IconButton, Popover, Tooltip, useTheme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Button from '@material-ui/core/Button';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../../authentication';
import { NotificationLoader } from '../../../@jumbo/components/ContentLoader';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import {useFormik} from 'formik';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import CmtCard from '../../../@coremat/CmtCard';

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
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: (props) => (props.variant === 'default' ? '50%' : '70%'),
      order: 1,
      margin:'auto'
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


const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Users',  isActive: true  },
];

const CryptoDashboard = () => {
  const classes = useStyles();
  const router=useRouter()
  const { isLoading, error, message, userSignup, renderSocialMediaLogin } = useAuth();

  const  Schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
    role: yup.string().required('Role is required'),
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
 
  return (
   
    <PageContainer heading=" Users" breadcrumbs={breadcrumbs} >
       <CmtCard className={classes.cardRoot}>
          <Box className={classes.authContent}>
            <Typography component="div" variant="h1" className={classes.titleRoot}>
              Add Users
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
            </Box>
            </form>
          </Box>
        </CmtCard>

        <NotificationLoader loading={isLoading} error={error} />
        <NotificationLoader loading={isLoading} message={message} />
    </PageContainer>
  );
};

export default CryptoDashboard;
