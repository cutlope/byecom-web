import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const AddTemplate = dynamic(() => import('../../modules/admin/templates/AddTemplate'), {
  loading: () => <PageLoader />,
});

const AddTemplatePage = () => (
  <SecurePage>
    <AddTemplate/>
  </SecurePage>
);

export default AddTemplatePage;
