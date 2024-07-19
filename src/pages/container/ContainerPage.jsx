import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import ButtonContainer from '../../components/ButtonContainer';
import TableTitle from '../../components/tables/TableTitle';
import ContainerData from '../../components/tables/ContainerData';
import PlaceHolder from '../../components/PlaceHolder';
import { Link, useSearchParams } from 'react-router-dom';
import { FaFileCirclePlus, FaFileExport } from 'react-icons/fa6';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import { FaFilter } from 'react-icons/fa';
import {
  getAllContainers,
  exportContainerData,
  getContainerLocation,
} from '../../api/containerAPI';
import ReactPaginate from 'react-paginate';

function ContainerPage() {
  const { user } = useSelector((state) => state.auth);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [containers, setContainers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams('');
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || 1),
  );

  useEffect(() => {
    const params = {
      page: currentPage,
      ...(searchQuery && { search: searchQuery }),
    };
    setSearchParams(params);

    const fetchLocation = async () => {
      const data = await getContainerLocation();
      setLocations(data.location);
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchContainers = async () => {
      setIsLoading(true);
      const data = await getAllContainers(
        currentPage,
        searchQuery,
        status,
        location,
      );
      setContainers(data.containers);
      setTotalPages(data.totalPage);
      setIsLoading(false);
    };

    fetchContainers();
  }, [currentPage, searchParams]);

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    const params = {
      page: selected + 1,
      ...(searchQuery && { search: searchQuery }),
      ...(status && { status }),
      ...(location && { location }),
    };

    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newPage = 1;
    const params = {
      page: newPage,
      search: searchQuery,
      ...(status && { status }),
      ...(location && { location }),
    };

    setCurrentPage(newPage);
    setSearchParams(params);
  };

  //Filter
  const handleShowFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
    const newPage = 1;
    const params = {
      page: newPage,
      ...(status && { status }),
      ...(location && { location }),
    };

    setCurrentPage(newPage);
    setSearchParams(params);
    setShowFilter(false);
  };

  const resetFilter = () => {
    setStatus('');
    setLocation('');
  };
  //End Filter

  const handleExportData = async () => {
    const { error, data } = await exportContainerData(status, location);

    if (!error) {
      NotifToast(data, 'success');
    } else {
      NotifToast(data, 'error');
    }
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
                <SearchBar
                  keyword={searchQuery}
                  keywordHandler={setSearchQuery}
                  handleSubmit={handleSearch}
                />
                <Container className="filter d-flex justify-content-end">
                  <Button onClick={handleShowFilter} className="filter-btn">
                    <FaFilter className="me-1" />
                    Filter
                  </Button>
                  {showFilter && (
                    <div className="filter-options rounded border shadow">
                      <h6 className="title">Filter Options</h6>
                      <hr />
                      <Form
                        className="filter-options__select"
                        onSubmit={handleApplyFilter}
                      >
                        <h6 className="filter-options__title">Status</h6>
                        <Form.Select
                          value={status || ''}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option hidden>Status</option>
                          <option value="Ready">Ready</option>
                          <option value="In-Use">In Use</option>
                        </Form.Select>
                        <h6 className="filter-options__title">Location</h6>
                        <Form.Select
                          value={location || ''}
                          onChange={(e) => setLocation(e.target.value)}
                        >
                          <option hidden>Location</option>
                          {locations &&
                            locations.map((loc) => (
                              <option key={loc} value={loc}>
                                {loc}
                              </option>
                            ))}
                        </Form.Select>
                        <div className="filter-actions d-flex justify-content-between">
                          <Button onClick={resetFilter} className="reset-btn">
                            Reset
                          </Button>
                          <Button type="submit" className="apply-btn">
                            Apply
                          </Button>
                        </div>
                      </Form>
                    </div>
                  )}
                </Container>
              </Container>
              {user.role !== 'Operasional' && (
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
              {isLoading ? (
                <PlaceHolder />
              ) : (
                <ContainerData containers={containers} />
              )}
              {totalPages > 0 && (
                <ReactPaginate
                  key={currentPage}
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
        <ToastContainer />
      </Container>
    </Container>
  );
}

export default ContainerPage;
