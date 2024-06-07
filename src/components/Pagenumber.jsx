import React from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Pagenumber({ currentPage, totalPages, onPageChange }) {
  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPages);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }

    return null;
  };

  const handlePageClick = (page) => {
    onPageChange(page);
    console.log('page', page);
  };

  // const pages = [];
  // for (let page = 1; page <= totalPages; page += 1) {
  //   pages.push(
  //     <Pagination.Item
  //       key={page}
  //       active={page === currentPage}
  //       onClick={handlePageClick(page)}
  //     >
  //       {page}
  //     </Pagination.Item>,
  //   );
  // }

  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.First onClick={handleFirstPage} />
      <Pagination.Prev onClick={handlePrevPage} />
      <Pagination.Item>{currentPage}</Pagination.Item>
      <Pagination.Item>{currentPage + 1}</Pagination.Item>
      <Pagination.Item>{currentPage + 2}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item>{totalPages}</Pagination.Item>
      <Pagination.Next onClick={handleNextPage} />
      <Pagination.Last onClick={handleLastPage} />
    </Pagination>
  );
}

Pagenumber.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagenumber;
