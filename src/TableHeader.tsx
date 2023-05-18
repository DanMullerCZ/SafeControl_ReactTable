import React from 'react';
import { Params } from './types';

interface Props {
  handleSort: (param: Params) => void;
}

const tableHeader: React.FC<Props> = ({ handleSort }) => {
  return (
    <thead>
      <tr>
        <th onClick={() => handleSort("id")}>ID</th>
        <th onClick={() => handleSort("name")}>Name</th>
        <th onClick={() => handleSort("description")}>Description</th>
        <th onClick={() => handleSort("colorIdent")}>ColorIdent</th>
      </tr>
    </thead>
  );
};

export default tableHeader;