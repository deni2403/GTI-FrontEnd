import React from 'react';
import { Table } from 'react-bootstrap';

function ActivityTable() {
  return (
    <Table responsive className="border">
      <thead className="table-primary">
        <tr>
          <th>Date</th>
          <th>User</th>
          <th>Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>User 1</td>
          <td>Activity</td>
        </tr>
        <tr>
          <td>2</td>
          <td>User 2</td>
          <td>Activity</td>
        </tr>
        <tr>
          <td>3</td>
          <td>User 3</td>
          <td>Activity</td>
        </tr>
        <tr>
          <td>4</td>
          <td>User 4</td>
          <td>Activity</td>
        </tr>
        <tr>
          <td>5</td>
          <td>User 5</td>
          <td>Activity</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ActivityTable;
