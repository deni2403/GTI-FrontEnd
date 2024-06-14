import React from 'react';
import { Table, Container } from 'react-bootstrap';
import { showFormattedDate } from '../../utils/Utility';
import PropTypes from 'prop-types';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function RepairData({ repairments }) {
  return (
    <Container className="table-container">
      {repairments.length !== 0 ? (
        <Table striped responsive className="border mt-1">
          <thead>
            <tr>
              <th>Date</th>
              <th>Unit Num</th>
              <th>Type</th>
              <th>Location</th>
              <th>Age (Years)</th>
              <th>Remarks</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {repairments &&
              repairments.map((repairment) => (
                <tr key={repairment.uuid}>
                  <td>{showFormattedDate(repairment.createdAt)}</td>
                  <td>{repairment.number}</td>
                  <td>{repairment.type}</td>
                  <td>{repairment.location}</td>
                  <td>{repairment.age}</td>
                  <td>{repairment.remarks}</td>
                  <td>
                    <Link to={`/repairments/detail/${repairment.uuid}`}>
                      <BsInfoCircle />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <h3 className="">No repairments found</h3>
        </div>
      )}
    </Container>
  );
}

RepairData.propTypes = {
  repairments: PropTypes.array,
};
export default RepairData;
