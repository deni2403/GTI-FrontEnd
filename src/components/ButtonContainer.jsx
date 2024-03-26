import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ButtonContainer({ children }) {
  return (
    <Container fluid className="d-flex my-2 justify-content-between flex-wrap">
      {children}
    </Container>
  );
}

ButtonContainer.propTypes = {
  children: PropTypes.object,
};

export default ButtonContainer;
