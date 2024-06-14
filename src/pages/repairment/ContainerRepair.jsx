import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import ButtonContainer from '../../components/ButtonContainer';
import RepairData from '../../components/tables/RepairData';
import TableTitle from '../../components/tables/TableTitle';
import PlaceHolder from '../../components/PlaceHolder';
import { Link, useSearchParams } from 'react-router-dom';
import { FaFileCirclePlus, FaFileExport } from 'react-icons/fa6';
import NotifToast from '../../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';
import {
  getAllRepairments,
  exportRepairmentsData,
} from '../../api/repairmentAPI';
import ReactPaginate from 'react-paginate';

function ContainerRepair() {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [repairments, setRepairments] = useState([]);
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
    const fetchRepairments = async () => {
      const data = await getAllRepairments(currentPage, searchQuery);
      setRepairments(data.repairs);
      setTotalPages(data.totalPage);
      setIsLoading(false);
    };

    fetchRepairments();
  }, [currentPage, searchParams]);

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    setSearchParams({ page: selected + 1 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ page: 1, search: searchQuery, status, location });
  };

  const handleExportData = async () => {
    const { error, data } = await exportRepairmentsData();

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
                <TableTitle>Container Repair List</TableTitle>
              </Container>
              <hr />
              <Container fluid className="d-flex">
                <SearchBar
                  keyword={searchQuery}
                  keywordHandler={setSearchQuery}
                  handleSubmit={handleSearch}
                />
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
              {isLoading ? (
                <PlaceHolder />
              ) : (
                <RepairData repairments={repairments} />
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

export default ContainerRepair;
