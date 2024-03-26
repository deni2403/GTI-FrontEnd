import React from 'react';
import { Container, Image } from 'react-bootstrap';

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

export default ContainerStatus;
