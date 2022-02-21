import React from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import useSWR from 'swr';
import { crypto } from '../../../../@fake-db';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import axios from 'axios';

const fetcher = (url) => {
  return axios
    .get(url, {
      headers: {
        api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    })
    .then((res) => res.data);
};

const RecentPaymentsTable = () => {
  const { data } = useSWR(['http://api.byecom.in/api/packages/get-all-packages'], fetcher);

  return (
    <div className="Cmt-table-responsive">
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {data?.map((pack, index) => (
            <TableItem pack={pack} key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentPaymentsTable;
