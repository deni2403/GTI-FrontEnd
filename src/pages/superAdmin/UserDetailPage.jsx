import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Modal,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { MdEdit, MdUpload, MdSave, MdDelete } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import { profile } from '../../utils/DummyData';

function UserDetailPage() {
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
    NotifToast('User successfully deleted!', 'success');
    setTimeout(() => {
      navigate('/superadmin');
    }, 1000);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <Container fluid className="content-wrapper">
      <Container fluid className="detail-page">
        <Button onClick={handleGoBack} variant="danger" className="back-button">
          <IoReturnUpBackOutline className="me-1" />
          <span>Back</span>
        </Button>
        <Row>
          <Col>
            <Container fluid className="detail-page__container">
              <Container
                fluid
                className="d-flex justify-content-between align-items-center"
              >
                <Container>
                  <TableTitle>User Profile</TableTitle>
                </Container>
                {isEditing ? (
                  <Button
                    onClick={handleUpdateData}
                    type="submit"
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
                        <p>Are you sure you want to delete this user?</p>
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
                <Form.Group className="d-flex my-4 justify-content-center flex-column align-items-center">
                  <Image
                    src={userProfile.image}
                    roundedCircle
                    fluid
                    alt="profile picture"
                    thumbnail
                    className="profile-picture"
                  />
                  {isEditing && (
                    <Button className="add-button mt-3">
                      <MdUpload className="me-1" />
                      <span>Upload Image</span>
                    </Button>
                  )}
                </Form.Group>
                <fieldset disabled={!isEditing}>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="name">Nama</Form.Label>
                    <Form.Control
                      id="name"
                      value={userProfile.name}
                      onChange={(e) =>
                        setUserProfile({ ...userProfile, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="position">Position</Form.Label>
                    <Form.Select>
                      <option hidden>{userProfile.position}</option>
                      <option value="1">Super Admin</option>
                      <option value="2">Customer Service</option>
                      <option value="3">Operasional</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                      id="email"
                      value={userProfile.email}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="username">Password</Form.Label>
                    <Form.Control
                      id="username"
                      value=""
                    />
                  </Form.Group>
                </fieldset>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default UserDetailPage;
