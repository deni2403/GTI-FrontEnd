import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import ContainerHistory from '../../components/tables/ContainerHistory';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { getContainer, getContainerHistory } from '../../api/containerAPI';


function InUseDetailPage() {
  const [container, setContainer] = useState({
    number: '',
    shipment_number: '',
    shipper: '',
    type: '',
    status: '',
    age: '',
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
                    <Form.Label htmlFor="number">Number</Form.Label>
                    <Form.Control
                      id="number"
                      name="number"
                      defaultValue={container.number || ''}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="bookNumber">Book Num</Form.Label>
                    <Form.Control
                      id="bookNumber"
                      name="bookNumber"
                      defaultValue={container.shipment_number || ''}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="shipper">Shipper</Form.Label>
                    <Form.Control
                      id="shipper"
                      name="shipper"
                      defaultValue={container.shipper || ''}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="type">Type</Form.Label>
                    <Form.Control
                      id="type"
                      name="type"
                      defaultValue={container.type || ''}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="status">Status</Form.Label>
                    <Form.Control
                      id="status"
                      name="status"
                      defaultValue={container.status || ''}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="age">Age</Form.Label>
                    <Form.Control
                      id="age"
                      name="age"
                      defaultValue={container.age}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="location">Location</Form.Label>
                    <Form.Control
                      id="location"
                      name="location"
                      defaultValue={container.location || ''}
                    />
                  </Form.Group>
                </fieldset>
              </Form>
            </Container>
          </Col>
          <Col className="p-0" xs={12} md={6}>
            <ContainerHistory containerHistory={containerHistory} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default InUseDetailPage;
