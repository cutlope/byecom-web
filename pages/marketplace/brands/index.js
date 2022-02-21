import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Brands = dynamic(() => import('../../../modules/Dashboards/Crypto/brands'), {
  loading: () => <PageLoader />,
});

const BrandsDashboard = () => (
  <SecurePage>
    <Brands />
  </SecurePage>
);

export default BrandsDashboard;
