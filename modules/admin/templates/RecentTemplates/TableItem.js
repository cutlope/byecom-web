import React from 'react';
import clsx from 'clsx';

import { TableCell, TableRow } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchselectCustomer } from '../../../../redux/actions/Customer';
import { useAuth } from '../../../../authentication';
import { fetchselectTemplate } from '../../../../redux/actions/Template';

const useStyles = makeStyles((theme) => ({
  tableRowRoot: {
    position: 'relative',
    transition: 'all .2s',
    borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${alpha(theme.palette.common.dark, 0.2)}`,
      borderTopColor: 'transparent',
      '& $tableCellRoot': {
        color: theme.palette.text.primary,
        '&:last-child': {
          color: theme.palette.error.main,
        },
        '&.success': {
          color: theme.palette.success.main,
        },
      },
    },
    '&:last-child': {
      borderBottom: `solid 1px ${theme.palette.borderColor.main}`,
    },
  },
  tableCellRoot: {
    padding: 16,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.text.secondary,
    borderBottom: '0 none',
    position: 'relative',
    '&:first-child': {
      paddingLeft: 24,
    },
    '&:last-child': {
      textAlign: 'right',
      color: theme.palette.error.main,
      paddingRight: 24,
    },
    '&.success': {
      color: theme.palette.success.main,
    },
  },
  textOrange:{
    color:'#ff9400',
    cursor:'pointer'
  },
}));

const TableItem = ({ row }) => {
  const classes = useStyles();
  const router=useRouter()
  const dispatch=useDispatch();
  const { isLoading, error, message, Selecttemplate } = useAuth();

  const handleClick = (event) => {
    dispatch(fetchselectTemplate(event))
    Selecttemplate(event._id)
    router.push(`/admin/edit-template/${event._id}`)
  }

  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell className={classes.tableCellRoot}>{row.name}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row.content}</TableCell>
      {row.activeStatus==true?
       (<TableCell className={clsx(classes.tableCellRoot, 'success')}>true</TableCell>)
       :(<TableCell className={clsx(classes.tableCellRoot, 'success')}>false</TableCell>)
      }
      <TableCell  className={classes.textOrange} onClick={()=>handleClick(row)}><EditIcon/></TableCell>
    </TableRow>
  );
};

export default TableItem;
