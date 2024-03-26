import React from 'react';
import { Container, Pagination } from 'react-bootstrap';

function Pagenumber() {
  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item active>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}

export default Pagenumber;
