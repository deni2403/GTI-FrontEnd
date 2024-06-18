import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import PlaceHolder from '../PlaceHolder';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../api/UserAPI';
import ReactPaginate from 'react-paginate';

function UserTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      const data = await getAllUsers(currentPage + 1);
      setUsers(data.users);
      setTotalPages(data.totalPage);
      setIsLoading(false);
    };

    fetchUsers();
  }, [currentPage]);

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {isLoading ? (
        <PlaceHolder />
      ) : (
        <Container className="table-container">
          <Table responsive striped bordered className="mt-1">
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users &&
                users.map((user, index) => (
                  <tr key={user.uuid}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="text-center">
                      <Link to={`/superadmin/users/detail/${user.uuid}`}>
                        <BsInfoCircle />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      )}
      {totalPages > 0 && (
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={totalPages}
          onPageChange={onPageChange}
          breakLinkClassName={'page-link'}
          breakClassName={'page-item'}
          containerClassName={'pagination justify-content-center'}
          pageLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          activeLinkClassName={'page-item active'}
          disabledLinkClassName={'page-item disabled'}
        />
      )}
    </>
  );
}

export default UserTable;
