import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import TableTitle from '../../components/tables/TableTitle';
import { MdSave } from 'react-icons/md';
import NotifToast from '../../utils/NotifiactionToast';
import DatePicker from 'react-datepicker';
import { getContainersReady } from '../../api/containerAPI';
import { addShipment } from '../../api/shipmentAPI';

function AddShipmentPage() {
  const navigate = useNavigate();
  const [containerData, setContainerData] = useState({
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
  const [contReady, setContReady] = useState([]);
  const [totalUnit, setTotalUnit] = useState(1);
  const [selectedUnits, setSelectedUnits] = useState({});

  useEffect(() => {
    const fetchContainersReady = async () => {
      const data = await getContainersReady();
      setContReady(data.container);
    };

    fetchContainersReady();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddData = async (e) => {
    e.preventDefault();

    console.log(containerData);
    const { error, data } = await addShipment(containerData);

    if (!error) {
      navigate('/shipments');
      NotifToast(data, 'success');
    } else {
      NotifToast('Failed Add Shipments', 'error');
    }
  };

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
      setContainerData((prevData) => ({
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
              <Form onSubmit={handleAddData}>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="bookNumber">Book Number</Form.Label>
                  <Form.Control
                    name="bookNumber"
                    id="bookNumber"
                    type="text"
                    value={containerData.number}
                    onChange={(e) =>
                      setContainerData({
                        ...containerData,
                        number: e.target.value,
                      })
                    }
                  />
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
                        onChange={(e) =>
                          handleSelectUnit(index, e.target.value)
                        }
                        value={selectedUnits[index] || ''}
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
                  <Form.Control
                    id="shipper"
                    name="shipper"
                    type="text"
                    value={containerData.shipper}
                    onChange={(e) =>
                      setContainerData({
                        ...containerData,
                        shipper: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="stuffDate">Stuffing Date</Form.Label>
                  <DatePicker
                    className="form-control ms-auto"
                    wrapperClassName="datePicker"
                    id="stuffDate"
                    name="stuffDate"
                    selected={containerData.stuffing_date}
                    onChange={(date) =>
                      setContainerData({
                        ...containerData,
                        stuffing_date: date,
                      })
                    }
                    dateFormat={'dd/MM/yyyy'}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="pol">Port Of Loading</Form.Label>
                  <Form.Control
                    id="pol"
                    name="pol"
                    value={containerData.POL}
                    onChange={(e) =>
                      setContainerData({
                        ...containerData,
                        POL: e.target.value,
                      })
                    }
                    type="text"
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="pod">Port Of Discharge</Form.Label>
                  <Form.Control
                    id="pod"
                    name="pod"
                    value={containerData.POD}
                    onChange={(e) =>
                      setContainerData({
                        ...containerData,
                        POD: e.target.value,
                      })
                    }
                    type="text"
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="etd">ETD</Form.Label>
                  <DatePicker
                    className="form-control ms-auto"
                    wrapperClassName="datePicker"
                    id="etd"
                    selected={containerData.ETD}
                    onChange={(date) =>
                      setContainerData({
                        ...containerData,
                        ETD: date,
                      })
                    }
                    dateFormat={'dd/MM/yyyy'}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="eta">ETA</Form.Label>
                  <DatePicker
                    className="form-control ms-auto"
                    wrapperClassName="datePicker"
                    id="eta"
                    selected={containerData.ETA}
                    onChange={(date) =>
                      setContainerData({
                        ...containerData,
                        ETA: date,
                      })
                    }
                    dateFormat={'dd/MM/yyyy'}
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label htmlFor="status">Status</Form.Label>
                  <Form.Select
                    id="status"
                    name="status"
                    value={containerData.status}
                    onChange={(e) =>
                      setContainerData({
                        ...containerData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option hidden>Select Status</option>
                    <option value="Arrive">Arrive</option>
                    <option value="Depature">Depature</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Return">Return</option>
                    <option value="Gate in">Gate in</option>
                    <option value="Accident">Accident</option>
                  </Form.Select>
                </Form.Group>
                {(containerData.status === 'Pickup' ||
                  containerData.status === 'Accident') && (
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="remarkDesc">
                      Remark Description
                    </Form.Label>
                    <Form.Control as="textarea" id="remarkDesc" type="text" />
                  </Form.Group>
                )}
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

export default AddShipmentPage;
