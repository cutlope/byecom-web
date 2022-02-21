import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Customers = dynamic(() => import('../../modules/admin/customers'), {
  loading: () => <PageLoader />,
});

const CryptoDashboard = () => (
  <SecurePage>
    <Customers/>
  </SecurePage>
);

export default CryptoDashboard;
