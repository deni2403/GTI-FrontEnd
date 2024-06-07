import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import ButtonContainer from '../../components/ButtonContainer';
import ShipmentData from '../../components/tables/ShipmentData';
import TableTitle from '../../components/tables/TableTitle';
import { Link } from 'react-router-dom';
import { FaFileCirclePlus, FaFileExport } from 'react-icons/fa6';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import { FaFilter } from 'react-icons/fa';
import DatePicker from 'react-datepicker';

function ShipmentPage() {
  const { user } = useSelector((state) => state.auth);
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleShowFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const handleExportData = () => {
    //process export disini
    NotifToast('Data successfully exported!', 'success');
  };

  return (
    <Container fluid className="content-wrapper">
      <Container fluid className="page-container">
        <Row>
          <Col>
            <Container fluid className="page-container__table shadow-sm">
              <Container>
                <TableTitle>Shipment List</TableTitle>
              </Container>
              <hr />
              <Container
                fluid
                className="d-flex justify-content-between align-items-center"
              >
                <SearchBar />
                <Container className="filter d-flex justify-content-end">
                  <Button onClick={handleShowFilter} className="filter-btn">
                    <FaFilter className="me-1" />
                    Filter
                  </Button>
                  {showFilter && (
                    <div className="filter-options rounded border shadow">
                      <h6 className="title">Filter Options</h6>
                      <hr />
                      <h6 className="filter-options__title">Date</h6>
                      <Form className="filter-options__select">
                        <DatePicker
                          className="form-control"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat={'dd/MM/yyyy'}
                        />
                      </Form>
                      <div className="filter-actions d-flex justify-content-end">
                        <Button className="apply-btn">Apply</Button>
                      </div>
                    </div>
                  )}
                </Container>
              </Container>
              {user.role !== 'Operasional' && (
                <ButtonContainer>
                  <Link to="/shipments/create">
                    <Button className="add-button">
                      <FaFileCirclePlus className="me-1" />
                      <span>Add Data</span>
                    </Button>
                  </Link>
                  <Button
                    onClick={handleExportData}
                    variant="success"
                    className="export-button"
                  >
                    <FaFileExport className="me-1" />
                    <span>Export Data</span>
                  </Button>
                </ButtonContainer>
              )}
              <ShipmentData />
            </Container>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Container>
  );
}

export default ShipmentPage;
