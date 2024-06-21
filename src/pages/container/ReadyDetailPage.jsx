import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import ContainerHistory from '../../components/tables/ContainerHistory';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { MdEdit, MdSave, MdDelete } from 'react-icons/md';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import {
  getContainer,
  updateContainer,
  deleteContainer,
  getContainerHistory,
} from '../../api/containerAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ReadyDetailPage() {
  const { user } = useSelector((state) => state.auth);
  const [containerHistory, setContainerHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchContainer = async () => {
      const data = await getContainer(id);
      formik.setValues(data.container);
      setIsLoading(false);
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

  const handleEditData = () => {
    setIsEditing(true);
  };

  const formik = useFormik({
    initialValues: {
      number: '',
      type: '',
      status: '',
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
      setIsLoading(true);
      const { error, data } = await updateContainer(id, values);

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
    const { error, data } = await deleteContainer(id);

    if (!error) {
      setShowDeleteModal(false);
      NotifToast(data, 'success');
      setIsLoading(false);
      setTimeout(() => {
        navigate('/containers');
      }, 1000);
    } else {
      NotifToast(data, 'error');
      setIsLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
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
                {user.role !== 'Operasional' &&
                  (isEditing ? (
                    <Button
                      onClick={formik.handleSubmit}
                      type="submit"
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
                    </Container>
                  ))}
                <ToastContainer />
              </Container>
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
                <fieldset disabled={!isEditing}>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="number">Number</Form.Label>
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
                    <Form.Label htmlFor="type">Type</Form.Label>
                    <Form.Select
                      id="type"
                      name="type"
                      value={formik.values.type || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.type && formik.errors.type}
                    >
                      <option value="20 feet">20 feet</option>
                      <option value="40 feet">40 feet</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="status">Status</Form.Label>
                    <Form.Control
                      disabled
                      id="status"
                      value={formik.values.status || ''}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="age">Age</Form.Label>
                    <Form.Control
                      id="age"
                      name="age"
                      value={formik.values.age || ''}
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
                      value={formik.values.iddle_days || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.iddle_days && formik.errors.iddle_days
                      }
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="location">Location</Form.Label>
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
                      <option value="Makassar">Makassar</option>
                      <option value="Medan">Medan</option>
                      <option value="Surabaya">Surabaya</option>
                    </Form.Select>
                  </Form.Group>
                </fieldset>
              </Form>
            </Container>
          </Col>
          <Col className="p-0" xs={12} md={6}>
            <ContainerHistory containerHistory={containerHistory}/>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ReadyDetailPage;
