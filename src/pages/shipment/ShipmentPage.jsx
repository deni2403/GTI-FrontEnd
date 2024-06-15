import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import ButtonContainer from '../../components/ButtonContainer';
import ShipmentData from '../../components/tables/ShipmentData';
import TableTitle from '../../components/tables/TableTitle';
import PlaceHolder from '../../components/PlaceHolder';
import { Link, useSearchParams } from 'react-router-dom';
import { FaFileCirclePlus, FaFileExport } from 'react-icons/fa6';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import { FaFilter } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { getAllShipments, exportShipmentData } from '../../api/shipmentAPI';
import { handleDateFormat } from '../../utils/Utility';
import ReactPaginate from 'react-paginate';

function ShipmentPage() {
  const { user } = useSelector((state) => state.auth);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
    const fetchShipments = async () => {
      const data = await getAllShipments(
        currentPage,
        searchQuery,
        startDate,
        endDate,
      );
      setShipments(data.shipment);
      setTotalPages(data.totalPage);
      setIsLoading(false);
    };

    fetchShipments();
  }, [currentPage, searchParams]);

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    const params = {
      page: selected + 1,
      ...(searchQuery && { search: searchQuery }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };

    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {
      page: 1,
      search: searchQuery,
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };

    setSearchParams(params);
  };

  //Filter
  const handleShowFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
    const params = {
      page: 1,
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };
    setSearchParams(params);
    setCurrentPage(1);
    setShowFilter(false);
  };

  const resetFilter = () => {
    setStartDate('');
    setEndDate('');
  };
  // End Filter

  const handleExportData = async () => {
    const { error, data } = await exportShipmentData(startDate, endDate);

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
            <Container fluid className="page-container__table-shipment shadow-sm">
              <Container>
                <TableTitle>Shipment List</TableTitle>
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
                      <h6 className="title">Filter Options (ETD)</h6>
                      <hr />
                      <Form
                        className="filter-options__select"
                        onSubmit={handleApplyFilter}
                      >
                        <h6 className="filter-options__title">From</h6>
                        <DatePicker
                          className="form-control"
                          selected={startDate || new Date()}
                          onChange={(date) =>
                            setStartDate(handleDateFormat(date))
                          }
                          dateFormat={'dd/MM/yyyy'}
                        />
                        <h6 className="filter-options__title">To</h6>
                        <DatePicker
                          className="form-control"
                          selected={endDate || new Date()}
                          onChange={(date) =>
                            setEndDate(handleDateFormat(date))
                          }
                          dateFormat={'dd/MM/yyyy'}
                        />
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
              {isLoading ? (
                <PlaceHolder />
              ) : (
                <ShipmentData shipments={shipments} />
              )}
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
        <ToastContainer />
      </Container>
    </Container>
  );
}

export default ShipmentPage;
