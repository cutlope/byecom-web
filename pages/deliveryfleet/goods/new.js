import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  Select,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDropzone } from 'react-dropzone';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import { useRouter } from 'next/router';

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

const NewGood = () => {
  const router = useRouter();
  const classes = useStyles();
  const [value, setValue] = useState('Image');
  const [selectedType, setSelectedType] = useState({});
  const [checked, setChecked] = useState(true);
  const [Category, setCategory] = React.useState('');


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ accept: 'image/*' });

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
        <Button onClick={() => router.push('/deliveryfleet/goods')} style={{ color: '#F44336' }}>
          <CloseOutlinedIcon />
          <span className="ml-1 pr-4">Cancel</span>
        </Button>
        <Button onClick={(button) => console.log(button)} style={{ color: '#04AA53' }}>
          <SaveIcon />
          <span className="ml-1">Save Goods</span>
        </Button>
      </Box>
      <CmtCardHeader
        className="pt-4"
        title="Add new Goods"
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
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box>
                  <Typography sx={{ pb: 2 }} variant="subtitle2">
                    <svg
                      className={classes.svg2}
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="22"
                      height="22"
                      fill="none"
                      viewBox="0 0 18 18">
                      <mask
                        id="mask0_68_8575"
                        style={{ maskType: 'alpha' }}
                        width="18"
                        height="18"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse">
                        <path fill="url(#pattern0)" d="M0 0H18V18H0z"></path>
                      </mask>
                      <g mask="url(#mask0_68_8575)">
                        <path fill="#FF920D" d="M0 0H18V18H0z"></path>
                      </g>
                      <defs>
                        <pattern id="pattern0" width="1" height="1" patternContentUnits="objectBoundingBox">
                          <use transform="scale(.00195)" xlinkHref="#image0_68_8575"></use>
                        </pattern>
                        <image
                          id="image0_68_8575"
                          width="512"
                          height="512"
                          xlinkHref="data:image/png;base64,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7toaZ48esEVOJPnY6BEAW+KLmT4azT7xRUAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQCEBAACFBAAAFBIAAFBIAABAIQEAAIUEAAAUEgAAUEgAAEAhAQAAhQQAABQSAABQSAAAQKGzRw+ADXtqkkuSXPD4v580ds5sLxg9YBfWtPULSR5Mcl+Sjz7+b6hwYPQA2GfnJ3lZkquSHE7yLWPnsHD/keQ9SW5LcmOSo2PnALBbVyT56yQnkpx0OPZwnMh0Dj0/ACzeJUluyfgXD8d2HTcnuSgALM6BJK+Lv/gd+3ccT3J93DoFWIynxV/9js0dN2V6AymsmpJl7Z6R5O+TXD56CFXuSPLSJPePHgJ7JQBYs3OT3JrkhaOHUOl9mT5d4qODrJIvAmKtDiS5IV78GeeKJG+JP6RYqYOjB8AevS7Jq0aPoN6lSR5IcmT0ENgt5coaXZzkw0kOjR4CST6f5LlJPjJ6COyGWwCs0e/Hiz/LcU6SN4weAbvlCgBrc0Wmd2DD0lye5P2jR8BcrgCwNq8dPQBOw7nJqrgCwJqcn+RTmS65wtKcSPJN8QNCrIQrAKzJy+LFn+U6lOSa0SNgLgHAmlw9egDs4KrRA2AuAcCaXDl6AOzg8OgBMJf3ALAWT01yLM5Zlu1kph+nemj0ENiJKwCsxcXx4s/yHUhy0egRMIcAYC2eMXoAzHTB6AEwhwBgLc4bPQBmetroATCHAACAQgKAtfCmKtbif0YPgDkEAGtx3+gBMNP9owfAHN5VzVr4GCBr4GOArIYrAKzFg0nuGT0CdvCJePFnJQQAa/Le0QNgB7ePHgBzCQDW5NbRA2AHt40eAHO5n8qaPD3JvZl+dQ2W5kSSZyV5YPQQmMMVANbkWJKbRo+A03h7vPizIq4AsDbfneQDce6yPM/PdG7CKrgCwNp8MMkto0fAl7kxXvxZGX9FsUYXJbkz3gvAMhxPclmSu0cPgd04OHoA7MHnMj3p/tDoIZDktUneNXoEQIsDmd4QeNLhGHi8La6kslJOXNbs3CT/kOR7Rw+h0h1Jropv/mOlvAmQNXs4yY9keiKGTTqS5CXx4s+KCQDW7v5Mf4X5fgA25e+SXJ3ks6OHADDdznpNpjcHjr4v7NjO4+Ekr45bpwCL9Jwk78j4FwvHdh1vT/JtAWDxnpfkrXFFwLH343iSv0zyPYEt5FIW2+7rklyT5AeSvDjJhUPXsHR3Z/rZ6VszXUk6NnYO7B8BQJvzMt0meObj/37y2DkM9kimd/Lfm+SuTPf5AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvhfc34Wu/xNn3IAAAAASUVORK5CYII="></image>
                      </defs>
                    </svg>
                    Name
                  </Typography>
                  <TextField placeholder="Input goods name.." fullWidth name="name" required sx={{ maxWidth: 400 }} />
                </Box>
                <Box mt={4} sx={{ maxWidth: 400 }}>
                  <svg className={classes.svg} width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.9 16.372c-2.606-.481-4.992-2.516-5.842-4.98l-.123-.358h.808c.72 0 .814.02.864.181.128.412.96 1.573 1.471 2.05 1.168 1.093 2.336 1.587 3.907 1.654 1.948.082 3.333-.46 4.675-1.833.903-.924 1.425-1.867 1.68-3.034.223-1.03.15-2.548-.166-3.466C15.53 4.72 14.14 3.3 12.3 2.628c-.728-.266-.868-.286-2.01-.285-1.096 0-1.302.028-1.918.25-1.364.49-2.48 1.353-3.219 2.49-.424.653-.885 1.8-.981 2.441l-.052.349h2.798l.541-1.046c.666-1.287.779-1.448 1.064-1.521.54-.139.69.045 1.722 2.087.535 1.056 1.005 1.958 1.047 2.002.041.045.241-.256.444-.67.333-.676.405-.762.719-.858.196-.06.717-.093 1.19-.074.792.031.856.049 1.062.294.263.314.281.709.045 1.007-.15.19-.275.226-.922.266l-.748.047-.562 1.09c-.308.599-.636 1.174-.728 1.278-.213.24-.715.25-.941.018-.092-.093-.586-1.003-1.098-2.022-.512-1.018-.965-1.888-1.008-1.933-.043-.045-.205.18-.367.511-.16.326-.374.687-.477.802l-.188.21H1.19l-.223-.229a.739.739 0 01-.05-.993c.15-.19.275-.226.931-.266l.758-.047.062-.45c.087-.625.413-1.687.688-2.244C4.382 3.059 6.094 1.634 8.355.972 9.362.677 11.212.676 12.213.97c1.423.416 2.526 1.07 3.517 2.083a7.917 7.917 0 012.114 7.105c-.855 4.236-4.804 6.98-8.945 6.215z"
                      fill="#FF920D"
                    />
                  </svg>
                  <span>Status</span>
                  <SwitchUnstyled className={classes.tick} component={Root} defaultChecked />
                </Box>
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
                  <TextField placeholder="Input here.." fullWidth name="name" required sx={{ maxWidth: 400 }} />
                </Box>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box sx={{ minWidth: 420 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
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
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default NewGood;
