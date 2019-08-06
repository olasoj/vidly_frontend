import React from 'react';

//import common comonent
import TableHeader from './TableHeader';
import Tablebody from './Tablebody';

const Table = ({ columns, onSort, sortColumn, data }) => {
  return (
    <table className='table'>
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <Tablebody data={data} columns={columns} />
    </table>
  );
};

export default Table;
