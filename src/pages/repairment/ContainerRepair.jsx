import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import ButtonContainer from '../../components/ButtonContainer';
import RepairData from '../../components/tables/RepairData';
import TableTitle from '../../components/tables/TableTitle';
import { Link } from 'react-router-dom';
import { FaFileCirclePlus, FaFileExport } from 'react-icons/fa6';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';

function ContainerRepair() {
  const { user } = useSelector((state) => state.auth);


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
                <TableTitle>Container Repair List</TableTitle>
              </Container>
              <hr />
              <Container fluid className="d-flex">
                <SearchBar />
              </Container>
              <ButtonContainer>
                <Link to="/repairments/create">
                  <Button className="add-button mt-1">
                    <FaFileCirclePlus className="me-1" />
                    Add Data
                  </Button>
                </Link>
                {user.role !== 'Operasional' && (
                  <Button
                    onClick={handleExportData}
                    variant="success"
                    className="export-button mt-1"
                  >
                    <FaFileExport className="me-1" /> Export Data
                  </Button>
                )}
              </ButtonContainer>
              <RepairData />
            </Container>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Container>
  );
}

export default ContainerRepair;
