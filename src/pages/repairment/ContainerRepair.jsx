import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import ButtonContainer from '../../components/ButtonContainer';
import RepairData from '../../components/tables/RepairData';
import Pagenumber from '../../components/Pagenumber';
import TableTitle from '../../components/tables/TableTitle';
import { Link } from 'react-router-dom';
import { FaFileCirclePlus, FaFileExport } from 'react-icons/fa6';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import { profile } from '../../utils/DummyData';

function ContainerRepair() {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    setUserProfile(profile);
  }, []);

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
                  <Button className="add-button">
                    <FaFileCirclePlus className="me-1" />
                    Add Data
                  </Button>
                </Link>
                {userProfile.position !== 'Operasional' && (
                  <Button
                    onClick={handleExportData}
                    variant="success"
                    className="export-button"
                  >
                    <FaFileExport className="me-1" /> Export Data
                  </Button>
                )}
              </ButtonContainer>
              <RepairData />
              <Pagenumber />
            </Container>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Container>
  );
}

export default ContainerRepair;
