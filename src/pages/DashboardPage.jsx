import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import TableTitle from '../components/tables/TableTitle';
import BarChart from '../components/chart/BarChart';
import DoughnutChart from '../components/chart/DoughnutChart';
import { shipmentTotal, containerStatus } from '../utils/DummyData';

function DashboardPage() {
  const [totalShipmentData, setTotalShipmentData] = useState(shipmentTotal);
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const [containerStatusData, setcontainerStatusData] =
    useState(containerStatus);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://example.com/api/shipment-data');
  //       const result = await response.json();
  //       setTotalShipmentData(result);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();

  //   // Set interval untuk memperbarui data setiap 5 menit (misalnya)
  //   const intervalId = setInterval(() => {
  //     fetchData();
  //   }, 300000); // 300000 milidetik = 5 menit
  //   // Membersihkan interval saat komponen di-unmount
  //   return () => clearInterval(intervalId);
  // }, []);

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
                <h1 className="welcome_title">Good Afternoon, Vinnie Felim</h1>
                <p className="welcome_text">{formattedDate}</p>
              </div>
              {/* <div className="welcome-image">
                <img
                  src="/dashboard-welcome.jpg"
                  alt="Welcome"
                  className="img-fluid"
                />
              </div> */}
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
              <Container fluid className="dashboard-chart">
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
                          label: `Total Shipment ${new Date().getFullYear()}`,
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
