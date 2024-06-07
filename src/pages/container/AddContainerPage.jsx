import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import TableTitle from '../../components/tables/TableTitle';
import { MdSave } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { addContainer } from '../../api/containerAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddContainerPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const formik = useFormik({
    initialValues: {
      number: '',
      type: '',
      age: '',
      iddle_days: '',
      location: '',
    },
    validationSchema: Yup.object({
      number: Yup.string().required('Container Number is required'),
      type: Yup.string().required('Type is required'),
      age: Yup.string().required('Age is required'),
      iddle_days: Yup.string().required('Iddle Days is required'),
      location: Yup.string().required('Location is required'),
    }),
    onSubmit: async (values) => {
      const { error, data } = await addContainer(values);

      if (!error) {
        navigate('/containers');
        NotifToast(data, 'success');
      } else {
        NotifToast('Failed to add container.', 'error');
      }
    },
  });

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
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="number">Container Number</Form.Label>
                  <Form.Control
                    id="number"
                    name="number"
                    type="text"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.number && formik.errors.number}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="type">Type</Form.Label>
                  <Form.Select
                    id="type"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.type && formik.errors.type}
                  >
                    <option hidden>Select Type</option>
                    <option value="20 feet">20 feet</option>
                    <option value="40 feet">40 feet</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="age">Age</Form.Label>
                  <Form.Control
                    id="age"
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.age && formik.errors.age}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="iddle_days">Iddle Days</Form.Label>
                  <Form.Control
                    id="iddle_days"
                    name="iddle_days"
                    value={formik.values.iddle_days}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.iddle_days && formik.errors.iddle_days}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="location">Location</Form.Label>
                  <Form.Select
                    id="location"
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.location && formik.errors.location}
                  >
                    <option hidden>Select Location</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Makassar">Makassar</option>
                    <option value="Medan">Medan</option>
                    <option value="Surabaya">Surabaya</option>
                  </Form.Select>
                </Form.Group>
                <Container className="d-flex justify-content-end mt-3">
                  <Button type="submit" className="save-button">
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
