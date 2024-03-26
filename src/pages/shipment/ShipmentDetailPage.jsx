import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { MdEdit, MdSave, MdDelete } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import { profile, shipmentData } from '../../utils/DummyData';
import DatePicker from 'react-datepicker';

function ShipmentDetailPage() {
  const [userProfile, setUserProfile] = useState({});
  const [dataShipment, setDataShipment] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [totalUnit, setTotalUnit] = useState(1);
  const [shipmentStatus, setShipmentStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUserProfile(profile);
    setDataShipment(shipmentData);
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

  const handleDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
    NotifToast('Data successfully deleted!', 'success');
    setTimeout(() => navigate('/shipments'), 1000);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
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
                  <TableTitle>Shipment Detail</TableTitle>
                </Container>
                {isEditing ? (
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
                    {userProfile.position === 'Super Admin' && (
                      <>
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
                      </>
                    )}
                  </Container>
                )}
                <ToastContainer />
              </Container>
              <hr />
              <Form>
                <fieldset
                  disabled={userProfile.position == 'Operasional' || !isEditing}
                >
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="bookNumber">Book Number</Form.Label>
                    <Form.Control
                      id="bookNumber"
                      value={dataShipment.bookNumber}
                    />
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
                    <Form.Control id="shipper" value={dataShipment.shipper} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="bookedBy">Booked By</Form.Label>
                    <Form.Control id="bookedBy" value={dataShipment.bookedBy} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="stuffingDate">
                      Stuffing Date
                    </Form.Label>
                    <DatePicker
                      className="form-control ms-auto"
                      wrapperClassName="datePicker"
                      id="stuffingDate"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat={'dd/MM/yyyy'}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="pol">Port of Loading</Form.Label>
                    <Form.Control id="pol" value={dataShipment.pol} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="pod">Port of Discharge</Form.Label>
                    <Form.Control id="pod" value={dataShipment.pod} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="etd">ETD</Form.Label>
                    {/* <Form.Control id="etd" value={dataShipment.etd} /> */}
                    <DatePicker
                      className="form-control ms-auto"
                      wrapperClassName="datePicker"
                      id="etd"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat={'dd/MM/yyyy'}
                    />
                  </Form.Group>
                </fieldset>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="Remark">Remark</Form.Label>
                  <Form.Select
                    disabled={!isEditing}
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
                    <Form.Control
                      as="textarea"
                      id="remarkDesc"
                      type="text"
                      disabled={!isEditing}
                    />
                  </Form.Group>
                )}
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ShipmentDetailPage;
