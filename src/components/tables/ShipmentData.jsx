import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getAllShipments } from '../../api/shipmentAPI';
import { showFormattedDate } from '../../utils/Utility';
import ReactPaginate from 'react-paginate';

function ShipmentData() {
  const [shipments, setShipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchShipments = async () => {
      const data = await getAllShipments(currentPage + 1);
      setShipments(data.shipment);
      setTotalPages(data.totalPage);
    };

    fetchShipments();
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
                <td>{shipment.shipment_detail.shipper}</td>
                <td>{shipment.number}</td>
                <td>{shipment.shipment_detail.POL}</td>
                <td>{shipment.shipment_detail.POD}</td>
                <td>{shipment.remark_description}</td>
                <td>
                  <Link to={`/shipments/detail/${shipment.uuid}`}>
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

export default ShipmentData;
