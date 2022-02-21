import React from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import useSWR from 'swr';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import axios from 'axios';
import { useEffect } from 'react';

let token;

if (typeof window !== 'undefined') {
  // Perform localStorage action
  token = localStorage.getItem('token');
}

const fetcher = (url) => {
  return axios
    .get(url, {
      headers: {
        api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const RecentPaymentsTable = () => {
  const { data } = useSWR(['http://api.byecom.in/api/delivery-fleet'], fetcher);

  return (
    <div className="Cmt-table-responsive">
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {data?.map((fleet, index) => (
            <TableItem fleet={fleet} key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentPaymentsTable;
