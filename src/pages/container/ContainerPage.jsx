import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import ButtonContainer from '../../components/ButtonContainer';
import TableTitle from '../../components/tables/TableTitle';
import Pagenumber from '../../components/Pagenumber';
import ContainerData from '../../components/tables/ContainerData';
import { Link } from 'react-router-dom';
import { FaFileCirclePlus, FaFileExport } from 'react-icons/fa6';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import { FaFilter } from 'react-icons/fa';
import { profile } from '../../utils/DummyData';

function ContainerPage() {
  const [userProfile, setUserProfile] = useState({});
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setUserProfile(profile);
  }, []);

  const handleShowFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const handleExportData = () => {
    NotifToast('Data successfully exported!', 'success');
  };

  return (
    <Container fluid className="content-wrapper">
      <Container fluid className="page-container">
        <Row>
          <Col>
            <Container fluid className="page-container__table shadow-sm">
              <Container>
                <TableTitle>Container List</TableTitle>
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
                      <h6 className="filter-options__title">Status</h6>
                      <Form className="filter-options__select">
                        <Form.Select>
                          <option value="" hidden>
                            Select Status
                          </option>
                          <option value="1">Ready</option>
                          <option value="2">In Use</option>
                        </Form.Select>
                      </Form>
                      <h6 className="filter-options__title">Location</h6>
                      <Form className="filter-options__select">
                        <Form.Select>
                          <option value="" hidden>
                            Select Location
                          </option>
                          <option value="1">Medan</option>
                          <option value="2">Jakarta</option>
                          <option value="3">Makasar</option>
                          <option value="4">Surabaya</option>
                        </Form.Select>
                      </Form>
                      <div className="filter-actions d-flex justify-content-end">
                        <Button className="apply-btn">Apply</Button>
                      </div>
                    </div>
                  )}
                </Container>
              </Container>
              {userProfile.position !== 'Operasional' && (
                <ButtonContainer>
                  <Link to="/containers/create">
                    <Button className="add-button">
                      <FaFileCirclePlus className="me-1" />
                      Add Data
                    </Button>
                  </Link>
                  <Button
                    onClick={handleExportData}
                    variant="success"
                    className="export-button"
                  >
                    <FaFileExport className="me-1" /> Export Data
                  </Button>
                </ButtonContainer>
              )}
              <ContainerData />
              <Pagenumber />
            </Container>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Container>
  );
}

export default ContainerPage;
