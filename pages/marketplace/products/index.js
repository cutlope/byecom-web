import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Products = dynamic(() => import('../../../modules/Dashboards/Crypto/products'), {
  loading: () => <PageLoader />,
});

const ProductsMarketplace = () => (
  <SecurePage>
    <Products />
  </SecurePage>
);

export default ProductsMarketplace;
