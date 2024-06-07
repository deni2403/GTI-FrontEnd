import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { MdEdit, MdUpload, MdSave, MdDelete } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import { getUser, updateUser, deleteUser } from '../../api/UserAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function UserDetailPage() {
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(id);
      formik.setValues(data.user);
    };

    fetchUser();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditData = () => {
    setIsEditing(true);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      role: '',
      location: '',
      email: '',
      password: '',
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

      const { error } = await updateUser(id, formData);
      if (!error) {
        setIsEditing(false);
        NotifToast('Update User Successful !', 'success');
      } else {
        NotifToast('Failed to update user data!', 'error');
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDeleteData = async () => {
    const { error, data } = await deleteUser(id);

    if (!error) {
      setShowDeleteModal(false);
      NotifToast(data, 'success');
      setTimeout(() => {
        navigate('/superadmin');
      }, 1000);
    } else {
      NotifToast('Failed Delete User Data', 'error');
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
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
                  <TableTitle>User Profile</TableTitle>
                </Container>
                {isEditing ? (
                  <Button
                    onClick={formik.handleSubmit}
                    type="submit"
                    className="add-button m-0"
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
                  </Container>
                )}
                <ToastContainer />
              </Container>
              <hr />
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="d-flex my-4 justify-content-center flex-column align-items-center">
                  <Image
                    src={
                      imagePreview
                        ? imagePreview
                        : formik.values.image
                        ? formik.values.image
                        : '/user_profile.jpg'
                    }
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
                  {isEditing && (
                    <Button
                      className="add-button mt-3"
                      onClick={() =>
                        document.getElementById('user_image_upload').click()
                      }
                    >
                      <MdUpload className="me-1" />
                      <span>Upload Image</span>
                    </Button>
                  )}
                </Form.Group>
                <fieldset disabled={!isEditing}>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="name">Nama</Form.Label>
                    <div className="feedback-wrapper">
                      <Form.Control
                        id="name"
                        name="name"
                        value={formik.values.name || ''}
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
                        value={formik.values.role || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.role && formik.errors.role}
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Customer Service">
                          Customer Service
                        </option>
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
                        value={formik.values.location || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.location && formik.errors.location
                        }
                      >
                        <option value="Jakarta">Jakarta</option>
                        <option value="Makasar">Makasar</option>
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
                        value={formik.values.email || ''}
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
                        value={formik.values.password || ''}
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
                </fieldset>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default UserDetailPage;
