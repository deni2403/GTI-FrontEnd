import React from 'react';
import { Table, Container } from 'react-bootstrap';
import { showFormattedDate } from '../../utils/Utility';
import PropTypes from 'prop-types';

function ActivityTable({ logs }) {
  return (
    <Container className="table-container">
      {logs.length !== 0 ? (
        <Table responsive className="border mt-2">
          <thead className="table-primary">
            <tr>
              <th>Date</th>
              <th className="w-50">User</th>
              <th className="text-start">Detail Activity</th>
            </tr>
          </thead>
          <tbody>
            {logs &&
              logs.map((logs) => (
                <tr key={logs.id}>
                  <td>{showFormattedDate(logs.createdAt)}</td>
                  <td>{logs.user.name}</td>
                  <td className="text-start">{logs.activity_info}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <h3 className="">No Logs found</h3>
        </div>
      )}
    </Container>
  );
}

ActivityTable.propTypes = {
  logs: PropTypes.array,
};

export default ActivityTable;
