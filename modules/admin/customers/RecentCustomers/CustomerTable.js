import React from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import TableHeading from './TableHeading';
import TableItem from './TableItem';
import { useSelector } from 'react-redux';

const CustomerTable = () => {
  const customer=useSelector(states=>states.Customer.customer)
  return (
    <div className="Cmt-table-responsive">
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {customer.map((row) => (
            <TableItem row={row} key={row._id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
