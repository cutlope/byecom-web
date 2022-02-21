import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Package = dynamic(() => import('../../../modules/Dashboards/Crypto/package'), {
  loading: () => <PageLoader />,
});

const PackageDashboard = () => (
  <SecurePage>
    <Package />
  </SecurePage>
);

export default PackageDashboard;
