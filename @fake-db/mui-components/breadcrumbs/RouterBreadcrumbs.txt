/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { MemoryRouter, Route } from 'react-router';
import { Box, Link } from '@material-ui/core';

const breadcrumbNameMap = {
  '/inbox': 'Inbox',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};

function ListItemLink(props) {
  const { href, open, ...other } = props;
  const primary = breadcrumbNameMap[href];

  return (
    <li>
      <Link href={href}>
        <ListItem button {...other}>
          <ListItemText primary={primary} />
          {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>
      </Link>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  href: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(8),
  },
}));

export default function RouterBreadcrumbs() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
      <Box className={classes.root}>
        <Route>
          {({ location }) => {
            const pathnames = location.pathname.split('/').filter((x) => x);

            return (
              <Breadcrumbs aria-label="breadcrumb">
                <Link href="/">Home</Link>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                  return last ? (
                    <Typography color="textPrimary" key={to}>
                      {breadcrumbNameMap[to]}
                    </Typography>
                  ) : (
                    <Link href={to}>{breadcrumbNameMap[to]}</Link>
                  );
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
        <nav className={classes.lists} aria-label="mailbox folders">
          <List>
            <ListItemLink href="/inbox" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink href="/inbox/important" className={classes.nested} />
              </List>
            </Collapse>
            <ListItemLink href="/trash" />
            <ListItemLink href="/spam" />
          </List>
        </nav>
      </Box>
    </MemoryRouter>
  );
}
