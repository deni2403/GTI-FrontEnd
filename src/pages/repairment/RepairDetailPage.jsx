import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Spinner,
} from 'react-bootstrap';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import { useNavigate, useParams } from 'react-router-dom';
import TableTitle from '../../components/tables/TableTitle';
import RepairHistory from '../../components/tables/RepairHistory';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { MdEdit, MdSave, MdDelete, MdUpload } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import { FaRegCircleCheck } from 'react-icons/fa6';
import {
  getRepairment,
  updateRepairment,
  deleteRepairment,
  finishRepairment,
  getRepairHistory,
} from '../../api/repairmentAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function RepairDetailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [repairHistory, setRepairHistory] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFinishButton, setShowFinishButton] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchRepair = async () => {
      const data = await getRepairment(id);
      formik.setValues(data.repair);
      setShowButton(data.repair.finish);
      setIsLoading(false);

      if (data.repair.finish) {
        setShowFinishButton(false);
      } else {
        setShowFinishButton(true);
      }
    };

    const fetchRepairmentHistory = async () => {
      const data = await getRepairHistory(id);
      setRepairHistory(data.history);
    };

    fetchRepair();
    fetchRepairmentHistory();
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
      age: '',
      location: '',
      remarks: '',
      image: '',
    },
    validationSchema: Yup.object({
      remarks: Yup.string(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('number', values['number']);
      formData.append('remarks', values['remarks']);
      formData.append('image', values['image']);

      setIsLoading(true);
      const { error, data } = await updateRepairment(id, formData);
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

  const handleDeleteData = async () => {
    setIsLoading(true);
    const { error, data } = await deleteRepairment(id);

    if (!error) {
      setShowDeleteModal(false);
      NotifToast(data, 'success');
      setIsEditing(false);
      setIsLoading(false);
      setTimeout(() => {
        navigate('/repairments');
      }, 1000);
    } else {
      NotifToast(data, 'error');
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleFinishRepair = async () => {
    setIsLoading(true);
    const { error, data } = await finishRepairment(id);

    if (!error) {
      setShowFinishModal(false);
      NotifToast(data, 'success');
      setIsLoading(false);
      setTimeout(() => {
        navigate('/repairments');
      }, 1000);
    } else {
      setIsLoading(false);
      NotifToast(data, 'error');
    }
  };

  const handleCloseFinishModal = () => {
    setShowFinishModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
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
                  <TableTitle>Repair Detail</TableTitle>
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
                    {!showButton && (
                      <>
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
                      </>
                    )}
                    <ConfirmationModal
                      show={showDeleteModal}
                      close={handleCloseDeleteModal}
                      handleSubmit={handleDeleteData}
                      variant={'danger'}
                      loading={isLoading}
                    />
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
                <fieldset disabled>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="number">Number</Form.Label>
                    <Form.Control
                      id="number"
                      name="number"
                      defaultValue={formik.values.number || ''}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="type">Type</Form.Label>
                    <Form.Control
                      id="type"
                      name="type"
                      defaultValue={formik.values.type || ''}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="age">Age</Form.Label>
                    <Form.Control
                      id="age"
                      name="age"
                      defaultValue={formik.values.age || ''}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="location">Location</Form.Label>
                    <Form.Control
                      id="location"
                      name="location"
                      defaultValue={formik.values.location || ''}
                    />
                  </Form.Group>
                </fieldset>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="remarks">Remark</Form.Label>
                  <Form.Control
                    disabled={!isEditing}
                    as="textarea"
                    id="remarks"
                    name="remarks"
                    onChange={formik.handleChange}
                    value={formik.values.remarks}
                  />
                </Form.Group>
                {(formik.values.image || imagePreview) && (
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="image">Image</Form.Label>
                    <div className="repairment-image">
                      <Image
                        src={imagePreview ? imagePreview : formik.values.image}
                        fluid
                      />
                    </div>
                  </Form.Group>
                )}
                <Form.Group className="form-group">
                  <Form.Label htmlFor="Attachment">Attachment</Form.Label>
                  <div className="repair-image-btn">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      id="repairment_image_upload"
                    />
                    <Button
                      disabled={!isEditing}
                      className="add-button"
                      onClick={() =>
                        document
                          .getElementById('repairment_image_upload')
                          .click()
                      }
                    >
                      <MdUpload className="me-1 ms-0" />
                      <span>Upload Image</span>
                    </Button>
                  </div>
                </Form.Group>
              </Form>
              {showFinishButton && (
                <div className="d-flex justify-content-end">
                  {!isEditing && (
                    <Button
                      className="add-button"
                      onClick={() => setShowFinishModal(true)}
                    >
                      <FaRegCircleCheck className="me-1" />
                      Finish Repair
                    </Button>
                  )}
                  <ConfirmationModal
                    show={showFinishModal}
                    close={handleCloseFinishModal}
                    handleSubmit={handleFinishRepair}
                    variant={'success'}
                    loading={isLoading}
                  />
                </div>
              )}
            </Container>
          </Col>
          <Col className="p-0" xs={12} md={6}>
            <RepairHistory repairHistory={repairHistory} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default RepairDetailPage;
