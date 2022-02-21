import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const Crypto = dynamic(() => import('../modules/Dashboards/Crypto'), {
  loading: () => <PageLoader />,
});

const CryptoDashboard = () => (
  <SecurePage>
    <Crypto />
  </SecurePage>
);

export default CryptoDashboard;
