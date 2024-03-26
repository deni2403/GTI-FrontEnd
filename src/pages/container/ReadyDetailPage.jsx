import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Modal,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { MdEdit, MdSave, MdDelete } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import { profile } from '../../utils/DummyData';

function ReadyDetailPage() {
  const [userProfile, setUserProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserProfile(profile);
  }, []);

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
      navigate('/containers');
    }, 1000);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const containerData = {
    number: 'GTNU8880042',
    status: 'Ready',
    type: '20 feet',
    age: '3 years',
    iddleDays: '60 days',
    location: 'Medan',
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
                  <TableTitle>Container Detail</TableTitle>
                </Container>
                {userProfile.position == 'Super Admin' &&
                  (isEditing ? (
                    <Button
                      onClick={handleUpdateData}
                      className="add-button m-0"
                    >
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
                  ))}
                <ToastContainer />
              </Container>
              <hr />
              <Form>
                <fieldset disabled={!isEditing}>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contNumber">Number</Form.Label>
                    <Form.Control
                      id="contNumber"
                      value={containerData.number}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="type">Type</Form.Label>
                    <Form.Select>
                      <option>{containerData.type}</option>
                      <option value="40">40 feet</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="status">Status</Form.Label>
                    <Form.Control
                      disabled
                      id="status"
                      value={containerData.status}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contAge">Age</Form.Label>
                    <Form.Control id="contAge" value={containerData.age} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="iddleDays">Iddle Days</Form.Label>
                    <Form.Control
                      id="iddleDays"
                      value={containerData.iddleDays}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="location">Location</Form.Label>
                    <Form.Select>
                      <option hidden>Select Location</option>
                      <option value="jakarta">Jakarta</option>
                      <option value="makasar">Makasar</option>
                      <option value="medan">Medan</option>
                      <option value="surabaya">Surabaya</option>
                    </Form.Select>
                  </Form.Group>
                </fieldset>
              </Form>
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

export default ReadyDetailPage;
