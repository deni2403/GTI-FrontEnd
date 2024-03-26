import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import FilterButton from '../../components/FilterButton';
import TableTitle from '../../components/tables/TableTitle';
import Pagenumber from '../../components/Pagenumber';
import ContainerData from '../../components/tables/ContainerData';
import { Link } from 'react-router-dom';
import { FaFileExport } from 'react-icons/fa6';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';

function ContainerInuse() {
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
                <TableTitle>Container in Use List</TableTitle>
              </Container>
              <hr />
              <Container
                fluid
                className="d-flex justify-content-between flex-wrap"
              >
                <SearchBar />
                <FilterButton>
                  <option value="" hidden>
                    Location
                  </option>
                  <option value="1">Medan</option>
                  <option value="2">Jakarta</option>
                  <option value="3">Makasar</option>
                  <option value="4">Surabaya</option>
                </FilterButton>
              </Container>
              <Container className="d-flex my-3">
                <Button
                  onClick={handleExportData}
                  variant="success"
                  className="export-button"
                >
                  <FaFileExport className="me-1" /> Export Data
                </Button>
              </Container>
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

export default ContainerInuse;
