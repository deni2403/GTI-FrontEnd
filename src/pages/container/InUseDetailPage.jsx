import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import { IoReturnUpBackOutline } from 'react-icons/io5';

function InUseDetailPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const containerData = {
    number: 'GESU9282682',
    bookNumber: '202401270001',
    bookedBy: 'Billy Chayadi',
    status: 'In Use',
    type: '20 feet',
    age: '2 years',
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
              </Container>
              <hr />
              <Form>
                <fieldset disabled>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contNumber">Number</Form.Label>
                    <Form.Control
                      id="contNumber"
                      value={containerData.number}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="bookNumber">Book Number</Form.Label>
                    <Form.Control
                      id="bookNumber"
                      value={containerData.bookNumber}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="bookedBy">Booked By</Form.Label>
                    <Form.Control
                      id="bookedBy"
                      value={containerData.bookedBy}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contType">Type</Form.Label>
                    <Form.Control id="contType" value={containerData.type} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="status">Status</Form.Label>
                    <Form.Control id="status" value={containerData.status} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contAge">Age</Form.Label>
                    <Form.Control id="contAge" value={containerData.age} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contLocation">Location</Form.Label>
                    <Form.Control
                      id="contLocation"
                      value={containerData.location}
                    />
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

export default InUseDetailPage;
