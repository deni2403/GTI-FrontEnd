import React, { useState, useEffect } from 'react';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';
import { profile } from '../utils/DummyData';
import PropType from 'prop-types';

function Navibar({ handleLogout }) {
  const [userProfile, setUserProfile] = useState({});
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  useEffect(() => {
    setUserProfile(profile);
  }, []);

  const showProfile = () => {
    setShowProfileInfo((prevState) => !prevState);
  };

  return (
    <Navbar className="border-bottom shadow-sm rounded">
      <button
        className="toggler-button me-auto"
        onClick={() => {
          document.querySelector('.sidebar').classList.toggle('collapsed');
          document.querySelector('.wrapper').classList.toggle('collapsed');
        }}
      >
        <RxHamburgerMenu />
      </button>
      <Container className="brand-wrapper d-lg-none">
        <Navbar.Brand
          className="brand-logo border shadow-sm rounded d-flex align-items-center"
          href="#"
        >
          <img alt="GTI Logo" src="/GTI_logo.png" className="img-fluid" />
          <span className="brand-name">GTI</span>
        </Navbar.Brand>
      </Container>
      <Container className="user-profile d-flex justify-content-end">
        <div
          className="user-profile__image rounded-circle shadow-sm"
          onClick={showProfile}
        >
          <img
            src={userProfile.image}
            alt={userProfile.name}
            className="img-fluid rounded-circle"
          />
          {showProfileInfo && (
            <div className="user-profile__information rounded border shadow-sm">
              <div className="user-information d-flex justify-content-between">
                <div className="user-image">
                  <img
                    src={userProfile.image}
                    alt={userProfile.name}
                    className="img-fluid rounded"
                  />
                </div>
                <div className="user-account">
                  <h6 className="user-name">{userProfile.name}</h6>
                  <h6 className="user-email">{userProfile.email}</h6>
                </div>
              </div>
              <hr />
              <div className="user-action">
                <div className="user-role d-flex justify-content-between align-items-center">
                  <h6 className="title-text">Role</h6>
                  <h6 className="role-title">{userProfile.position}</h6>
                </div>
                <div className="user-role d-flex justify-content-between align-items-center">
                  <h6 className="title-text">Location</h6>
                  <h6 className="role-title">{userProfile.location}</h6>
                </div>
                <button
                  onClick={handleLogout}
                  className="logout-btn d-flex align-items-center"
                >
                  Log Out <MdLogout className="ms-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

Navibar.propTypes = {
  handleLogout: PropType.func.isRequired,
};

export default Navibar;
