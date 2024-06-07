import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { getContainer, getContainerHistory } from '../../api/containerAPI';

function InUseDetailPage() {
  const [container, setContainer] = useState({
    container_number: '',
    type: '',
    status: '',
    age: '',
    iddle_days: '',
    location: '',
  });
  const [containerHistory, setContainerHistory] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchContainer = async () => {
      const data = await getContainer(id);
      setContainer(data.container);
    };

    const fetchHistory = async () => {
      const data = await getContainerHistory(id);
      setContainerHistory(data.history);
    };

    fetchContainer();
    fetchHistory();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
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
                    <Form.Control id="contNumber" value={container.number} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="bookNumber">Book Num</Form.Label>
                    <Form.Control
                      id="bookNumber"
                      value={container.bookNumber}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="bookedBy">Booked By</Form.Label>
                    <Form.Control id="bookedBy" value={container.bookedBy} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contType">Type</Form.Label>
                    <Form.Control id="contType" value={container.type} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="status">Status</Form.Label>
                    <Form.Control id="status" value={container.status} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contAge">Age</Form.Label>
                    <Form.Control id="contAge" value={container.age} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="contLocation">Location</Form.Label>
                    <Form.Control
                      id="contLocation"
                      value={container.location}
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
                  {containerHistory &&
                    containerHistory.map((history) => (
                      <tr key={history.number}>
                        <td></td>
                        <td>{history.number}</td>
                        <td></td>
                      </tr>
                    ))}
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
