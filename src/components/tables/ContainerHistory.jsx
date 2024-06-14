import React from 'react';
import { Container, Table } from 'react-bootstrap';
import TableTitle from './TableTitle';
import { showFormattedDate } from '../../utils/Utility';
import PropTypes from 'prop-types';

const ContainerHistory = ({ containerHistory }) => {
  return (
    <Container fluid className="contDetail-page__table">
      <TableTitle>Shipments History</TableTitle>
      <hr />
      {containerHistory.length !== 0 ? (
        <Table responsive className="mt-3 border">
          <thead className="table-primary">
            <tr>
              <th>Date</th>
              <th>Book Number</th>
              <th>Booked By</th>
            </tr>
          </thead>
          <tbody>
            {containerHistory &&
              containerHistory.map((history) => (
                <tr key={history.id}>
                  <td>{showFormattedDate(history.ETD)}</td>
                  <td>{history.shipment_number}</td>
                  <td>{history.shipper}</td>
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

ContainerHistory.propTypes = {
  containerHistory: PropTypes.array,
};

export default ContainerHistory;
