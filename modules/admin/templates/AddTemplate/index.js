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
  const { isLoading, error, message, Addtemplate,Updatetemplate } = useAuth();
  const selecttemplate=useSelector(states=>states.Template.selecttemplate)
  const [name, setName] = useState(selecttemplate?.name);
  const [template, setContent] = useState(selecttemplate?.content);
  const [activeStatus, setStatus] = useState(selecttemplate?.activeStatus);
  
  const  Schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    template: yup.string().required('Template is required'),
    activeStatus: yup.string().required('Status is required'),
  });
  const formik = useFormik({
    initialValues: {
      template:"",
      activeStatus: "",
      name:""
    },
    
    validationSchema: Schema,
    onSubmit: (values) => {
    Addtemplate({name:values.name,template:values.template,activeStatus:values.activeStatus})},
   
  });
  const handleClick=()=>{
    if(name!='' && template!=''){
      Updatetemplate(router.query.id,{name,template,activeStatus})
    }
    
  }
  
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Template', link: '/admin/template' },
    { label: 'Add Template',isActive: true },
  ];
  
  return (
    <PageContainer heading="Template" breadcrumbs={breadcrumbs}>
        
        <CmtCard className={classes.cardRoot}>
            <Box className={classes.authContent}>
                {router.query.id?
                ( <Typography component="div" variant="h1" className={classes.titleRoot}>Edit Template </Typography>):
                ( <Typography component="div" variant="h1" className={classes.titleRoot}>Add Template </Typography>)
                
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
                        label={<IntlMessages id="appModule.template" />}
                        fullWidth
                        multiline
                        rows={5}
                        margin="normal"
                        variant="outlined"
                        className={classes.textFieldRoot}
                        {...formik.getFieldProps("template")}
                        value={template}
                        onChange={(event) => setContent(event.target.value)}
                        />
                        <div className={classes.errormsg}>{template==''?<div>{formik.errors.template}</div>:null}</div>
                    </Box>
                    ):(
                      <Box mb={2}>
                        <TextField
                        label={<IntlMessages id="appModule.template" />}
                        fullWidth
                        multiline
                        margin="normal"
                        variant="outlined"
                        className={classes.textFieldRoot}
                        {...formik.getFieldProps("template")}
                        rows={5}
                        />
                        <div className={classes.errormsg}>{formik.errors.template && formik.touched.template?<div>{formik.errors.template}</div>:null}</div>
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
