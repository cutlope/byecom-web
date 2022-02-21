import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Message = dynamic(() => import('../../modules/admin/templates'), {
  loading: () => <PageLoader />,
});

const CryptoDashboard = () => (
  <SecurePage>
    <Message/>
  </SecurePage>
);

export default CryptoDashboard;
