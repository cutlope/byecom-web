import React from 'react';

import { Grid, Box } from '@material-ui/core';

import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';



const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Templates',  isActive: true },
];

const CryptoDashboard = () => {
 
  return (
   
    <PageContainer heading=" Templates" breadcrumbs={breadcrumbs}>
    </PageContainer>
  );
};

export default CryptoDashboard;
