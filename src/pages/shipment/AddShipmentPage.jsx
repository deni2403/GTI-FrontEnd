import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import TableTitle from '../../components/tables/TableTitle';
import { MdSave } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import DatePicker from 'react-datepicker';

function AddShipmentPage() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [totalUnit, setTotalUnit] = useState(1);
  const [shipmentStatus, setShipmentStatus] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddData = (e) => {
    e.preventDefault();
    navigate('/shipments');
    NotifToast('Data successfully Added!', 'success');
  };

  const handleIncrementTotalUnit = () => {
    setTotalUnit(totalUnit + 1);
  };

  const handleDecrementTotalUnit = () => {
    if (totalUnit > 1) {
      setTotalUnit(totalUnit - 1);
    }
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
              <TableTitle>Add New Shipment</TableTitle>
              <hr />
              <Form>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="bookNumber">Book Number</Form.Label>
                  <Form.Control id="bookNumber" type="text" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="totalUnit">Total Unit</Form.Label>
                  <div className="unitButton">
                    <div className="d-flex align-items-center">
                      <Button
                        variant="danger"
                        onClick={handleDecrementTotalUnit}
                      >
                        -
                      </Button>
                      <span className="mx-2">{totalUnit}</span>
                      <Button
                        variant="success"
                        onClick={handleIncrementTotalUnit}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </Form.Group>
                {[...Array(totalUnit)].map((_, index) => (
                  <div key={index}>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor={`unitNumber${index}`}>
                        Unit Number
                      </Form.Label>
                      <Form.Select>
                        <option hidden>Select Unit</option>
                        <option value="1">GESU9282682</option>
                        <option value="2">GTNU8880042</option>
                        <option value="3">GTRU8880140</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                ))}
                <Form.Group className="form-group">
                  <Form.Label htmlFor="shipper">Shipper</Form.Label>
                  <Form.Control id="shipper" type="text" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="bookedBy">Booked By</Form.Label>
                  <Form.Control id="bookedBy" type="text" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="stuffDate">Stuffing Date</Form.Label>
                  <DatePicker
                    className="form-control ms-auto"
                    wrapperClassName="datePicker"
                    id="stuffDate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat={'dd/MM/yyyy'}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="pol">Port Of Loading</Form.Label>
                  <Form.Control id="pol" type="text" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="pod">Port Of Discharge</Form.Label>
                  <Form.Control id="pod" type="text" />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="etd">ETD</Form.Label>
                  <DatePicker
                    className="form-control ms-auto"
                    wrapperClassName="datePicker"
                    id="etd"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat={'dd/MM/yyyy'}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="Remark">Remark</Form.Label>
                  <Form.Select
                    onChange={(e) => setShipmentStatus(e.target.value)}
                  >
                    <option hidden>Shipment Status</option>
                    <option value="1">Arrive</option>
                    <option value="2">Depature</option>
                    <option value="3">Pickup</option>
                    <option value="4">Return</option>
                    <option value="5">Gate in</option>
                    <option value="6">Accident</option>
                  </Form.Select>
                </Form.Group>
                {(shipmentStatus === '3' || shipmentStatus === '6') && (
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="remarkDesc">
                      Remark Description
                    </Form.Label>
                    <Form.Control as="textarea" id="remarkDesc" type="text" />
                  </Form.Group>
                )}
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

export default AddShipmentPage;
