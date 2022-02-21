import React, { cloneElement, isValidElement, useContext } from 'react';
import { List } from '@material-ui/core';
import Link from 'next/link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SidebarThemeContext from '../../CmtLayouts/SidebarThemeContext/SidebarThemeContext';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  navMenuItem: {
    padding: '0 16px 0 0',
    position: 'relative',
    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      paddingLeft: 16,
    },
  },
  navMenuLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '9px 16px 9px 32px',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    color: (props) => props.sidebarTheme.textColor,
    '&:hover, &:focus': {
      color: (props) => props.sidebarTheme.textDarkColor,
      backgroundColor: (props) => props.sidebarTheme.navHoverBgColor,
      '& .Cmt-icon-root, & .Cmt-nav-text': {
        color: (props) => props.sidebarTheme.textDarkColor,
      },
    },
    '&.active': {
      color: (props) => props.sidebarTheme.textActiveColor,
      backgroundColor: (props) => props.sidebarTheme.navActiveBgColor,
      '& .Cmt-icon-root, & .Cmt-nav-text': {
        color: (props) => props.sidebarTheme.textActiveColor,
      },
      '&:hover, &:focus': {
        '& .Cmt-nav-text, & .Cmt-icon-root': {
          color: (props) => props.sidebarTheme.textActiveColor,
        },
      },
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      justifyContent: 'center',
      padding: 0,
      height: 40,
      width: 40,
      borderRadius: '50%',
      marginLeft: 4,
      marginRight: 4,
    },
  },
  navText: {
    flex: 1,
    fontSize: 14,
    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      display: 'none',
    },
    color: 'black',
  },
  iconRoot: {
    marginRight: 16,
    fontSize: 20,
    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      marginRight: 0,
    },
  },
}));

const NavMenuItem = (props) => {
  const { name, icon, link } = props;
  const { sidebarTheme } = useContext(SidebarThemeContext);
  const classes = useStyles({ sidebarTheme });
  const router = useRouter();

  const renderIcon = () => {
    if (icon && isValidElement(icon)) {
      return cloneElement(icon, {
        className: clsx(classes.iconRoot, 'Cmt-icon-root'),
      });
    }

    return null;
  };
  const handleClick = (e) => {
    e.preventDefault();
    router.push(link);
  };
  return (
    <List component="div" className={clsx(classes.navMenuItem, 'Cmt-nav-menu-item')}>
      <a
        href={link}
        onClick={handleClick}
        className={clsx(
          classes.navMenuLink,
          {
            active: link === router.pathname || link + '/new' === router.pathname,
          },
          'Cmt-nav-menu-link',
        )}>
        {/* Display an icon if any */}
        {renderIcon()}
        <span className={clsx(classes.navText, 'Cmt-nav-text')}>{name}</span>
      </a>
    </List>
  );
};

export default NavMenuItem;
