import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { MdEdit, MdSave, MdDelete } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { getShipment } from '../../api/shipmentAPI';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import { getContainersReady } from '../../api/containerAPI';

function ShipmentDetailPage() {
  const { user } = useSelector((state) => state.auth);
  const [dataShipment, setDataShipment] = useState({
    number: '',
    container_number: '',
    shipper: '',
    stuffing_date: '',
    POL: '',
    POD: '',
    ETD: '',
    ETA: '',
    status: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [totalUnit, setTotalUnit] = useState(1);
  const [shipmentStatus, setShipmentStatus] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [contReady, setContReady] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState({});

  useEffect(() => {
    const fetchContainersReady = async () => {
      const data = await getContainersReady();
      setContReady(data.container);
    };

    fetchContainersReady();
  }, []);

  useEffect(() => {
    const fetchShipment = async () => {
      const data = await getShipment(id);
      const shipment = data.shipment;
      setDataShipment({
        number: shipment.number,
        container_number: shipment.container.number,
        shipper: shipment.shipment_detail.shipper,
        stuffing_date: shipment.shipment_detail.stuffing_date,
        POL: shipment.shipment_detail.POL,
        POD: shipment.shipment_detail.POD,
        ETD: shipment.shipment_detail.ETD,
        ETA: shipment.shipment_detail.ETA,
        status: shipment.status,
      });
    };
    fetchShipment();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Add edit, update, and delete data function
  const handleEditData = () => {
    setIsEditing(true);
  };

  const handleUpdateData = () => {
    setIsEditing(false);
    NotifToast('Data successfully saved!', 'success');
  };

  const handleDeleteData = (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
    NotifToast('Data successfully deleted!', 'success');
    setTimeout(() => navigate('/shipments'), 1000);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // Add increment and decrement total unit function
  const handleIncrementTotalUnit = () => {
    if (totalUnit < contReady.length) {
      setTotalUnit(totalUnit + 1);
    }
  };

  const handleDecrementTotalUnit = () => {
    if (totalUnit > 1) {
      setTotalUnit(totalUnit - 1);
    }
  };

  const handleSelectUnit = (index, value) => {
    setSelectedUnits((prevSelectedUnits) => {
      const newSelectedUnits = { ...prevSelectedUnits, [index]: value };
      const containerNumbers = Object.values(newSelectedUnits).join(', ');
      setDataShipment((prevData) => ({
        ...prevData,
        container_number: containerNumbers,
      }));
      return newSelectedUnits;
    });
  };

  const getDisabledUnits = () => {
    return Object.values(selectedUnits);
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
                    {user.role !== 'Operasional' && (
                      <>
                        <Button
                          variant="danger"
                          className="back-button"
                          onClick={() => setShowDeleteModal(true)}
                        >
                          <MdDelete className="me-1" />
                          <span>Delete</span>
                        </Button>
                        <ConfirmationModal
                          show={showDeleteModal}
                          close={handleCloseDeleteModal}
                          handleSubmit={handleDeleteData}
                          variant={'danger'}
                        />
                      </>
                    )}
                  </Container>
                )}
                <ToastContainer />
              </Container>
              <hr />
              <Form>
                <fieldset disabled={user.role == 'Operasional' || !isEditing}>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="number">Book Number</Form.Label>
                    <Form.Control
                      id="number"
                      name="number"
                      value={dataShipment.number || ''}
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
                        <Form.Label htmlFor={`unitNumber${index + 1}`}>
                          {totalUnit === 1
                            ? 'Unit Number'
                            : `Unit Number ${index + 1}`}
                        </Form.Label>
                        <Form.Select
                          onChange={(e) =>
                            handleSelectUnit(index, e.target.value)
                          }
                          value={selectedUnits[index] || ''}
                        >
                          {contReady &&
                            contReady.map((container) => (
                              <option
                                key={container.number}
                                value={container.number}
                                disabled={getDisabledUnits().includes(
                                  container.number,
                                )}
                              >
                                {container.number}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                  ))}
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="shipper">Shipper</Form.Label>
                    <Form.Control id="shipper" value={dataShipment.shipper} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="stuffingDate">
                      Stuffing Date
                    </Form.Label>
                    <DatePicker
                      className="form-control ms-auto"
                      wrapperClassName="datePicker"
                      id="stuffingDate"
                      selected={dataShipment.stuffing_date}
                      onChange={(date) => setStartDate(date)}
                      dateFormat={'dd/MM/yyyy'}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="pol">Port of Loading</Form.Label>
                    <Form.Control id="pol" value={dataShipment.POL} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="pod">Port of Discharge</Form.Label>
                    <Form.Control id="pod" value={dataShipment.POD} />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="etd">ETD</Form.Label>
                    <DatePicker
                      className="form-control ms-auto"
                      wrapperClassName="datePicker"
                      id="etd"
                      selected={dataShipment.ETD}
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
                    <option hidden>{dataShipment.status}</option>
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
