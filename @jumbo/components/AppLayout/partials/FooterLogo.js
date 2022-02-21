import React from 'react';
import { Box } from '@material-ui/core';
import Link from 'next/link';
import CmtImage from '../../../../@coremat/CmtImage';

const FooterLogo = ({ color, ...props }) => {
  const logoUrl = color === 'white' ? '/images/logo-symbol.png' : '/images/logo-symbol.png';

  return (
    <Box className="pointer" {...props}>
      <Link href="/">
        <a>
          <CmtImage src={logoUrl} alt="logo" />
        </a>
      </Link>
    </Box>
  );
};

export default FooterLogo;
