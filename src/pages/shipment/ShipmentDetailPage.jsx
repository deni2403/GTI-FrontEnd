import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { MdEdit, MdSave, MdDelete } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import {
  getShipment,
  updateShipment,
  deleteShipment,
} from '../../api/shipmentAPI';
import { getContainersReady } from '../../api/containerAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { handleDateFormat } from '../../utils/Utility';

function ShipmentDetailPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [contReady, setContReady] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [totalUnit, setTotalUnit] = useState(1);
  const [selectedUnits, setSelectedUnits] = useState([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditData = () => {
    setIsEditing(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const fetchContainersReady = async () => {
      const data = await getContainersReady();
      setContReady(data.container);
    };

    fetchContainersReady();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchShipment = async () => {
      const data = await getShipment(id);
      formik.setValues({
        ...data.shipment,
        stuffing_date: new Date(data.shipment.stuffing_date),
        ETD: new Date(data.shipment.ETD),
        ETA: new Date(data.shipment.ETA),
      });
      setTotalUnit(data.shipment.container_number.length);
      setSelectedUnits(data.shipment.container_number);
      setIsLoading(false);
    };

    fetchShipment();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      number: '',
      container_number: [],
      shipper: '',
      stuffing_date: '',
      POL: '',
      POD: '',
      ETD: '',
      ETA: '',
      status: '',
      remark_description: '',
    },
    validationSchema: Yup.object({
      number: Yup.string().required('Book Number is required'),
      shipper: Yup.string().required('Shipper is required'),
      stuffing_date: Yup.date().required('Stuffing Date is required'),
      POL: Yup.string().required('Port Of Loading is required'),
      POD: Yup.string().required('Port Of Discharge is required'),
      ETD: Yup.date().required('ETD is required'),
      ETA: Yup.date().required('ETA is required'),
      status: Yup.string().required('Status is required'),
    }),
    onSubmit: async (values) => {
      const updatedShipment = {
        ...values,
        container_number: selectedUnits,
      };

      setIsLoading(true);
      const { error, data } = await updateShipment(id, updatedShipment);
      if (!error) {
        setIsEditing(false);
        NotifToast(data, 'success');
        setIsLoading(false);
      } else {
        NotifToast(data, 'error');
        setIsLoading(false);
      }
    },
  });

  const handleDeleteData = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const { error, data } = await deleteShipment(id);

    if (!error) {
      setShowDeleteModal(false);
      NotifToast(data, 'success');
      setIsEditing(false);
      setIsLoading(false);
      setTimeout(() => navigate('/shipments'), 1000);
    } else {
      NotifToast(data, 'error');
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  const handleIncrementTotalUnit = () => {
    if (totalUnit < contReady.length) {
      setTotalUnit((prevState) => prevState + 1);
    }
  };

  const handleDecrementTotalUnit = () => {
    if (totalUnit > 1) {
      setTotalUnit((prevState) => prevState - 1);
    }
  };

  const handleSelectUnit = (index, value) => {
    setSelectedUnits((prevState) => {
      const newSelectedUnits = [...prevState];
      newSelectedUnits[index] = value;
      return newSelectedUnits;
    });

    formik.setFieldValue('container_number', [...selectedUnits, value]);
  };

  const getDisabledUnits = () => {
    return selectedUnits;
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
                  <Button
                    onClick={formik.handleSubmit}
                    className="add-button m-0"
                    disabled={isLoading}
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
                          loading={isLoading}
                        />
                      </>
                    )}
                  </Container>
                )}
                <ToastContainer />
              </Container>
              <hr />

              <Form style={{ position: 'relative' }}>
                {isLoading && (
                  <Container className="loading-layer z-3 position-absolute d-flex justify-content-center align-items-center rounded">
                    <Spinner
                      animation="border"
                      variant="white"
                      className="spinner-layer"
                    />
                  </Container>
                )}
                <fieldset disabled={user.role == 'Operasional' || !isEditing}>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="number">Book Number</Form.Label>
                    <Form.Control
                      id="number"
                      name="number"
                      value={formik.values.number || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.number && formik.errors.number}
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
                          id={`unitNumber${index + 1}`}
                          value={selectedUnits[index] || ''}
                          onChange={(e) =>
                            handleSelectUnit(index, e.target.value)
                          }
                        >
                          <option value={selectedUnits[index]}>
                            {selectedUnits[index]}
                          </option>
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
                    <Form.Control
                      id="shipper"
                      name="shipper"
                      value={formik.values.shipper || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.shipper && formik.errors.shipper
                      }
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="stuffing_date">
                      Stuffing Date
                    </Form.Label>
                    <DatePicker
                      className="form-control ms-auto"
                      wrapperClassName="datePicker"
                      id="stuffing_date"
                      name="stuffing_date"
                      selected={formik.values.stuffing_date || new Date()}
                      onChange={(date) =>
                        formik.setFieldValue(
                          'stuffing_date',
                          handleDateFormat(date),
                        )
                      }
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.stuffing_date &&
                        formik.errors.stuffing_date
                      }
                      dateFormat={'dd/MM/yyyy'}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="POL">Port of Loading</Form.Label>
                    <Form.Control
                      id="POL"
                      name="POL"
                      value={formik.values.POL || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.POL && formik.errors.POL}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="POD">Port of Discharge</Form.Label>
                    <Form.Control
                      id="POD"
                      name="POD"
                      value={formik.values.POD || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.POD && formik.errors.POD}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="ETD">ETD</Form.Label>
                    <DatePicker
                      className="form-control ms-auto"
                      wrapperClassName="datePicker"
                      id="ETD"
                      name="ETD"
                      selected={formik.values.ETD || new Date()}
                      onChange={(date) =>
                        formik.setFieldValue('ETD', handleDateFormat(date))
                      }
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.ETD && formik.errors.ETD}
                      dateFormat={'dd/MM/yyyy'}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="ETA">ETA</Form.Label>
                    <div className="feedback-wrapper">
                      <DatePicker
                        className="form-control ms-auto"
                        wrapperClassName="datePicker"
                        id="ETA"
                        name="ETA"
                        selected={formik.values.ETA || new Date()}
                        onChange={(date) =>
                          formik.setFieldValue('ETA', handleDateFormat(date))
                        }
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.ETA && formik.errors.ETA}
                        dateFormat={'dd/MM/yyyy'}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.ETA}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </fieldset>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="status">Status</Form.Label>
                  <Form.Select
                    id="status"
                    name="status"
                    disabled={!isEditing}
                    value={formik.values.status || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.status && formik.errors.status}
                  >
                    <option value="Arrive">Arrive</option>
                    <option value="Departure">Departure</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Return">Return</option>
                    <option value="Gate in">Gate in</option>
                    <option value="Accident">Accident</option>
                  </Form.Select>
                </Form.Group>
                {(formik.values.status === 'Pickup' ||
                  formik.values.status === 'Accident') && (
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="remarkDesc">Remark</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="remark_description"
                      name="remark_description"
                      type="text"
                      disabled={!isEditing}
                      value={formik.values.remark_description || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.remark_description &&
                        formik.errors.remark_description
                      }
                      required
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
