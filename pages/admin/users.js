import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const User = dynamic(() => import('../../modules/admin/users'), {
  loading: () => <PageLoader />,
});

const UserDashboard = () => (
  <SecurePage>
    <User/>
  </SecurePage>
);

export default UserDashboard;
