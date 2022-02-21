import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../../@jumbo/utils/IntlMessages';
import Button from '@material-ui/core/Button';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { Grid, Box } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import CmtCard from '../../../../@coremat/CmtCard';
import { useAuth } from '../../../../authentication';
import { NotificationLoader } from '../../../../@jumbo/components/ContentLoader';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import {useFormik} from 'formik';
import { useRouter } from 'next/router';

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
  cardRoot: {
    [theme.breakpoints.down('xs')]: {
      '& .Cmt-header-root': {
        flexDirection: 'column',
      },
      '& .Cmt-action-default-menu': {
        marginLeft: 0,
        marginTop: 10,
      },
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: (props) => (props.variant === 'default' ? '50%' : '100%'),
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
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
  errormsg:{
    color:'red'
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

const SignIn = ({ variant = 'default', wrapperVariant = 'default' }) => {
  const classes = useStyles({ variant });
  const router = useRouter()
  const { isLoading, error, message, Addcustomer,Updatecustomer } = useAuth();
  const customer=useSelector(states=>states.Customer.selectcustomer)
  const [name, setName] = useState(customer?.name);
  const [activeStatus, setStatus] = useState(customer?.activeStatus);
  
  const  Schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required'),
    activeStatus: yup.string().required('Status is required'),
  });
  const formik = useFormik({
    initialValues: {
      email:"",
      activeStatus: "",
      name:""
    },
    validationSchema: Schema,
    onSubmit: (values) => {
    Addcustomer({name:values.name,email:values.email,activeStatus:values.activeStatus})},
  });
  const handleClick=()=>{
    if(name!=''){
      Updatecustomer(router.query.id,{name,activeStatus})
    }
  }
  
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Customer', link: '/admin/customer' },
    { label: 'Add Customer',isActive: true },
  ];
  
  return (
    <PageContainer heading="Customer" breadcrumbs={breadcrumbs}>
        
        <CmtCard className={classes.cardRoot}>
            <Box className={classes.authContent}>
                {router.query.id?
                ( <Typography component="div" variant="h1" className={classes.titleRoot}>Edit Customer </Typography>):
                ( <Typography component="div" variant="h1" className={classes.titleRoot}>Add Customer </Typography>)
                
                }
                <form onSubmit={formik.handleSubmit}>
                  {router.query.id?
                    ( 
                      <Box mb={2}>
                        <TextField
                            label={<IntlMessages id="appModule.name" />}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            className={classes.textFieldRoot}
                            {...formik.getFieldProps("name")}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                          <div className={classes.errormsg}>{name==''?<div>{formik.errors.name}</div>:null}</div>
                      </Box>
                    ):(
                      <Box mb={2}>
                        <TextField
                          label={<IntlMessages id="appModule.name" />}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          className={classes.textFieldRoot}
                          {...formik.getFieldProps("name")}
                        />
                        <div className={classes.errormsg}>{formik.errors.name && formik.touched.name?<div>{formik.errors.name}</div>:null}</div>
                      </Box>
                    )
                  }
                  {router.query.id?
                    (
                    <Box mb={2}>
                        <TextField
                        label={<IntlMessages id="appModule.email" />}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className={classes.textFieldRoot}
                        {...formik.getFieldProps("email")}
                        value={customer.email}
                        />
                    </Box>
                    ):(
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
                    )
                  }
                  {router.query.id?
                    (
                    <Box mb={2}>
                        <TextField
                        label={<IntlMessages id="appModule.status" />}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className={classes.textFieldRoot}
                        select
                        {...formik.getFieldProps("activeStatus")}
                        value={activeStatus}
                        onChange={(event) => setStatus(event.target.value)}
                        >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                        </TextField>
                    </Box>
                  ):(
                    <Box mb={2}>
                        <TextField
                        label={<IntlMessages id="appModule.status" />}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className={classes.textFieldRoot}
                        select
                        {...formik.getFieldProps("activeStatus")}
                        >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                        </TextField>
                        <div className={classes.errormsg}>{formik.errors.activeStatus && formik.touched.activeStatus?<div>{formik.errors.activeStatus}</div>:null}</div>
                    </Box>
                  )
                }
                {router.query.id?
                  (
                  <Button onClick={handleClick}  className={classes.bgorange}>
                    <IntlMessages id="appModule.update" />
                  </Button>
                  ):(
                    <Button type="submit"  className={classes.bgorange}>
                      <IntlMessages id="appModule.add" />
                    </Button>
                  )
                }
                </form>
            </Box>
            </CmtCard>
            <NotificationLoader loading={isLoading} error={error} />
            <NotificationLoader loading={isLoading} message={message} />
    </PageContainer>
  );
};

export default SignIn;
