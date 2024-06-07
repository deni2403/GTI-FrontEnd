import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TableTitle from '../../components/tables/TableTitle';
import SearchBar from '../../components/SearchBar';
import UserTable from '../../components/tables/UserTable';
import ActivityTable from '../../components/tables/ActivityTable';
import Pagenumber from '../../components/Pagenumber';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';

function SuperAdminPage() {
  return (
    <Container fluid className="content-wrapper">
      <Container fluid className="superAdmin-page">
        <Row>
          <Col>
            <Container fluid className="superAdmin-page__activity shadow-sm">
              <TableTitle>Activity Log</TableTitle>
              <hr />
              <Container className="d-flex">
                <SearchBar placeholder="search activity.." />
              </Container>
              <ActivityTable />
              <Pagenumber />
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container fluid className="superAdmin-page__users shadow-sm">
              <TableTitle>All Users</TableTitle>
              <hr />
              <Container className="d-flex">
                <Link to="/superadmin/users/create">
                  <Button
                    variant="primary"
                    className="add-button mt-1 d-flex align-items-center"
                  >
                    <BsFillPersonPlusFill className="me-2" />
                    <span>Add User</span>
                  </Button>
                </Link>
              </Container>
              <UserTable />
            </Container>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Container>
  );
}

export default SuperAdminPage;
