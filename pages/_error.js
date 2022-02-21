import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';

const Custom500 = dynamic(() => import('../modules/ExtraPages/500'), {
  loading: () => <PageLoader />,
});

const Custom500Page = () => <Custom500 />;

export default Custom500Page;
