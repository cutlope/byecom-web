import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Weight = dynamic(() => import('../../../modules/Dashboards/Crypto/weight'), {
  loading: () => <PageLoader />,
});

const WeightsDashboard = () => (
  <SecurePage>
    <Weight />
  </SecurePage>
);

export default WeightsDashboard;
