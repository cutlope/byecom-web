import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Category = dynamic(() => import('../../../modules/Dashboards/Crypto/category'), {
  loading: () => <PageLoader />,
});

const CategoryDashboard = () => (
  <SecurePage>
    <Category />
  </SecurePage>
);

export default CategoryDashboard;
