import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import TableTitle from '../../components/tables/TableTitle';
import { MdUpload, MdSave } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { addUser } from '../../api/UserAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddUserPage() {
  const { user } = useSelector((state) => state.auth);
  const [imagePreview, setImagePreview] = useState('/user_profile.jpg');
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (user.role !== 'Super Admin') {
      navigate('/dashboard');
    }
  }, [user.role, navigate]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: '',
      location: '',
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required'),
      role: Yup.string().required('Role is required'),
      location: Yup.string().required('Location is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      const { data, error } = await addUser(formData);

      if (!error) {
        navigate('/superadmin');
        NotifToast(data, 'success');
      } else {
        NotifToast(data, 'error');
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
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
              <TableTitle>Create New User</TableTitle>
              <hr />
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="d-flex my-4 justify-content-center flex-column align-items-center">
                  <Image
                    src={imagePreview}
                    roundedCircle
                    fluid
                    alt="profile picture"
                    thumbnail
                    className="profile-picture"
                  />
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="user_image_upload"
                  />
                  <Button
                    className="add-button mt-3"
                    onClick={() =>
                      document.getElementById('user_image_upload').click()
                    }
                  >
                    <MdUpload className="me-1" />
                    <span>Upload Image</span>
                  </Button>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="name">Nama</Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Control
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.name && formik.errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="role">Position</Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Select
                      id="role"
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.role && formik.errors.role}
                    >
                      <option hidden>Select Position</option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="Customer Service">Customer Service</option>
                      <option value="Operasional">Operasional</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.role}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="location">Location</Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Select
                      id="location"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.location && formik.errors.location
                      }
                    >
                      <option hidden>Select Location</option>
                      <option value="Jakarta">Jakarta</option>
                      <option value="Makassar">Makassar</option>
                      <option value="Medan">Medan</option>
                      <option value="Surabaya">Surabaya</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.location}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Control
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.email && formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </div>
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

export default AddUserPage;
