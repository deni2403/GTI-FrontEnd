import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import TableTitle from '../../components/tables/TableTitle';
import { MdSave } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';

function AddContainerPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddData = (e) => {
    e.preventDefault();
    navigate('/containers');
    NotifToast('Data successfully Added!', 'success');
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
              <TableTitle>Add New Container</TableTitle>
              <hr />
              <Form>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="contNumber">Container Number</Form.Label>
                  <Form.Control id="contNumber" type="text" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="type">Type</Form.Label>
                  <Form.Select>
                    <option hidden>Select Type</option>
                    <option value="20">20 feet</option>
                    <option value="40">40 feet</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="contAge">Age</Form.Label>
                  <Form.Control id="contAge" type="text" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="iddleDays">Iddle Days</Form.Label>
                  <Form.Control id="iddleDays" type="text" />
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
                <Container className="d-flex justify-content-end mt-3">
                  <Button
                    onClick={handleAddData}
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

export default AddContainerPage;
