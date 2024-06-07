import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getAllContainers } from '../../api/containerAPI';
import ReactPaginate from 'react-paginate';

function ContainerData() {
  const [containers, setContainers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchContainers = async () => {
      const data = await getAllContainers(currentPage + 1);
      setContainers(data.containers);
      setTotalPages(data.totalPage);
    };

    fetchContainers();
  }, [currentPage]);

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Container className="table-container">
        {containers.length === 0 && <h2>No containers found</h2>}
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
      </Container>
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
    </>
  );
}

export default ContainerData;
