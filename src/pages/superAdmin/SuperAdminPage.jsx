import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams, Navigate, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TableTitle from '../../components/tables/TableTitle';
import SearchBar from '../../components/SearchBar';
import UserTable from '../../components/tables/UserTable';
import ActivityTable from '../../components/tables/ActivityTable';
import PlaceHolder from '../../components/PlaceHolder';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import { getLogs } from '../../api/logAPI';
import ReactPaginate from 'react-paginate';

function SuperAdminPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams('');
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || 1),
  );

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchLogs = async () => {
      const data = await getLogs(currentPage, searchQuery);
      setLogs(data.logs);
      setTotalPages(data.totalPage);
      setIsLoading(false);
    };

    fetchLogs();
  }, [currentPage, searchParams]);

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    const params = {
      page: selected + 1,
      ...(searchQuery && { search: searchQuery }),
    };

    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ page: 1, search: searchQuery });
  };

  if (user.role !== 'Super Admin') {
    navigate('/dashboard');
  }

  
  return (
    <Container fluid className="content-wrapper">
      <Container fluid className="superAdmin-page">
        <Row>
          <Col>
            <Container fluid className="superAdmin-page__activity shadow-sm">
              <TableTitle>Activity Log</TableTitle>
              <hr />
              <Container className="d-flex">
                <SearchBar
                  placeholder="search activity.."
                  keyword={searchQuery}
                  keywordHandler={setSearchQuery}
                  handleSubmit={handleSearch}
                />
              </Container>
              {isLoading ? <PlaceHolder /> : <ActivityTable logs={logs} />}
              {totalPages > 0 && (
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  initialPage={currentPage - 1}
                  pageCount={totalPages}
                  onPageChange={onPageChange}
                  breakLinkClassName={'page-link'}
                  breakClassName={'page-item'}
                  containerClassName={'pagination justify-content-center'}
                  pageLinkClassName={'page-link'}
                  previousLinkClassName={'page-link'}
                  nextLinkClassName={'page-link'}
                  activeLinkClassName={'page-item active'}
                  disabledLinkClassName={'page-item disabled'}
                />
              )}
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
