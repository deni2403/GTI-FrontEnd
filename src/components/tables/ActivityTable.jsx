import React from 'react';
import { Table } from 'react-bootstrap';

function ActivityTable() {
  return (
    <Table responsive className="border mt-2">
      <thead className="table-primary">
        <tr>
          <th>Date</th>
          <th>User</th>
          <th>Detail Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>31/03/2024</td>
          <td>User 1</td>
          <td>Activity</td>
        </tr>
        <tr>
          <td>31/03/2024</td>
          <td>User 2</td>
          <td>Activity</td>
        </tr>
        <tr>
          <td>31/03/2024</td>
          <td>User 3</td>
          <td>Activity</td>
        </tr>
        <tr>
          <td>31/03/2024</td>
          <td>User 4</td>
          <td>Activity</td>
        </tr>
        <tr>
          <td>31/03/2024</td>
          <td>User 5</td>
          <td>Activity</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ActivityTable;
