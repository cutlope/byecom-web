import React from 'react';
import { Grid, Box } from '@material-ui/core';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import RecentCustomers from './RecentCustomers';

const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Customers', isActive: true },
    { label: 'Add Customers', link: '/admin/add-customer' },
    
];

const CustomersDashboard = () => {
  return (
    <PageContainer heading="Customers" breadcrumbs={breadcrumbs}>
       <Grid item xs={12} xl={5}>
          <RecentCustomers />
        </Grid>
    </PageContainer>
  );
};

export default CustomersDashboard;
