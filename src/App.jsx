import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Navibar from './components/Navibar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ContainerPage from './pages/container/ContainerPage';
import AddContainerPage from './pages/container/AddContainerPage';
import ReadyDetailPage from './pages/container/ReadyDetailPage';
import InUseDetailPage from './pages/container/InUseDetailPage';
import ContainerRepair from './pages/repairment/ContainerRepair';
import AddRepairPage from './pages/repairment/AddRepairPage';
import RepairDetailPage from './pages/repairment/RepairDetailPage';
import ShipmentPage from './pages/shipment/ShipmentPage';
import AddShipmentPage from './pages/shipment/AddShipmentPage';
import ShipmentDetailPage from './pages/shipment/ShipmentDetailPage';
import SuperAdminPage from './pages/superAdmin/SuperAdminPage';
import AddUserPage from './pages/superAdmin/AddUserPage';
import UserDetailPage from './pages/superAdmin/UserDetailPage';


function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogout = () => {
    setIsLogin(false);
  };

  if (isLogin) {
    return (
      <Container fluid className="app-container d-flex ps-0">
        <Sidebar />
        <Container fluid className="wrapper">
          <Navibar handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/containers" element={<ContainerPage />} />
            <Route path="/containers/create" element={<AddContainerPage />} />
            <Route
              path="/containers/ready/detail"
              element={<ReadyDetailPage />}
            />
            <Route
              path="/containers/in-use/detail"
              element={<InUseDetailPage />}
            />
            <Route path="/repairments" element={<ContainerRepair />} />
            <Route
              path="/repairments/create"
              element={<AddRepairPage />}
            />
            <Route
              path="/repairments/detail"
              element={<RepairDetailPage />}
            />
            <Route path="/shipments" element={<ShipmentPage />} />
            <Route path="/shipments/create" element={<AddShipmentPage />} />
            <Route path="/shipments/detail" element={<ShipmentDetailPage />} />
            <Route path="/superadmin" element={<SuperAdminPage />} />
            <Route path="/superadmin/users/create" element={<AddUserPage />} />
            <Route
              path="/superadmin/users/detail"
              element={<UserDetailPage />}
            />
          </Routes>
        </Container>
      </Container>
    );
  }

  return <LoginPage />;
}

export default App;
