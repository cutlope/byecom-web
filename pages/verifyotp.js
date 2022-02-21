import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import AuthPage from '../authentication/auth-page-wrappers/AuthPage';

const VerifyOTP = dynamic(() => import('../@jumbo/components/Common/authComponents/VerifyOTP'), {
  loading: () => <PageLoader />,
});

const VerifyOTPPage = () => (
  <AuthPage>
    <VerifyOTP variant="standard" wrapperVariant="bgColor" />
  </AuthPage>
);

export default VerifyOTPPage;
