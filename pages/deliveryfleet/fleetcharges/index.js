import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const FleetCharges = dynamic(() => import('../../../modules/Dashboards/Crypto/fleetcharges'), {
  loading: () => <PageLoader />,
});

const DeliveryFleetDashboard = () => (
  <SecurePage>
    <FleetCharges />
  </SecurePage>
);

export default DeliveryFleetDashboard;
