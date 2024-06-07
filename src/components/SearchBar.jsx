import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import PropType from 'prop-types';

function SearchBar({ placeholder }) {
  return (
    <Form className="d-flex my-1 search-bar">
      <Form.Control
        type="search"
        placeholder={placeholder || 'search..'}
        className="me-2"
      />
      <Button className="d-flex align-items-center">
        <FaMagnifyingGlass />
      </Button>
    </Form>
  );
}

SearchBar.propTypes = {
  placeholder: PropType.string,
};

export default SearchBar;
