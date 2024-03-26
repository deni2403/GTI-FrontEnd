import React from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import TableTitle from '../../components/tables/TableTitle';
import { MdUpload, MdSave } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';

function AddUserPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    navigate('/superadmin');
    NotifToast('User successfully Added!', 'success');
  };

  return (
    <Container fluid className="content-wrapper">
      <Container fluid className="create-page">
        <Button onClick={handleGoBack} variant="danger" className="back-button">
          <IoReturnUpBackOutline className="me-1" />
          <span>Back</span>
        </Button>
        <Row>
          <Col>
            <Container fluid className="create-page__container">
              <TableTitle>Create New User</TableTitle>
              <hr />
              <Form>
                <Form.Group className="d-flex my-4 justify-content-center flex-column align-items-center">
                  <Image
                    src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                    roundedCircle
                    fluid
                    alt="profile picture"
                    thumbnail
                    className="profile-picture"
                  />
                  <Button className="add-button mt-3">
                    <MdUpload className="me-1" />
                    <span>Upload Image</span>
                  </Button>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control id="name" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="position">Position</Form.Label>
                  <Form.Select>
                    <option hidden>Select Position</option>
                    <option value="1">Super Admin</option>
                    <option value="2">Customer Service</option>
                    <option value="3">Operasional</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control id="email" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control id="password" />
                </Form.Group>
                <Container className="d-flex justify-content-end mt-3">
                  <Button
                    onClick={handleAddUser}
                    type="submit"
                    className="add-button"
                  >
                    <MdSave className="me-1" />
                    <span>Save</span>
                  </Button>
                </Container>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default AddUserPage;
