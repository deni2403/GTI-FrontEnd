import React from 'react';
import { Container } from 'react-bootstrap';
import PropType from 'prop-types';

function ContainerStatus({ icon, text, value }) {
  return (
    <Container className="container-status__item d-flex align-items-center shadow-sm">
      <Container className="container-status__item-image d-flex justify-content-center align-items-center rounded-circle">
        {icon}
      </Container>
      <Container className="container-status__item-desc">
        <h2 className="container-status__item-value">{value}</h2>
        <p className="container-status__item-text">{text}</p>
      </Container>
    </Container>
  );
}

ContainerStatus.propTypes = {
  icon: PropType.element,
  text: PropType.string,
  value: PropType.string,
};

export default ContainerStatus;
