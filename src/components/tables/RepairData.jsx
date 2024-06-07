import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getAllRepairments } from '../../api/repairmentAPI';
import { showFormattedDate } from '../../utils/Utility';
import ReactPaginate from 'react-paginate';

function RepairData() {
  const [repairments, setRepairments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchRepairments = async () => {
      const data = await getAllRepairments(currentPage + 1);
      setRepairments(data.repairs);
      setTotalPages(data.totalPage);
    };

    fetchRepairments();
  }, [currentPage]);

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Container className="table-container">
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
                  <td>{repairment.container.number}</td>
                  <td>{repairment.container.type}</td>
                  <td>{repairment.container.location}</td>
                  <td>{repairment.container.age}</td>
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

export default RepairData;
