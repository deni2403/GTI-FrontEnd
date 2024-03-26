import React from 'react';
import { Table } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function UserTable() {
  return (
    <Table responsive striped bordered className="mt-1">
      <thead className="text-center">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody className="text-center">
        <tr>
          <td>1</td>
          <td>Vinnie Felim</td>
          <td>vinnie@gmail.com</td>
          <td className="text-center">
            <Link to="/superadmin/users/detail">
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Deni</td>
          <td>deni24@gmail.com</td>
          <td className="text-center">
            <Link to="/superadmin/users/detail">
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Data 3</td>
          <td>Data 3</td>
          <td className="text-center">
            <Link to="/superadmin/users/detail">
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>Data 4</td>
          <td>Data 4</td>
          <td className="text-center">
            <Link to="/superadmin/users/detail">
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>Data 5</td>
          <td>Data 5</td>
          <td className="text-center">
            <Link to="/superadmin/users/detail">
              <BsInfoCircle />
            </Link>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default UserTable;
