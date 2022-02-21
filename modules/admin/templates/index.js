import React from 'react';
import { Grid, Box } from '@material-ui/core';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import RecentTemplates from './RecentTemplates';

const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Templates', isActive: true },
    { label: 'Add Templates', link: '/admin/add-template' },
    
];

const CustomersDashboard = () => {
  return (
    <PageContainer heading="Templates" breadcrumbs={breadcrumbs}>
       <Grid item xs={12} xl={5}>
          <RecentTemplates />
        </Grid>
    </PageContainer>
  );
};

export default CustomersDashboard;
