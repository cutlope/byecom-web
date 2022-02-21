import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useRouter } from 'next/router';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import RecentPaymentsTable from './RecentPaymentsTable';

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
  btn: {
    color: '#04AA53',
  },
}));

const RecentPayments = () => {
  const router = useRouter();
  const classes = useStyles();
  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        className="pt-4"
        title="Weight"
        titleProps={{
          variant: 'h1',
          component: 'div',
        }}>
        <Box clone>
          <Button onClick={() => router.push('/deliveryfleet/weight/new')} className={classes.btn}>
            <AddIcon />
            <span className="ml-2">ADD NEW WEIGHT</span>
          </Button>
        </Box>
      </CmtCardHeader>
      <CmtCardContent className={classes.cardContentRoot}>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <RecentPaymentsTable />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default RecentPayments;
