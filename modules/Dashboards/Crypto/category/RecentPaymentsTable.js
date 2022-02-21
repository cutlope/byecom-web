import React from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import useSWR from 'swr';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import axios from 'axios';

const fetcher = (url) => {
  return axios
    .get(url, {
      headers: {
        api_key: ``,
      },
    })
    .then((res) => res.data);
};

const RecentPaymentsTable = () => {
  const { data } = useSWR(['https://api.byecom.in/api/category/all'], fetcher);

  return (
    <div className="Cmt-table-responsive">
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {data?.map((category, index) => (
            <TableItem category={category} key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentPaymentsTable;
