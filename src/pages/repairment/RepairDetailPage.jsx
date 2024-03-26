import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Modal,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { MdEdit, MdSave, MdDelete, MdUpload } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import { FaRegCircleCheck } from 'react-icons/fa6';

function RepairDetailPage() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const navigate = useNavigate();
  const role = 'operasional';

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditData = () => {
    setIsEditing(true);
  };

  const handleUpdateData = () => {
    setIsEditing(false);
    NotifToast('Data successfully saved!', 'success');
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    NotifToast('Data successfully deleted!', 'success');
    setTimeout(() => {
      navigate('/repairments');
    }, 1000);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleFinishRepair = () => {
    setShowFinishModal(false);
    NotifToast('Repair finished!', 'success');
    setTimeout(() => {
      navigate('/repairments');
    }, 1000);
  };

  const handleCloseFinishModal = () => {
    setShowFinishModal(false);
  };

  const repairData = {
    number: 'GNU9282682',
    type: '20 feet',
    age: '8 years',
    location: 'Medan',
    remark: 'Perbaikan Pintu Kontainer',
  };

  return (
    <Container fluid className="content-wrapper">
      <Container fluid className="contDetail-page">
        <Button onClick={handleGoBack} variant="danger" className="back-button">
          <IoReturnUpBackOutline className="me-1" />
          <span>Back</span>
        </Button>
        <Row>
          <Col className="p-0" xs={12} md={6}>
            <Container fluid className="contDetail-page__content">
              <Container
                fluid
                className="d-flex justify-content-between align-items-center"
              >
                <Container>
                  <TableTitle>Repair Detail</TableTitle>
                </Container>
                {isSuperAdmin && isEditing ? (
                  <Button onClick={handleUpdateData} className="add-button m-0">
                    <MdSave className="me-1" />
                    <span>Save</span>
                  </Button>
                ) : (
                  <Container className="d-flex justify-content-end gap-2 flex-wrap">
                    <Button
                      onClick={handleEditData}
                      variant="success"
                      className="edit-button"
                    >
                      <MdEdit className="me-1" />
                      <span>Edit</span>
                    </Button>
                    <Button
                      variant="danger"
                      className="back-button"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      <MdDelete className="me-1" />
                      <span>Delete</span>
                    </Button>
                    <Modal
                      show={showDeleteModal}
                      onHide={handleCloseDeleteModal}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Are you sure you want to delete this data?</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={handleCloseDeleteModal}
                        >
                          Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Container>
                )}
                <ToastContainer />
              </Container>
              <hr />
              <Form>
                <fieldset
                  disabled={!isEditing || (role === 'operasional' && isEditing)}
                >
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contNumber">Number</Form.Label>
                    <Form.Control id="contNumber" value={repairData.number} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contType">Type</Form.Label>
                    <Form.Control id="contType" value={repairData.type} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contAge">Age</Form.Label>
                    <Form.Control id="contAge" value={repairData.age} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contLocation">Location</Form.Label>
                    <Form.Control
                      id="contLocation"
                      value={repairData.location}
                    />
                  </Form.Group>
                </fieldset>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="remark">Remark</Form.Label>
                  <Form.Control
                    disabled={!isEditing}
                    as="textarea"
                    id="remark"
                    value={repairData.remark}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="Attachment">Attachment</Form.Label>
                  <div className="unitButton">
                    <Button disabled={!isEditing} className="add-button">
                      <MdUpload className="me-1" />
                      <span>Upload Image</span>
                    </Button>
                  </div>
                </Form.Group>
              </Form>
              <div className="d-flex justify-content-end">
                <Button
                  className="add-button"
                  onClick={() => setShowFinishModal(true)}
                >
                  <FaRegCircleCheck className="me-1" />
                  Finish Repair
                </Button>
                <Modal show={showFinishModal} onHide={handleCloseFinishModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Are you sure you want to finish this repairment?</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleCloseFinishModal}
                    >
                      Cancel
                    </Button>
                    <Button variant="success" onClick={handleFinishRepair}>
                      Finish
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Container>
          </Col>
          <Col className="p-0" xs={12} md={6}>
            <Container fluid className="contDetail-page__table">
              <TableTitle>History</TableTitle>
              <hr />
              <Table responsive className="mt-3 border">
                <thead className="table-primary">
                  <tr>
                    <th>Date</th>
                    <th>Book Number</th>
                    <th>Booked By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Book Number 1</td>
                    <td>Booked By 1</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Book Number 2</td>
                    <td>Booked By 2</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Book Number 3</td>
                    <td>Booked By 3</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Book Number 4</td>
                    <td>Booked By 4</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Book Number 5</td>
                    <td>Booked By 5</td>
                  </tr>
                </tbody>
              </Table>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default RepairDetailPage;
