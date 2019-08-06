import React, { Fragment } from 'react';
import _ from 'lodash';

const Tablebody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  return (
    <Fragment>
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <Fragment key={column.id}>
                <td> {renderCell(item, column)}</td>
              </Fragment>
            ))}
            <td> </td>
            <td />
          </tr>
        ))}
      </tbody>
    </Fragment>
  );
};

export default Tablebody;
