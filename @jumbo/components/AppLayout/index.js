import React, { useContext } from 'react';
import AppContext from '../contextProvider/AppContextProvider/AppContext';
import globalStyles from '../../../theme/GlobalCss';
import '../../../services/api/index';
import { Box } from '@material-ui/core';
import VerticalDefault from './VerticalLayouts/VerticalDefault';
import { LAYOUT_TYPES } from '../../constants/ThemeOptions';
import VerticalMinimal from './VerticalLayouts/VerticalMinimal';
import MinimalNoHeader from './VerticalLayouts/MinimalNoHeader';
import ModernSideBar from './VerticalLayouts/ModernSidebar';
import HorizontalDefault from './HorizontalLayouts/HorizontalDefault';
import HorizontalDark from './HorizontalLayouts/HorizontalDark';
import HorizontalMinimal from './HorizontalLayouts/HorizontalMinimal';
import HorizontalTopMenu from './HorizontalLayouts/HorizontalTopMenu';
import PageLoader from '../PageComponents/PageLoader';
import { useRouter } from 'next/router';
import { useAuth } from '../../../authentication';

const AppLayout = ({ children }) => {
  const { layout } = useContext(AppContext);
  const { authUser, isLoadingUser } = useAuth();
  const router = useRouter();
  globalStyles();

  if (isLoadingUser) {
    return <PageLoader />;
  }

  if (
    !authUser &&
    (router.pathname === '/signin' || router.pathname === '/signup' || router.pathname === '/forgot-password')
  ) {
    return (
      <Box display="flex" width={1} style={{ minHeight: '100vh' }}>
        {children}
      </Box>
    );
  }

  if (true) {
    switch (layout) {
      case LAYOUT_TYPES.VERTICAL_DEFAULT: {
        return <VerticalDefault children={children} />;
      }
      case LAYOUT_TYPES.VERTICAL_MINIMAL: {
        return <VerticalMinimal children={children} />;
      }
      case LAYOUT_TYPES.VERTICAL_MINIMAL_NO_HEADER: {
        return <MinimalNoHeader children={children} />;
      }
      case LAYOUT_TYPES.VERTICAL_MODERN_SIDEBAR: {
        return <ModernSideBar children={children} />;
      }
      case LAYOUT_TYPES.HORIZONTAL_DEFAULT: {
        return <HorizontalDefault children={children} />;
      }
      case LAYOUT_TYPES.HORIZONTAL_DARK: {
        return <HorizontalDark children={children} />;
      }
      case LAYOUT_TYPES.HORIZONTAL_MINIMAL: {
        return <HorizontalMinimal children={children} />;
      }
      case LAYOUT_TYPES.HORIZONTAL_TOP_MENU: {
        return <HorizontalTopMenu children={children} />;
      }
      default:
        return <VerticalDefault />;
    }
  }

  return (
    <Box display="flex" width={1} style={{ minHeight: '100vh' }}>
      {children}
    </Box>
  );
};

export default AppLayout;
