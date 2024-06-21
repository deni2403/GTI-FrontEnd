import React from 'react';
import { Table, Container } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../../utils/Utility';
import PropTypes from 'prop-types';

function ShipmentData({ shipments }) {
  return (
    <Container className="table-container">
      {shipments.length !== 0 ? (
        <Table striped responsive className="border mt-1">
          <thead>
            <tr>
              <th>Date</th>
              <th>Shipper</th>
              <th>Book Number</th>
              <th>POL</th>
              <th>POD</th>
              <th>Remark</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {shipments &&
              shipments.map((shipment) => (
                <tr key={shipment.uuid}>
                  <td>{showFormattedDate(shipment.createdAt)}</td>
                  <td>{shipment.shipper}</td>
                  <td>{shipment.number}</td>
                  <td>{shipment.POL}</td>
                  <td>{shipment.POD}</td>
                  <td className="remark text-lowercase">
                    {shipment.remark_description}
                  </td>
                  <td>
                    <Link to={`/shipments/detail/${shipment.uuid}`}>
                      <BsInfoCircle />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <h3 className="">No Shipments found</h3>
        </div>
      )}
    </Container>
  );
}

ShipmentData.propTypes = {
  shipments: PropTypes.array,
};

export default ShipmentData;
