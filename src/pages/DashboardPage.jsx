import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import TableTitle from '../components/tables/TableTitle';
import BarChart from '../components/chart/BarChart';
import DoughnutChart from '../components/chart/DoughnutChart';
import { formattedDate, getGreetings } from '../utils/Utility';
import { getContainersTotal } from '../api/containerAPI';
import { getShipmentsTotal } from '../api/shipmentAPI';

function DashboardPage() {
  const { user } = useSelector((state) => state.auth);
  const [greetings, setGreetings] = useState('');
  const [totalShipmentData, setTotalShipmentData] = useState({});
  const [containerStatusData, setcontainerStatusData] = useState({});

  useEffect(() => {
    setGreetings(getGreetings());
  }, []);

  useEffect(() => {
    const fetchContainerData = async () => {
      try {
        const response = await getContainersTotal();
        const data = response.data;
        setcontainerStatusData(data);
      } catch (error) {
        console.error('Error fetching data containers:', error);
      }
    };

    const fetchShipmentData = async () => {
      try {
        const response = await getShipmentsTotal();
        const data = response.data;
        setTotalShipmentData(data);
      } catch (error) {
        console.error('Error fetching data shipments:', error);
      }
    };

    fetchContainerData();
    fetchShipmentData();
  }, []);

  return (
    <Container fluid className="content-wrapper">
      <Container fluid className="dashboard-page">
        <Row>
          <Col>
            <Container
              fluid
              className="dashboard-page__welcome shadow-sm d-flex justify-content-between"
            >
              <div className="welcome-word">
                <h1 className="welcome_title">
                  {greetings}, {user.name}
                </h1>
                <p className="welcome_text">{formattedDate}</p>
              </div>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Container className="chart_container shadow-sm">
              <Container fluid className="dashboard-chart">
                <TableTitle>Container Status</TableTitle>
                <Container
                  fluid
                  style={{ width: '100%', height: 280 }}
                  className="border"
                >
                  <DoughnutChart
                    initialData={{
                      labels: Object.keys(containerStatusData),
                      datasets: [
                        {
                          label: 'Container',
                          data: Object.values(containerStatusData),
                          backgroundColor: ['#2E8B57', '#012970', '#E58440'],
                          borderColor: ['white', 'white', 'white'],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </Container>
              </Container>
            </Container>
          </Col>
          <Col lg={6}>
            <Container className="chart_container shadow-sm">
              <Container fluid className="dashboard-chart mb-4">
                <TableTitle>Total Shipment</TableTitle>
                <Container
                  fluid
                  style={{ width: '100%', height: 280 }}
                  className="border"
                >
                  <BarChart
                    initialData={{
                      labels: Object.keys(totalShipmentData),
                      datasets: [
                        {
                          label: `Total Shipment ${new Date().toLocaleString(
                            'id-ID',
                            { month: 'long', year: 'numeric' },
                          )}`,
                          data: Object.values(totalShipmentData),
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </Container>
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default DashboardPage;
