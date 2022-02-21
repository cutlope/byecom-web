import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';

const Custom404 = dynamic(() => import('../modules/ExtraPages/404'), {
  loading: () => <PageLoader />,
});

const Custom404Page = () => <Custom404 />;

export default Custom404Page;
