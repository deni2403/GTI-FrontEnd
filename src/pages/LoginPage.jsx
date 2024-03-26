import React, { useState } from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      fluid
      className="login-page d-flex justify-content-center align-items-center"
    >
      <Container className="login-page__section shadow">
        <Container fluid className="login-image d-flex justify-content-center">
          <Image src="GTI_logo.png" fluid className="" />
        </Container>
        <Container className="login-form">
          <Form>
            <Form.Group className="login-form__input">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group
              className="login-form__input"
              style={{ position: 'relative', display: 'block' }}
            >
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
              />
              <Button onClick={handleShowPassword} className="hidepw-btn">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </Button>
            </Form.Group>

            <Container
              fluid
              className="login-form__btn d-flex justify-content-center"
            >
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Container>
          </Form>
        </Container>
      </Container>
    </Container>
  );
}

export default LoginPage;
