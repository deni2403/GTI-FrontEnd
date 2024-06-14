import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import PropType from 'prop-types';

function SearchBar({ keyword, keywordHandler, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit} className="d-flex my-1 search-bar">
      <Form.Control
        type="text"
        placeholder="search..."
        className="me-2"
        value={keyword || ''}
        onChange={(e) => keywordHandler(e.target.value)}
      />
      <Button type="submit" className="d-flex align-items-center">
        <FaMagnifyingGlass />
      </Button>
    </Form>
  );
}

SearchBar.propTypes = {
  keyword: PropType.string,
  keywordHandler: PropType.func.isRequired,
  handleSubmit: PropType.func.isRequired,
};

export default SearchBar;
