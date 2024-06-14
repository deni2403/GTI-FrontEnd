import React from 'react';
import { Container, Table } from 'react-bootstrap';
import TableTitle from './TableTitle';
import { showFormattedDate } from '../../utils/Utility';
import PropTypes from 'prop-types';

const RepairHistory = ({ repairHistory }) => {
  return (
    <Container fluid className="contDetail-page__table">
      <TableTitle>Repairments History</TableTitle>
      <hr />
      {repairHistory.length !== 0 ? (
        <Table responsive className="mt-3 border">
          <thead className="table-primary">
            <tr>
              <th>Date</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {repairHistory &&
              repairHistory.map((history) => (
                <tr key={history.id}>
                  <td>{showFormattedDate(history.createdAt)}</td>
                  <td>{history.remarks}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <h4 className="">No history found.</h4>
        </div>
      )}
    </Container>
  );
};

RepairHistory.propTypes = {
  repairHistory: PropTypes.array,
};

export default RepairHistory;
