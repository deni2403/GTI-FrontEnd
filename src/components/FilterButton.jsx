import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import PropTypes from 'prop-types';

function FilterButton({ children }) {
  return (
    <Form className="d-flex my-1 data-filter">
      <Form.Select className="me-2">
        {children}
      </Form.Select>
      <Button>
        <FaFilter />
      </Button>
    </Form>
  );
}

FilterButton.propTypes = {
  children: PropTypes.object,
};

export default FilterButton;
