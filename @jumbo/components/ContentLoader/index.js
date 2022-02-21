import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { fetchError, fetchSuccess } from '../../../redux/actions';
import PageLoader from '../PageComponents/PageLoader';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

// eslint-disable-next-line react/prop-types
export const NotificationLoader = ({ loading, error, message }) => {
  const setshow=useSelector(states=>states.common.setshow)
  return (
    <React.Fragment>
      {loading && <PageLoader />}
      {
        <Snackbar
          open={Boolean(error)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Snackbar>
      }
      {
         setshow?(
        <Snackbar
          open={Boolean(message)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        </Snackbar>
        ):null
      }
    </React.Fragment>
  );
};

const ContentLoader = () => {
  const { error, loading, message } = useSelector(({ common }) => common);
  const dispatch = useDispatch();
  const setshow=useSelector(states=>states.common.setshow)

  useEffect(() => {
    if (error || message) {
        dispatch(fetchError(''));
        dispatch(fetchSuccess(''));
    }
  }, [dispatch, error, message]);

  return (
    <React.Fragment>
      {loading && <PageLoader />}
      {
        <Snackbar
          open={Boolean(error)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Snackbar>
      }
      {
        setshow?(
        <Snackbar
          open={Boolean(message)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        </Snackbar>
        ):null
      }
    </React.Fragment>
  );
};

export default ContentLoader;
