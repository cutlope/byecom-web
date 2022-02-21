import React from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtVertical from '../../../../../@coremat/CmtNavigation/Vertical';
import SidebarButtons from './SIdebarButtons';
import sidebarMenus from '../menus';
import { useSelector } from 'react-redux';
// import { sidebarNav } from '../usermenus';

const useStyles = makeStyles(() => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 167px)',
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 72px)',
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)',
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 167px)',
    },
  },
}));

const SideBar = () => {
  const role = useSelector((states) => states.common.userauth);
  const classes = useStyles();
  const sidemenu = sidebarMenus();

  return (
    <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
      <CmtVertical menuItems={sidemenu.sidebarNavs} />
      <SidebarButtons />
    </PerfectScrollbar>
  );
};

export default SideBar;
