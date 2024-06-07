import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdAdminPanelSettings } from 'react-icons/md';
import { GiCargoCrate, GiCargoShip, GiAutoRepair } from 'react-icons/gi';

function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const segment = pathSegments[0];

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
        <Link to="/dashboard">
          <ListGroup.Item className={segment === 'dashboard' ? 'selected' : ''}>
            <MdDashboard />
            <span className="d-none d-sm-inline">Dashboard</span>
          </ListGroup.Item>
        </Link>
        <Link to="/shipments">
          <ListGroup.Item className={segment === 'shipments' ? 'selected' : ''}>
            <GiCargoShip />
            <span className="d-none d-sm-inline">Shipment</span>
          </ListGroup.Item>
        </Link>
        <Link to="/containers">
          <ListGroup.Item
            className={segment === 'containers' ? 'selected' : ''}
          >
            <GiCargoCrate />
            <span className="d-none d-sm-inline">Container</span>
          </ListGroup.Item>
        </Link>
        <Link to="/repairments">
          <ListGroup.Item
            className={segment === 'repairments' ? 'selected' : ''}
          >
            <GiAutoRepair />
            <span className="d-none d-sm-inline">Repairment</span>
          </ListGroup.Item>
        </Link>
        {user.role == 'Super Admin' && (
          <Link to="/superadmin">
            <ListGroup.Item
              className={segment === 'superadmin' ? 'selected' : ''}
            >
              <MdAdminPanelSettings />
              <span className="d-none d-sm-inline text-center">
                Super Admin
              </span>
            </ListGroup.Item>
          </Link>
        )}
      </ListGroup>
    </aside>
  );
}

export default Sidebar;
