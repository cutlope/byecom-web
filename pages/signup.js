import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import AuthPage from '../authentication/auth-page-wrappers/AuthPage';

const SignUp = dynamic(() => import('../@jumbo/components/Common/authComponents/SignUp'), {
  loading: () => <PageLoader />,
});

const SignUpPage = () => (
  <AuthPage>
    <SignUp variant="standard" wrapperVariant="bgColor" />
  </AuthPage>
);

export default SignUpPage;
