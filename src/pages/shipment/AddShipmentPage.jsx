import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import TableTitle from '../../components/tables/TableTitle';
import { MdSave } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import DatePicker from 'react-datepicker';
import { getContainersReady } from '../../api/containerAPI';
import { addShipment } from '../../api/shipmentAPI';
import { handleDateFormat } from '../../utils/Utility';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddShipmentPage() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [contReady, setContReady] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUnit, setTotalUnit] = useState(1);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (user.role === 'Operasional') {
      navigate('/dashboard');
    }
  }, [user.role, navigate]);

  useEffect(() => {
    const fetchContainersReady = async () => {
      const data = await getContainersReady();
      setContReady(data.container);
    };

    fetchContainersReady();
  }, []);

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
      setIsLoading(true);
      const { error, data } = await addShipment({
        ...values,
        container_number: selectedUnits,
      });

      if (!error) {
        navigate('/shipments');
        setIsLoading(false);
        NotifToast(data, 'success');
      } else {
        setIsLoading(false);
        NotifToast(data, 'error');
      }
    },
  });

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
              <Form
                style={{ position: 'relative' }}
                onSubmit={formik.handleSubmit}
              >
                {isLoading && (
                  <Container className="loading-layer z-3 position-absolute d-flex justify-content-center align-items-center rounded">
                    <Spinner
                      animation="border"
                      variant="white"
                      className="spinner-layer"
                    />
                  </Container>
                )}
                <Form.Group className="form-group">
                  <Form.Label htmlFor="number">Book Number</Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Control
                      name="number"
                      id="number"
                      type="text"
                      value={formik.values.number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.number && formik.errors.number}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.number}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="totalUnit">Total Unit</Form.Label>
                  <div className="unitButton">
                    <div className="d-flex align-items-center">
                      <Button
                        variant="danger"
                        onClick={handleDecrementTotalUnit}
                        disabled={totalUnit === 1}
                      >
                        -
                      </Button>
                      <span className="mx-2">{totalUnit}</span>
                      <Button
                        variant="success"
                        onClick={handleIncrementTotalUnit}
                        disabled={totalUnit === contReady.length}
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
                        onChange={(e) =>
                          handleSelectUnit(index, e.target.value)
                        }
                      >
                        <option hidden>Select Unit</option>
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
                  <div className="feedback-wrapper">
                    <Form.Control
                      id="shipper"
                      name="shipper"
                      type="text"
                      value={formik.values.shipper}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.shipper && formik.errors.shipper
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.shipper}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="stuffing_date">Stuffing Date</Form.Label>
                  <div className="feedback-wrapper">
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
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.stuffing_date}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="POL">Port Of Loading</Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Control
                      id="POL"
                      name="POL"
                      type="text"
                      value={formik.values.POL}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.POL && formik.errors.POL}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.POL}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="POD">Port Of Discharge</Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Control
                      id="POD"
                      name="POD"
                      type="text"
                      value={formik.values.POD}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.POD && formik.errors.POD}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.POD}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="ETD">ETD</Form.Label>
                  <div className="feedback-wrapper">
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
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.ETD}
                    </Form.Control.Feedback>
                  </div>
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
                <Form.Group className="form-group">
                  <Form.Label htmlFor="status">Status</Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Select
                      id="status"
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.status && formik.errors.status}
                    >
                      <option hidden>Select Status</option>
                      <option value="Arrive">Arrive</option>
                      <option value="Depature">Depature</option>
                      <option value="Pickup">Pickup</option>
                      <option value="Return">Return</option>
                      <option value="Gate in">Gate in</option>
                      <option value="Accident">Accident</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.status}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                {(formik.values.status === 'Pickup' ||
                  formik.values.status === 'Accident') && (
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="remark_description">
                      Remark Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      id="remark_description"
                      name="remark_description"
                      type="text"
                      value={formik.values.remark_description}
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
                <Container className="d-flex justify-content-end mt-3">
                  <Button disabled={isLoading} type="submit" className="save-button">
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
