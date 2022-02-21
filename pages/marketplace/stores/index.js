import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Stores = dynamic(() => import('../../../modules/Dashboards/Crypto/stores'), {
  loading: () => <PageLoader />,
});

const StoresMarketplace = () => (
  <SecurePage>
    <Stores />
  </SecurePage>
);

export default StoresMarketplace;
