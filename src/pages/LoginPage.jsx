import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Image, Spinner } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import NotifToast from '../utils/NotifiactionToast';
import { ToastContainer } from 'react-toastify';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { token, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const warning = localStorage.getItem('loginWarning');
    if (accessToken) {
      navigate('/dashboard');
    }

    if (warning) {
      NotifToast(warning, 'error');
      localStorage.removeItem('loginWarning');
    }

    if (isError) {
      NotifToast(message, 'error');
    }

    if (token || isSuccess) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [token, isSuccess, dispatch, navigate, isError, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Container
      fluid
      className="login-page d-flex justify-content-center align-items-center"
    >
      <Container className="login-page__section shadow">
        <Container fluid className="login-image d-flex justify-content-center">
          <Image src="/GTI_logo.png" fluid />
        </Container>
        <Container className="login-form">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="login-form__input">
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group
              className="login-form__input"
              style={{ position: 'relative', display: 'block' }}
            >
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <Button onClick={handleShowPassword} className="hidepw-btn">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </Form.Group>

            <Container
              fluid
              className="login-form__btn d-flex justify-content-center"
            >
              {isLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Button disabled={isLoading} variant="primary" type="submit">
                  Login
                </Button>
              )}
            </Container>
          </Form>
        </Container>
      </Container>
      <ToastContainer />
    </Container>
  );
}

export default LoginPage;
