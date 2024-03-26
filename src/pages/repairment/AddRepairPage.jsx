import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import TableTitle from '../../components/tables/TableTitle';
import { MdSave, MdUpload } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';

function AddContainerPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddData = (e) => {
    e.preventDefault();
    navigate('/repairments');
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
              <TableTitle>Add To Repair</TableTitle>
              <hr />
              <Form>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="containerNumber">
                    Container Number
                  </Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option hidden>Select Unit</option>
                    <option value="1">GESU9282682</option>
                    <option value="2">GTNU8880042</option>
                    <option value="3">GTRU8880140</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="contType">Type</Form.Label>
                  <Form.Control
                    disabled
                    id="contType"
                    type="text"
                    value="20 feet"
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="contAge">Age</Form.Label>
                  <Form.Control
                    disabled
                    id="contAge"
                    type="text"
                    value="8 years"
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="location">Location</Form.Label>
                  <Form.Control
                    disabled
                    id="location"
                    type="text"
                    value="Medan"
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="remark">Remark</Form.Label>
                  <Form.Control as="textarea" id="remark" type="text" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="Attachment">Attachment</Form.Label>
                  <div className="unitButton">
                    <Button className="add-button mt-3">
                      <MdUpload className="me-1" />
                      <span>Upload Image</span>
                    </Button>
                  </div>
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
