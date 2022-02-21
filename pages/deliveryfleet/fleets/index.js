import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Fleets = dynamic(() => import('../../../modules/Dashboards/Crypto/fleets'), {
  loading: () => <PageLoader />,
});

const FleetsDashboard = () => (
  <SecurePage>
    <Fleets />
  </SecurePage>
);

export default FleetsDashboard;
