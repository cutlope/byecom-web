import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  timelineRoot: {
    position: 'relative',
    '&.right': {
      textAlign: 'right',
    },
  },
}));
