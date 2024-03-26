import React from 'react';
import { Table } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function RepairData() {
  return (
    <Table striped responsive className="border">
      <thead>
        <tr>
          <th>Unit Num</th>
          <th>Type</th>
          <th>Location</th>
          <th>Age (Years)</th>
          <th>Remarks</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>GNU9282682</td>
          <td>20 feet</td>
          <td>8 years</td>
          <td>Medan</td>
          <td>Perbaikan Pintu Kontainer</td>
          <td>
            <Link to='/repairments/detail'>
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
        <tr>
          <td>GTNU8880042</td>
          <td>20 feet</td>
          <td>8 years</td>
          <td>Medan</td>
          <td>Perbaikan Kipas Pendingin</td>
          <td>
            <Link>
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

export default RepairData;
