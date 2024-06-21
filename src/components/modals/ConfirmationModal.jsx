import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ConfirmationModal = ({
  show,
  close,
  handleSubmit,
  variant,
  loading = false,
}) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {variant && variant === 'danger' ? (
          <p>Are you sure you want to delete this data?</p>
        ) : (
          <p>Are you sure you want to finish this repairment?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={loading} onClick={close}>
          Cancel
        </Button>
        <Button variant={variant} disabled={loading} onClick={handleSubmit}>
          {variant && variant === 'danger' ? 'Delete' : 'Finish'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ConfirmationModal;
