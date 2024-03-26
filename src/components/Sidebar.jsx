import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdDashboard, MdAdminPanelSettings } from 'react-icons/md';
import { GiCargoCrate, GiCargoShip, GiAutoRepair } from 'react-icons/gi';
import { profile } from '../utils/DummyData';

function Sidebar() {
  const [userProfile, setUserProfile] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setUserProfile(profile);
  }, []);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <aside className="sidebar shadow">
      <div className="sidebar-header border-bottom shadow-sm d-none d-lg-flex align-items-center justify-content-center flex-wrap">
        <div className="sidebar-header__company d-flex justify-content-evenly align-items-center">
          <div className="sidebar-header__company-logo ms-2">
            <img src="/GTI_logo.png" className="img-fluid" alt="GTI Logo" />
          </div>
          <div className="sidebar-header__company-name">
            <h6>Giant</h6>
            <h6>Transporter</h6>
            <h6>Indonesia</h6>
          </div>
        </div>
      </div>
      <ListGroup>
        <span className="menu-info">Menu</span>
        <hr className="menu-divider" />
        <Link to="/" onClick={() => handleItemClick(0)}>
          <ListGroup.Item className={selectedItem === 0 ? 'selected' : ''}>
            <MdDashboard />
            <span className="d-none d-sm-inline">Dashboard</span>
          </ListGroup.Item>
        </Link>
        <Link to="/shipments" onClick={() => handleItemClick(1)}>
          <ListGroup.Item className={selectedItem === 1 ? 'selected' : ''}>
            <GiCargoShip />
            <span className="d-none d-sm-inline">Shipment</span>
          </ListGroup.Item>
        </Link>
        <Link to="/containers" onClick={() => handleItemClick(2)}>
          <ListGroup.Item className={selectedItem === 2 ? 'selected' : ''}>
            <GiCargoCrate />
            <span className="d-none d-sm-inline">Container</span>
          </ListGroup.Item>
        </Link>
        <Link to="/repairments" onClick={() => handleItemClick(3)}>
          <ListGroup.Item className={selectedItem === 3 ? 'selected' : ''}>
            <GiAutoRepair />
            <span className="d-none d-sm-inline">Repairment</span>
          </ListGroup.Item>
        </Link>
        {userProfile.position == 'Super Admin' && (
          <Link to="/superadmin" onClick={() => handleItemClick(4)}>
            <ListGroup.Item className={selectedItem === 4 ? 'selected' : ''}>
              <MdAdminPanelSettings />
              <span className="d-none d-sm-inline text-center">Super Admin</span>
            </ListGroup.Item>
          </Link>
        )}
      </ListGroup>
    </aside>
  );
}

export default Sidebar;
