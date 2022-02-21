import React, { useState , useEffect} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Button, Link } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';

import TemplateTable from './TemplateTable';
import { crypto } from '../../../../@fake-db';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../authentication';
import { NotificationLoader } from '../../../../@jumbo/components/ContentLoader';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  cardContentRoot: {
    padding: '0 !important',
  },
  titleRoot: {
    letterSpacing: 0.15,
  },
  scrollbarRoot: {
    height: 347,
  },
}));

const OrderHistory = () => {
  const [tableData, setTableData] = useState(crypto.orders);
  const classes = useStyles();
  const router = useRouter();
  const { isLoading, error, message, Listtemplate } = useAuth();
  useEffect(()=>{
    Listtemplate()
  },[])
  
  const handleClick = (e) => {
    e.preventDefault()
    router.push('/admin/add-template')
  }

  return (
    <CmtCard>
      <CmtCardHeader
        className="pt-4"
        title="Customers"
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}>
        <Box clone>
          <Button color="primary">
            <AddIcon />
            <span className="ml-2" onClick={handleClick}>Add New</span>
          </Button>
        </Box>
      </CmtCardHeader>
      <CmtCardContent className={classes.cardContentRoot}>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <TemplateTable tableData={tableData} />
        </PerfectScrollbar>
      </CmtCardContent>
      <NotificationLoader loading={isLoading} error={error} />
        <NotificationLoader loading={isLoading} message={message} />
    </CmtCard>
  );
};

export default OrderHistory;
