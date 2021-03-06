import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDropzone } from 'react-dropzone';

import makeStyles from '@material-ui/core/styles/makeStyles';
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import CmtGridView from '../../../@coremat/CmtGridView';
import { useRouter } from 'next/router';
import CmtButtons from '../../../@coremat/CmtButtons';

const useStyles = makeStyles((theme) => ({
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
  cardContentRoot: {
    padding: 0,
  },
  scrollbarRoot: {
    height: 975,
  },
  spam: {
    float: 'left',
  },
  tick: {
    float: 'right',
  },
  gridless: {
    height: '50%',
  },
  py: {
    'padding-top': '4px',
    'padding-bottom': '4px',
  },
  svg: {
    'vertical-align': 'middle',
    'padding-right': '4px',
  },
  svg2: {
    'vertical-align': 'middle',
    'padding-bottom': '4px',
    'padding-right': '4px',
  },
  btnCnl: {
    color: '#F44336',
  },
  btnSvg: {
    color: '#04AA53',
  },
}));

const green = {
  500: '#04AA53',
};

const grey = {
  400: '#BFC7CF',
  500: '#AAB4BE',
};

const Root = styled('span')`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-top: 20px
  cursor: pointer;


  & .${switchUnstyledClasses.track} {
    background: ${grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${green[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
`;

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  width: '330px',
  height: '146px',
  borderWidth: 4,
  'border-radius': '17px',
  borderColor: '#38ba88',
  borderStyle: 'dashed',
  backgroundColor: '#E6F7EE',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const type = [
  {
    id: 1,
    name: 'Product',
    icon: (
      <svg width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.529 0L6.164.534c-.75.294-1.364.556-1.363.583 0 .028 1.553.665 3.45 1.418 1.897.753 3.526 1.372 3.62 1.377.242.012 2.813-1.018 2.727-1.092-.038-.034-1.644-.682-3.57-1.44L7.529 0zM2.85 1.887c-.059 0-.655.216-1.324.48-.957.379-1.18.497-1.05.553.091.039 1.69.677 3.552 1.417S7.453 5.685 7.5 5.687c.047.002.645-.22 1.329-.493 1.115-.446 1.22-.506 1.028-.58C9.74 4.57 8.14 3.936 6.301 3.21s-3.39-1.322-3.45-1.322zM.026 3.242C.012 3.242 0 5.026 0 7.207v3.965l3.536 1.406c1.944.774 3.584 1.41 3.643 1.414.086.006.104-.808.086-3.947L7.243 6.09 3.648 4.666A400.146 400.146 0 00.026 3.242zm14.95 0c-.013 0-.64.244-1.393.542l-1.369.543-.024 1.1c-.022 1.032-.034 1.099-.185 1.06-.106-.028-.195.02-.258.136-.072.132-.15.165-.298.128-.146-.036-.237 0-.332.135-.101.143-.165.166-.282.1-.116-.063-.187-.04-.305.098-.148.176-.153.15-.156-.898-.001-.594-.033-1.08-.07-1.08-.038 0-.627.221-1.308.492l-1.239.492-.022 3.955C7.723 12.22 7.742 14 7.777 14c.036 0 1.675-.636 3.644-1.414L15 11.172V7.207c0-2.18-.01-3.965-.024-3.965z"
          fill="#fff"
        />
      </svg>
    ),
    altIcon: (
      <svg width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.529 0L6.164.534c-.75.294-1.364.556-1.363.583 0 .028 1.553.665 3.45 1.418 1.897.753 3.526 1.372 3.62 1.377.242.012 2.813-1.018 2.727-1.092-.038-.034-1.644-.682-3.57-1.44L7.529 0zM2.85 1.887c-.059 0-.655.216-1.324.48-.957.379-1.18.497-1.05.553.091.039 1.69.677 3.552 1.417S7.453 5.685 7.5 5.687c.047.002.645-.22 1.329-.493 1.115-.446 1.22-.506 1.028-.58C9.74 4.57 8.14 3.936 6.301 3.21s-3.39-1.322-3.45-1.322zM.026 3.242C.012 3.242 0 5.026 0 7.207v3.965l3.536 1.406c1.944.774 3.584 1.41 3.643 1.414.086.006.104-.808.086-3.947L7.243 6.09 3.648 4.666A400.146 400.146 0 00.026 3.242zm14.95 0c-.013 0-.64.244-1.393.542l-1.369.543-.024 1.1c-.022 1.032-.034 1.099-.185 1.06-.106-.028-.195.02-.258.136-.072.132-.15.165-.298.128-.146-.036-.237 0-.332.135-.101.143-.165.166-.282.1-.116-.063-.187-.04-.305.098-.148.176-.153.15-.156-.898-.001-.594-.033-1.08-.07-1.08-.038 0-.627.221-1.308.492l-1.239.492-.022 3.955C7.723 12.22 7.742 14 7.777 14c.036 0 1.675-.636 3.644-1.414L15 11.172V7.207c0-2.18-.01-3.965-.024-3.965z"
          fill="#04aa53"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Store',
    icon: (
      <svg width={13} height={14} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M.712 13.875a1.238 1.238 0 01-.39-.367l-.153-.243v-6.69h12.664v3.36c0 3.785.013 3.683-.496 3.926-.187.09-.438.136-.74.137L11.14 14V7.503H7.686V14h-3.37c-3.072 0-3.389-.011-3.604-.125zm5.721-2.231v-.178l-2.31-.02c-1.995-.015-2.322-.003-2.396.09-.068.087-.068.13 0 .216.074.093.401.105 2.396.09l2.31-.02v-.178zm.068-2.463V7.54L4.08 7.52l-2.421-.018V10.86l2.42-.018 2.422-.019V9.181zm1.752 4.357a.367.367 0 010-.216c.032-.09.23-.107 1.196-.107h1.158l-.021.196-.022.196-1.136.02c-.966.017-1.141.003-1.175-.09zm1.868-2.596c-.118-.1-.143-.174-.108-.32.053-.22.327-.328.484-.19.147.127.128.478-.03.567-.17.096-.166.096-.346-.057zM.654 5.926C.22 5.693 0 5.302 0 4.76c0-.406.048-.536.758-2.076l.757-1.642 4.908-.018 4.908-.018.234.447c.13.245.505 1.008.836 1.696.548 1.138.601 1.284.599 1.65-.007 1.274-1.611 1.754-2.31.691-.172-.263-.193-.352-.187-.819.005-.381-.016-.523-.08-.523s-.076.099-.049.382c.068.688-.214 1.223-.759 1.443a1.27 1.27 0 01-1.75-1.215c.002-.198.016-.406.03-.463a.102.102 0 00-.074-.127c-.083-.02-.101.076-.101.537 0 .507-.019.586-.195.83a1.251 1.251 0 01-2.053-.006c-.168-.233-.19-.323-.19-.786 0-.438-.018-.523-.111-.523-.094 0-.103.042-.055.267.158.739-.366 1.5-1.082 1.572-.86.087-1.474-.53-1.413-1.424.022-.316.006-.416-.063-.416-.07 0-.08.082-.046.356.037.298.016.416-.132.732-.23.493-.543.716-1.05.75-.295.02-.45-.01-.676-.13zM1.47.564c-.104-.11-.104-.36 0-.471.118-.124 9.946-.124 10.064 0 .104.11.104.361 0 .471-.118.124-9.946.124-10.064 0z"
          fill="#fff"
        />
      </svg>
    ),
    altIcon: (
      <svg width={13} height={14} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M.712 13.875a1.238 1.238 0 01-.39-.367l-.153-.243v-6.69h12.664v3.36c0 3.785.013 3.683-.496 3.926-.187.09-.438.136-.74.137L11.14 14V7.503H7.686V14h-3.37c-3.072 0-3.389-.011-3.604-.125zm5.721-2.231v-.178l-2.31-.02c-1.995-.015-2.322-.003-2.396.09-.068.087-.068.13 0 .216.074.093.401.105 2.396.09l2.31-.02v-.178zm.068-2.463V7.54L4.08 7.52l-2.421-.018V10.86l2.42-.018 2.422-.019V9.181zm1.752 4.357a.367.367 0 010-.216c.032-.09.23-.107 1.196-.107h1.158l-.021.196-.022.196-1.136.02c-.966.017-1.141.003-1.175-.09zm1.868-2.596c-.118-.1-.143-.174-.108-.32.053-.22.327-.328.484-.19.147.127.128.478-.03.567-.17.096-.166.096-.346-.057zM.654 5.926C.22 5.693 0 5.302 0 4.76c0-.406.048-.536.758-2.076l.757-1.642 4.908-.018 4.908-.018.234.447c.13.245.505 1.008.836 1.696.548 1.138.601 1.284.599 1.65-.007 1.274-1.611 1.754-2.31.691-.172-.263-.193-.352-.187-.819.005-.381-.016-.523-.08-.523s-.076.099-.049.382c.068.688-.214 1.223-.759 1.443a1.27 1.27 0 01-1.75-1.215c.002-.198.016-.406.03-.463a.102.102 0 00-.074-.127c-.083-.02-.101.076-.101.537 0 .507-.019.586-.195.83a1.251 1.251 0 01-2.053-.006c-.168-.233-.19-.323-.19-.786 0-.438-.018-.523-.111-.523-.094 0-.103.042-.055.267.158.739-.366 1.5-1.082 1.572-.86.087-1.474-.53-1.413-1.424.022-.316.006-.416-.063-.416-.07 0-.08.082-.046.356.037.298.016.416-.132.732-.23.493-.543.716-1.05.75-.295.02-.45-.01-.676-.13zM1.47.564c-.104-.11-.104-.36 0-.471.118-.124 9.946-.124 10.064 0 .104.11.104.361 0 .471-.118.124-9.946.124-10.064 0z"
          fill="#04aa53"
        />
      </svg>
    ),
  },
  {
    id: '3',
    name: 'Collection',
    icon: (
      <svg width={22} height={18} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.889 17.799c-1.1-.75-.75-2.332.564-2.549l.351-.057.765-2.03c1.035-2.747.893-2.482 1.25-2.345.209.08.282.16.242.266-.353.904-1.608 4.272-1.608 4.313 0 .03.11.219.245.419.177.263.244.495.244.84 0 .414-.048.528-.373.88-.318.345-.444.412-.855.45-.393.038-.547.003-.825-.187zm9.977-4.016c-.439-.224-.731-.74-.734-1.298l-.003-.437-1.418-.934c-.78-.514-1.482-.972-1.561-1.017-.124-.071-.125-.118-.008-.339.075-.14.179-.256.232-.256.053 0 .695.393 1.426.874 1.796 1.182 1.685 1.131 2.1.956.996-.422 1.917.173 1.917 1.239 0 1.07-1.006 1.695-1.951 1.212zM.623 11.199C.165 10.908 0 10.608 0 10.069c0-.67.217-1.039.75-1.278.57-.255 1-.179 1.485.265l.366.334 1.704-.433c.937-.238 1.717-.42 1.735-.402.017.018.04.158.051.313l.02.28-1.609.43c-.884.235-1.665.476-1.735.535a.433.433 0 00-.127.293c0 .103-.147.35-.326.548-.284.313-.396.365-.856.4-.406.03-.6-.005-.835-.155zm19.861-.378c-.758-.169-1.137-.626-1.149-1.384l-.006-.458-2.141-1.423-2.141-1.424-.438.15c-.57.197-.679.192-1.186-.057l-.425-.208-.828.5-.828.501-.149-.292-.149-.292.516-.33c.284-.182.659-.414.833-.517.276-.161.318-.24.318-.585.002-1.307 1.624-1.83 2.436-.784.148.19.204.405.204.782v.519l1.393.934c3.024 2.028 2.963 1.994 3.247 1.805.188-.124.392-.154.804-.12.483.04.594.092.879.407.286.316.326.426.326.898 0 .441-.048.597-.264.857a1.873 1.873 0 01-.584.453c-.33.14-.342.14-.668.068zM7.97 10.106a2.163 2.163 0 01-1.07-1.12c-.483-1.169.268-2.578 1.524-2.864 1.409-.32 2.814 1.146 2.44 2.549-.345 1.298-1.726 1.983-2.894 1.435zM5.557 6.133l-.75-.587-.347.147c-.452.191-.706.182-1.192-.041-.939-.432-.97-1.95-.05-2.43.366-.193.959-.196 1.28-.008.134.079.294.17.355.203.06.032.753-.327 1.54-.8l1.43-.857v-.41A1.344 1.344 0 019.18 0c1.698-.003 1.855 2.462.175 2.738-.247.04-.475-.006-.792-.162l-.446-.218-1.418.853c-1.01.607-1.419.905-1.419 1.035 0 .1-.025.311-.056.468-.052.264.006.33.788.916l.843.631-.218.235c-.12.129-.243.232-.274.23-.03-.004-.394-.27-.806-.593z"
          fill="#fff"
        />
      </svg>
    ),
    altIcon: (
      <svg width={22} height={18} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.889 17.799c-1.1-.75-.75-2.332.564-2.549l.351-.057.765-2.03c1.035-2.747.893-2.482 1.25-2.345.209.08.282.16.242.266-.353.904-1.608 4.272-1.608 4.313 0 .03.11.219.245.419.177.263.244.495.244.84 0 .414-.048.528-.373.88-.318.345-.444.412-.855.45-.393.038-.547.003-.825-.187zm9.977-4.016c-.439-.224-.731-.74-.734-1.298l-.003-.437-1.418-.934c-.78-.514-1.482-.972-1.561-1.017-.124-.071-.125-.118-.008-.339.075-.14.179-.256.232-.256.053 0 .695.393 1.426.874 1.796 1.182 1.685 1.131 2.1.956.996-.422 1.917.173 1.917 1.239 0 1.07-1.006 1.695-1.951 1.212zM.623 11.199C.165 10.908 0 10.608 0 10.069c0-.67.217-1.039.75-1.278.57-.255 1-.179 1.485.265l.366.334 1.704-.433c.937-.238 1.717-.42 1.735-.402.017.018.04.158.051.313l.02.28-1.609.43c-.884.235-1.665.476-1.735.535a.433.433 0 00-.127.293c0 .103-.147.35-.326.548-.284.313-.396.365-.856.4-.406.03-.6-.005-.835-.155zm19.861-.378c-.758-.169-1.137-.626-1.149-1.384l-.006-.458-2.141-1.423-2.141-1.424-.438.15c-.57.197-.679.192-1.186-.057l-.425-.208-.828.5-.828.501-.149-.292-.149-.292.516-.33c.284-.182.659-.414.833-.517.276-.161.318-.24.318-.585.002-1.307 1.624-1.83 2.436-.784.148.19.204.405.204.782v.519l1.393.934c3.024 2.028 2.963 1.994 3.247 1.805.188-.124.392-.154.804-.12.483.04.594.092.879.407.286.316.326.426.326.898 0 .441-.048.597-.264.857a1.873 1.873 0 01-.584.453c-.33.14-.342.14-.668.068zM7.97 10.106a2.163 2.163 0 01-1.07-1.12c-.483-1.169.268-2.578 1.524-2.864 1.409-.32 2.814 1.146 2.44 2.549-.345 1.298-1.726 1.983-2.894 1.435zM5.557 6.133l-.75-.587-.347.147c-.452.191-.706.182-1.192-.041-.939-.432-.97-1.95-.05-2.43.366-.193.959-.196 1.28-.008.134.079.294.17.355.203.06.032.753-.327 1.54-.8l1.43-.857v-.41A1.344 1.344 0 019.18 0c1.698-.003 1.855 2.462.175 2.738-.247.04-.475-.006-.792-.162l-.446-.218-1.418.853c-1.01.607-1.419.905-1.419 1.035 0 .1-.025.311-.056.468-.052.264.006.33.788.916l.843.631-.218.235c-.12.129-.243.232-.274.23-.03-.004-.394-.27-.806-.593z"
          fill="#04AA53"
        />
      </svg>
    ),
  },
];

const NewCategory = () => {
  const router = useRouter();
  const classes = useStyles();
  const [value, setValue] = useState('Image');
  const [selectedType, setSelectedType] = useState({});

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ accept: 'image/*' });

  const renderType = (item, index) => {
    return (
      <Box key={index} className={classes.itemRoot}>
        <CmtButtons
          items={[item]}
          variant="contained"
          color={selectedType.id == item.id ? 'dark' : 'green'}
          type="default"
          alt={selectedType.id == item.id ? false : true}
          sx={{ justifyContent: 'center' }}
          onItemClick={(item) => {
            setSelectedType(item);
          }}
        />
      </Box>
    );
  };
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  return (
    <CmtCard className={classes.cardRoot}>
      <Box sx={{ float: 'right', 'padding-top': '20px', 'padding-right': '24px' }}>
        <Button onClick={() => router.push('/marketplace/category')} style={{ color: '#F44336' }}>
          <CloseOutlinedIcon />
          <span className="ml-1 pr-4">Cancel</span>
        </Button>
        <Button onClick={(button) => console.log(button)} style={{ color: '#04AA53' }}>
          <SaveIcon />
          <span className="ml-1">Save Category</span>
        </Button>
      </Box>
      <CmtCardHeader
        className="pt-4"
        title="Add New Category"
        titleProps={{
          variant: 'h1',
          component: 'div',
        }}>
        <Box clone></Box>
      </CmtCardHeader>
      <CmtCardContent className={classes.cardContentRoot}>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            minHeight: '100%',
            p: 3,
          }}>
          <form onSubmit={(event) => event.preventDefault()}>
            <Grid container spacing={3} sx={{ '& .MuiGrid-root': { flexBasis: 'auto' } }}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box sx={{ maxWidth: 550 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingBottom: '8px',
                      '& .MuiTypography-root': { paddingLeft: '3px' },
                    }}>
                    <svg width={15} height={17} fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.24 5.92l-.6.2-2.66-3.94H8.54v13.3l2.1.72-.4.8H4.16v-.62l1.88-1.48V2.18H3.66L1 6.12l-.6-.2v-5l1.08.36h11.68l1.08-.36v5z"
                        fill="#FF920D"
                      />
                    </svg>
                    <Typography variant="subtitle2">Category Name</Typography>
                  </Box>
                  <TextField
                    placeholder="Input goods name.."
                    fullWidth
                    name="name"
                    variant="standard"
                    required
                    sx={{ maxWidth: 300, paddingTop: '8px' }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: 4,
                      paddingBottom: 2,
                      '& .MuiTypography-root': { paddingLeft: '3px' },
                    }}>
                    <svg width={20} height={18} fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M.71 17.814C-.03 17.425 0 17.813 0 9S-.03.575.71.186C1.04.013 1.699 0 10 0s8.96.013 9.29.186C20.03.575 20 .187 20 9s.031 8.425-.71 8.814c-.33.173-.988.186-9.29.186s-8.96-.013-9.29-.186zm17.869-9.72c0-6.035-.005-6.182-.203-6.39-.2-.21-.339-.213-8.376-.213-8.037 0-8.176.003-8.376.213-.198.208-.203.355-.203 6.337 0 3.369.02 6.125.045 6.125.025 0 1.334-1.63 2.91-3.623C7.401 6.715 7.502 6.615 8.14 6.842c.15.053.784.68 1.41 1.394 2.05 2.334 1.959 2.29 2.955 1.446.77-.653 1.02-.769 1.327-.62.125.062 1.233 1.256 2.461 2.655a199.627 199.627 0 002.26 2.549c.013.004.025-2.774.025-6.171zM14 7.209c-1.47-.814-1.472-3.118-.003-3.898.593-.315.974-.36 1.561-.18 1.492.455 2.043 2.282 1.064 3.528-.623.792-1.755 1.03-2.622.55z"
                        fill="#FF920D"
                      />
                    </svg>
                    <Typography variant="subtitle2">Images</Typography>
                  </Box>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="Image"
                        control={
                          <Radio
                            size="small"
                            sx={{
                              '&.Mui-checked': {
                                color: '#04aa53',
                              },
                            }}
                          />
                        }
                        label="Image"
                        sx={{ paddingRight: 2, paddingLeft: 1, '& .MuiTypography-root': { paddingLeft: '3px' } }}
                      />
                      <FormControlLabel
                        value="Svg"
                        control={
                          <Radio
                            size="small"
                            sx={{
                              '&.Mui-checked': {
                                color: '#04aa53',
                              },
                            }}
                          />
                        }
                        label="Svg"
                        sx={{ paddingRight: 2, '& .MuiTypography-root': { paddingLeft: '3px' } }}
                      />
                    </RadioGroup>
                  </FormControl>

                  {value === 'Image' ? (
                    <Box mt={2} sx={{ minWidth: 420 }}>
                      <Box {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <Typography>Drop your image here or Browse</Typography>
                      </Box>
                    </Box>
                  ) : (
                    <TextField
                      multiline
                      rows={4}
                      placeholder="Enter svg code here"
                      fullWidth="true"
                      sx={{ display: 'block', paddingTop: 2 }}
                    />
                  )}

                  <Box mt={4}>
                    <Typography sx={{ pb: 2 }} variant="subtitle2">
                      <svg className={classes.svg} width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.787 12.168H6.372M11.787 9.027H6.372M8.438 5.896H6.372"
                          stroke="#FF920D"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          clipRule="evenodd"
                          d="M11.931 2.063l-5.766.002c-2.07.013-3.352 1.375-3.352 3.453v6.897c0 2.088 1.291 3.455 3.38 3.455l5.766-.002c2.07-.013 3.353-1.376 3.353-3.453V5.518c0-2.088-1.292-3.455-3.38-3.455z"
                          stroke="#FF920D"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Order
                    </Typography>
                    <TextField placeholder="Input here.." fullWidth name="name" required sx={{ maxWidth: 300 }} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',

                      paddingTop: 4,
                      paddingBottom: 2,
                      '& .MuiTypography-root': { paddingLeft: '3px' },
                    }}>
                    <svg width={19} height={19} fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.813 18.888C1.16 18.691.308 17.783.12 17.084c-.097-.36-.14-1.418-.111-2.753.044-2.082.06-2.19.417-2.728.204-.309.609-.709.899-.89.505-.314.637-.328 3.027-.328 2.48 0 2.504.003 3.06.371.308.204.708.61.888.9.314.505.329.639.329 3.021 0 2.382-.015 2.516-.329 3.02-.18.292-.58.697-.888.9-.546.363-.619.373-2.852.4-1.26.015-2.497-.034-2.747-.109zm4.834-1.879c.224-.202.253-.47.253-2.308 0-1.74-.037-2.12-.229-2.332-.202-.224-.47-.253-2.305-.253-1.738 0-2.118.037-2.33.229-.223.202-.252.47-.252 2.308 0 1.74.037 2.12.228 2.332.203.224.47.254 2.306.254 1.738 0 2.118-.038 2.33-.23zm5.537 1.879c-.653-.197-1.505-1.105-1.693-1.804-.097-.36-.14-1.418-.11-2.753.043-2.082.06-2.19.416-2.728.204-.309.609-.709.9-.89.504-.314.637-.328 3.026-.328 2.48 0 2.504.003 3.06.371.308.204.708.61.889.9.313.505.328.639.328 3.021 0 2.382-.015 2.516-.328 3.02-.18.292-.58.697-.889.9-.545.363-.619.373-2.852.4-1.26.015-2.497-.034-2.747-.109zm4.835-1.879c.223-.202.252-.47.252-2.308 0-1.74-.037-2.12-.228-2.332-.203-.224-.47-.253-2.306-.253-1.738 0-2.117.037-2.33.229-.223.202-.252.47-.252 2.308 0 1.74.037 2.12.229 2.332.202.224.47.254 2.305.254 1.738 0 2.118-.038 2.33-.23zM1.813 8.503C1.16 8.307.308 7.398.12 6.7c-.097-.36-.14-1.417-.111-2.753.044-2.082.06-2.19.417-2.728.204-.308.609-.709.899-.89C1.83.015 1.962 0 4.352 0c2.48 0 2.504.003 3.06.371.308.205.708.61.888.9.314.506.329.64.329 3.021 0 2.383-.015 2.516-.329 3.021-.18.29-.58.696-.888.9-.546.362-.619.372-2.852.4-1.26.015-2.497-.034-2.747-.11zm4.834-1.878c.224-.203.253-.47.253-2.309 0-1.74-.037-2.12-.229-2.332-.202-.224-.47-.253-2.305-.253-1.738 0-2.118.037-2.33.229-.223.203-.252.47-.252 2.308 0 1.74.037 2.12.228 2.333.203.224.47.253 2.306.253 1.738 0 2.118-.037 2.33-.23zm5.537 1.878c-.653-.196-1.505-1.105-1.693-1.804-.097-.36-.14-1.417-.11-2.753.043-2.082.06-2.19.416-2.728.204-.308.609-.709.9-.89C12.2.015 12.333 0 14.722 0c2.48 0 2.504.003 3.06.371.308.205.708.61.889.9.313.506.328.64.328 3.021 0 2.383-.015 2.516-.328 3.021-.18.29-.58.696-.889.9-.545.362-.619.372-2.852.4-1.26.015-2.497-.034-2.747-.11zm4.835-1.878c.223-.203.252-.47.252-2.309 0-1.74-.037-2.12-.228-2.332-.203-.224-.47-.253-2.306-.253-1.738 0-2.117.037-2.33.229-.223.203-.252.47-.252 2.308 0 1.74.037 2.12.229 2.333.202.224.47.253 2.305.253 1.738 0 2.118-.037 2.33-.23z"
                        fill="#FF920D"
                      />
                    </svg>
                    <Typography variant="subtitle2">Type</Typography>
                  </Box>
                  <Box sx={{ maxWidth: 450, overflow: 'inherit' }}>
                    <CmtGridView data={type} renderRow={renderType} itemPadding={5} column={3} />
                  </Box>
                </Box>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingBottom: 2,
                    '& .MuiTypography-root': { paddingLeft: '3px' },
                  }}>
                  <svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M.043 16.603l-.034-6.31C-.016 5.787.01 3.825.1 3.43c.218-.954 1.109-1.568 2.276-1.568.308 0 .332-.027.332-.365 0-.497.239-1.002.6-1.273C3.603.004 3.672 0 7.494 0c3.823 0 3.892.004 4.187.224.361.27.6.776.6 1.273 0 .338.024.365.332.365 1.11 0 2.029.6 2.261 1.478.07.262.126 1.107.126 1.878 0 1.265-.021 1.423-.217 1.61a.703.703 0 01-.98 0c-.198-.189-.217-.345-.217-1.743 0-1.76-.053-1.878-.843-1.878-.409 0-.455.028-.566.347-.066.19-.245.458-.398.595l-.277.248M.043 16.603l.255.423a2.5 2.5 0 00.701.698l.447.276M.043 16.603h.05v-.014m-.05.014l.043-.025.007.011M1.446 18h6.021c5.045 0 6.07-.024 6.326-.15.443-.218.96-.82 1.092-1.27.07-.241.114-1.914.114-4.376 0-3.44.002-4.218-.323-4.394-.096-.052-.22-.051-.383-.051-.161 0-.286-.002-.382.05-.328.176-.325.966-.325 4.519v4.108l-.242.162c-.211.14-.95.16-5.85.16-4.9 0-5.638-.02-5.85-.16l-.241-.162v-6.425c0-5.552-.032-6.59.348-6.773.116-.056.27-.031.476-.031.43 0 .473.025.585.347.066.19.245.458.398.595l.277.248M1.447 18l.026-.043-.012-.007m-.015.05v-.05h.015M3.487 4.397h8.015m-8.015 0l.033-.038-.014-.012m-.019.05v-.05h.02m7.995.05v-.05h-.02m.02.05l-.034-.038.014-.012m0 0H3.506m7.976 0l.264-.236a1.47 1.47 0 00.223-.267c.07-.106.13-.217.16-.307.055-.156.099-.26.193-.319a.412.412 0 01.17-.051c.066-.008.149-.01.25-.01.197 0 .357.007.482.048.13.043.22.123.282.26.06.134.092.321.11.58.017.261.02.6.02 1.04 0 .7.005 1.085.034 1.319a.813.813 0 00.061.247.653.653 0 001.123.002.762.762 0 00.061-.233c.03-.216.035-.568.035-1.202 0-.384-.014-.787-.037-1.127a4.939 4.939 0 00-.087-.738c-.225-.85-1.119-1.44-2.213-1.44a1.2 1.2 0 01-.19-.011.214.214 0 01-.129-.062.247.247 0 01-.054-.136 1.568 1.568 0 01-.01-.207c0-.483-.232-.973-.58-1.233a.63.63 0 00-.224-.12 2.422 2.422 0 00-.518-.065C10.378.051 9.406.05 7.494.05c-1.912 0-2.883 0-3.413.03a2.423 2.423 0 00-.518.064.629.629 0 00-.225.12c-.347.26-.58.75-.58 1.233 0 .084-.001.153-.009.207a.247.247 0 01-.055.136.214.214 0 01-.128.062 1.2 1.2 0 01-.19.01c-1.15 0-2.016.603-2.227 1.53h0c-.021.093-.04.285-.054.596-.015.309-.026.731-.033 1.282C.047 6.423.046 8.04.059 10.293l.034 6.296M3.506 4.347l-.263-.236a1.469 1.469 0 01-.223-.267 1.442 1.442 0 01-.161-.307c-.055-.157-.098-.263-.195-.32a.43.43 0 00-.174-.05 2.506 2.506 0 00-.263-.01 4.43 4.43 0 01-.142-.003h-.01a2.52 2.52 0 00-.137-.002.467.467 0 00-.236.056.423.423 0 00-.168.222 1.918 1.918 0 00-.098.454c-.086.706-.085 2.12-.084 4.937v7.642l.023.015.242.161c.063.042.159.07.336.093a9.8 9.8 0 00.857.049c.824.023 2.235.028 4.684.028 2.45 0 3.86-.006 4.685-.028.412-.011.68-.027.857-.05.177-.021.273-.05.336-.092l.242-.16.022-.016v-4.202c0-2.256 0-3.376.086-3.934.044-.282.108-.403.189-.46a.33.33 0 01.153-.05c.062-.008.133-.008.219-.008h.014c.088 0 .16 0 .224.007a.334.334 0 01.153.051c.081.056.145.174.189.45.087.547.087 1.645.086 3.86v.027c0 1.23-.01 2.264-.03 3.02-.01.377-.023.685-.037.914a6.224 6.224 0 01-.022.28 1.001 1.001 0 01-.023.148c-.063.216-.22.473-.42.704-.198.23-.433.43-.646.535-.055.027-.159.052-.37.072-.209.02-.517.034-.976.045-.918.022-2.435.028-4.958.028H1.461m0 0l-.435-.268A2.454 2.454 0 01.34 17l-.248-.41M10.916 1.24v-.05H4.072v2.066H10.916V1.24zM2.96 14.55a.77.77 0 01-.144-.194.438.438 0 01-.058-.184c0-.045.02-.111.058-.183a.77.77 0 01.144-.194.373.373 0 01.19-.105c.103-.027.269-.046.564-.06.589-.027 1.677-.028 3.78-.028 2.104 0 3.192.002 3.78.028.296.013.461.033.565.06.1.026.142.06.19.105a.77.77 0 01.143.194.437.437 0 01.058.183c0 .045-.02.112-.058.184a.771.771 0 01-.143.194.373.373 0 01-.19.104c-.104.028-.27.047-.564.06-.589.027-1.677.03-3.78.03-2.104 0-3.192-.003-3.781-.03-.295-.013-.46-.032-.565-.06a.373.373 0 01-.189-.104zm0-2.586a.771.771 0 01-.144-.194.438.438 0 01-.058-.184c0-.045.02-.111.058-.183a.771.771 0 01.144-.194.374.374 0 01.19-.105c.103-.027.269-.047.564-.06.589-.027 1.677-.029 3.78-.029 2.104 0 3.192.002 3.78.029.296.013.461.033.565.06.1.026.142.06.19.105a.773.773 0 01.143.194.437.437 0 01.058.183c0 .045-.02.112-.058.184a.773.773 0 01-.143.194.374.374 0 01-.19.104c-.104.028-.27.047-.564.06-.589.027-1.677.029-3.78.029-2.104 0-3.192-.002-3.781-.028-.295-.014-.46-.033-.565-.06a.374.374 0 01-.189-.105zm0-2.586a.77.77 0 01-.144-.194A.438.438 0 012.758 9c0-.045.02-.112.058-.184a.77.77 0 01.144-.194.374.374 0 01.19-.104c.103-.027.269-.047.564-.06.589-.027 1.677-.029 3.78-.029 2.104 0 3.192.002 3.78.029.296.013.461.033.565.06.1.026.142.059.19.104a.771.771 0 01.143.194.438.438 0 01.058.184c0 .045-.02.112-.058.184a.771.771 0 01-.143.194.374.374 0 01-.19.104c-.104.027-.27.047-.564.06-.589.027-1.677.029-3.78.029-2.104 0-3.192-.002-3.781-.029-.295-.013-.46-.033-.565-.06a.374.374 0 01-.189-.104zm0-2.587a.77.77 0 01-.144-.194.438.438 0 01-.058-.183c0-.045.02-.112.058-.184a.77.77 0 01.144-.194.428.428 0 01.16-.103c.07-.026.172-.046.34-.06.334-.027.916-.03 2.005-.03 1.057 0 1.639.004 1.978.03.17.013.274.03.345.055a.318.318 0 01.143.089c.22.23.208.616-.016.808-.072.063-.184.105-.54.13-.353.024-.933.03-1.929.03-1.08 0-1.656-.004-1.989-.031a1.318 1.318 0 01-.338-.06.43.43 0 01-.159-.103z"
                      fill="#FF920D"
                      stroke="#FF920D"
                      strokeWidth={0.4}
                    />
                  </svg>
                  <Typography variant="subtitle2">Description</Typography>
                </Box>
                <TextField
                  multiline
                  rows={8}
                  fullWidth="true"
                  sx={{
                    display: 'block',
                    paddingTop: 2,
                    width: { xs: 450, sm: 350, md: 400, lg: 550, xl: 800 },
                    minWidth: '300px',
                  }}
                />
                <Box mt={4} sx={{ maxWidth: 300 }}>
                  <svg className={classes.svg} width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.9 16.372c-2.606-.481-4.992-2.516-5.842-4.98l-.123-.358h.808c.72 0 .814.02.864.181.128.412.96 1.573 1.471 2.05 1.168 1.093 2.336 1.587 3.907 1.654 1.948.082 3.333-.46 4.675-1.833.903-.924 1.425-1.867 1.68-3.034.223-1.03.15-2.548-.166-3.466C15.53 4.72 14.14 3.3 12.3 2.628c-.728-.266-.868-.286-2.01-.285-1.096 0-1.302.028-1.918.25-1.364.49-2.48 1.353-3.219 2.49-.424.653-.885 1.8-.981 2.441l-.052.349h2.798l.541-1.046c.666-1.287.779-1.448 1.064-1.521.54-.139.69.045 1.722 2.087.535 1.056 1.005 1.958 1.047 2.002.041.045.241-.256.444-.67.333-.676.405-.762.719-.858.196-.06.717-.093 1.19-.074.792.031.856.049 1.062.294.263.314.281.709.045 1.007-.15.19-.275.226-.922.266l-.748.047-.562 1.09c-.308.599-.636 1.174-.728 1.278-.213.24-.715.25-.941.018-.092-.093-.586-1.003-1.098-2.022-.512-1.018-.965-1.888-1.008-1.933-.043-.045-.205.18-.367.511-.16.326-.374.687-.477.802l-.188.21H1.19l-.223-.229a.739.739 0 01-.05-.993c.15-.19.275-.226.931-.266l.758-.047.062-.45c.087-.625.413-1.687.688-2.244C4.382 3.059 6.094 1.634 8.355.972 9.362.677 11.212.676 12.213.97c1.423.416 2.526 1.07 3.517 2.083a7.917 7.917 0 012.114 7.105c-.855 4.236-4.804 6.98-8.945 6.215z"
                      fill="#FF920D"
                    />
                  </svg>
                  <span>Status</span>
                  <SwitchUnstyled className={classes.tick} component={Root} defaultChecked />
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default NewCategory;
