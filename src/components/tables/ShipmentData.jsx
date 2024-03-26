import React from 'react';
import { Table } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function ShipmentData() {
  return (
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
        <tr>
          <td>27/01/2024</td>
          <td>PUTRA SEJATI</td>
          <td>20240127001</td>
          <td>SUB</td>
          <td>MKS</td>
          <td>Remark</td>
          <td>
            <Link to="/shipments/detail">
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Data 2</td>
          <td>Data 2</td>
          <td>Data 2</td>
          <td>Data 2</td>
          <td>Data 2</td>
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

export default ShipmentData;
