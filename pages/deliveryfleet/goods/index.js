import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Goods = dynamic(() => import('../../../modules/Dashboards/Crypto/goods'), {
  loading: () => <PageLoader />,
});

const GoodsDashboard = () => (
  <SecurePage>
    <Goods />
  </SecurePage>
);

export default GoodsDashboard;
