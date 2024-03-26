import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import TableTitle from '../../components/tables/TableTitle';
import UserTable from '../../components/tables/UserTable';
import ActivityTable from '../../components/tables/ActivityTable';
import Pagenumber from '../../components/Pagenumber';
import { BsFillPersonPlusFill, BsInfoCircle } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';

function SuperAdminPage() {
  return (
    <Container fluid className="content-wrapper">
      <Container fluid className="superAdmin-page">
        <Row>
          <Col lg={6}>
            <Container fluid className="superAdmin-page__users shadow-sm">
              <TableTitle>All Users</TableTitle>
              <hr />
              <Container className="d-flex">
                <Link to="/superadmin/users/create">
                  <Button
                    variant="primary"
                    className="add-button d-flex align-items-center"
                  >
                    <BsFillPersonPlusFill className="me-2" />
                    <span>Add User</span>
                  </Button>
                </Link>
              </Container>
              <UserTable />
              <Pagenumber />
            </Container>
          </Col>
          <Col lg={6}>
            <Container fluid className="superAdmin-page__activity shadow-sm">
              <TableTitle>Recent Activity</TableTitle>
              <hr />
              <ActivityTable />
              <Pagenumber />
            </Container>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Container>
  );
}

export default SuperAdminPage;
