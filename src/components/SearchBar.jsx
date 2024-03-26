import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';

function SearchBar() {
  return (
    <Form className="d-flex my-1 search-bar">
      <Form.Control type="search" placeholder="search.." className="me-2" />
      <Button className="d-flex align-items-center">
        <FaMagnifyingGlass />
      </Button>
    </Form>
  );
}

export default SearchBar;
