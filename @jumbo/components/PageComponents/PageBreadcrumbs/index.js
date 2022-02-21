import React from 'react';
import { Breadcrumbs, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
  textSm: {
    fontSize: 12,
  },
  linkBlock: {
    display: 'block',
    color: 'inherit',
  },
}));

const PageBreadcrumbs = ({ items, ...rest }) => {
  const classes = useStyles();

  return (
    <Breadcrumbs className="bread-crumbs" aria-label="breadcrumb {...rest}">
      {items.map((item, index) =>
        item.isActive ? (
          <Typography key={index} className={classes.textSm} color="textPrimary">
            {item.label}
          </Typography>
        ) : (
          <Link key={index} href={item.link || '/'}>
            <a className={clsx(classes.textSm, classes.linkBlock)}>{item.label}</a>
          </Link>
        ),
      )}
    </Breadcrumbs>
  );
};

export default PageBreadcrumbs;
