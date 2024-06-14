import React from 'react';
import { Table, Container } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ContainerData({ containers }) {
  return (
    <Container className="table-container">
      {containers.length === 0 ? (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <h3 className="">No containers found</h3>
        </div>
      ) : (
        <Table striped responsive className="border mt-1">
          <thead>
            <tr>
              <th>Unit Num</th>
              <th>Type</th>
              <th>Status</th>
              <th>Location</th>
              <th>Iddle Days</th>
              <th>Age (Years)</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {containers &&
              containers.map((container) => (
                <tr key={container.uuid}>
                  <td>{container.number}</td>
                  <td>{container.type}</td>
                  <td>{container.status}</td>
                  <td>{container.location}</td>
                  <td>{container.iddle_days}</td>
                  <td>{container.age}</td>
                  <td>
                    <Link
                      to={`/containers/${container.status.toLowerCase()}/detail/${
                        container.uuid
                      }`}
                    >
                      <BsInfoCircle />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

ContainerData.propTypes = {
  containers: PropTypes.array,
};

export default ContainerData;
