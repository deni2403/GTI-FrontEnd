import React from 'react';
import { Table } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function ContainerData() {
  return (
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
        <tr>
          <td>GTNU8880042</td>
          <td>20 feet</td>
          <td>Ready</td>
          <td>Medan</td>
          <td>60</td>
          <td>3</td>
          <td>
            <Link to="/containers/ready/detail">
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
        <tr>
          <td>GESU9282682</td>
          <td>20 feet</td>
          <td>In Use</td>
          <td>Medan</td>
          <td>0</td>
          <td>2</td>
          <td>
            <Link to="/containers/in-use/detail">
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Data 3</td>
          <td>Data 3</td>
          <td>Data 3</td>
          <td>Data 3</td>
          <td>Data 3</td>
          <td>
            <Link>
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>Data 4</td>
          <td>Data 4</td>
          <td>Data 4</td>
          <td>Data 4</td>
          <td>Data 4</td>
          <td>
            <Link>
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>Data 5</td>
          <td>Data 5</td>
          <td>Data 5</td>
          <td>Data 5</td>
          <td>Data 5</td>
          <td>
            <Link>
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ContainerData;
