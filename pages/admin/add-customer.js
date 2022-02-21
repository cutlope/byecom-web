import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const AddCustomer = dynamic(() => import('../../modules/admin/customers/AddCustomer'), {
  loading: () => <PageLoader />,
});

const AddCustomerPage = () => (
  <SecurePage>
    <AddCustomer/>
  </SecurePage>
);

export default AddCustomerPage;
