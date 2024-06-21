import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import TableTitle from '../../components/tables/TableTitle';
import { MdSave, MdUpload } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import { addRepairment } from '../../api/repairmentAPI';
import { getContainersReady } from '../../api/containerAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddContainerPage() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contReady, setContReady] = useState([]);
  const [defaultValues, setDefaultValues] = useState({
    type: '',
    age: '',
    location: '',
  });

  const handleGoBack = () => {
    navigate(-1);
  };

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
      remarks: '',
      image: null,
    },
    validationSchema: Yup.object({
      number: Yup.string().required('Container Number is required'),
      remarks: Yup.string().required('Remarks is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      setIsLoading(true);
      const { data, error } = await addRepairment(formData);

      if (!error) {
        navigate('/repairments');
        setIsLoading(false);
        NotifToast(data, 'success');
      } else {
        setIsLoading(false);
        NotifToast(data, 'error');
      }
    },
  });

  useEffect(() => {
    const selectedContainer = contReady.find(
      (container) => container.number === formik.values.number,
    );

    if (selectedContainer) {
      setDefaultValues({
        type: selectedContainer.type,
        age: selectedContainer.age,
        location: selectedContainer.location,
      });
    }
  }, [formik.values.number, contReady]);

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
              <TableTitle>Add To Repair</TableTitle>
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
                  <Form.Label htmlFor="containerNumber">
                    Container Number
                  </Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Select
                      id="number"
                      name="number"
                      value={formik.values.number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.number && formik.errors.number}
                    >
                      <option hidden>Select Unit</option>
                      {contReady &&
                        contReady.map((container) => (
                          <option
                            key={container.number}
                            value={container.number}
                          >
                            {container.number}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.number}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="type">Type</Form.Label>
                  <Form.Control
                    disabled
                    id="type"
                    name="type"
                    type="text"
                    defaultValue={defaultValues.type}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="age">Age</Form.Label>
                  <Form.Control
                    disabled
                    id="age"
                    name="age"
                    type="text"
                    defaultValue={defaultValues.age}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="location">Location</Form.Label>
                  <Form.Control
                    disabled
                    id="location"
                    name="location"
                    type="text"
                    defaultValue={defaultValues.location}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="remarks">Remarks</Form.Label>
                  <div className="feedback-wrapper">
                    <Form.Control
                      id="remarks"
                      name="remarks"
                      as="textarea"
                      type="text"
                      value={formik.values.remarks}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.remarks && formik.errors.remarks
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.remarks}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                {imagePreview && (
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="image">Image</Form.Label>
                    <div className="repairment-image">
                      <Image src={imagePreview} fluid />
                    </div>
                  </Form.Group>
                )}
                <Form.Group className="form-group">
                  <Form.Label htmlFor="Attachment">Attachment</Form.Label>
                  <div className="unitButton">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      id="repairment_image_upload"
                    />
                    <Button
                      className="add-button"
                      onClick={() =>
                        document
                          .getElementById('repairment_image_upload')
                          .click()
                      }
                    >
                      <MdUpload className="me-1" />
                      <span>Upload Image</span>
                    </Button>
                  </div>
                </Form.Group>
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

export default AddContainerPage;
