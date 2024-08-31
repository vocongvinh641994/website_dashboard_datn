import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    navigate('/dashboard')
    console.log('Username:', username, 'Password:', password);
  };

  return (
    <Container>
      <LoginBox>
        <Title>User Login</Title>
        <Form onSubmit={handleLogin}>
          <InputWrapper>
            <Icon>👤</Icon>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Icon>🔒</Icon>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWrapper>
          <LoginButton type="submit">Đăng nhập</LoginButton>
        </Form>
        <Links>
          <ForgotLink href="#">Quên mật khẩu?</ForgotLink>
          <CreateAccountLink href="#">Tạo tài khoản →</CreateAccountLink>
        </Links>
      </LoginBox>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #1e90ff, #00bfff);
`;

const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 6px;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: none;
  flex: 1;
  padding: 10px;
`;

const LoginButton = styled.button`
  background: linear-gradient(to right, #1e90ff, #00bfff);
  border: none;
  padding: 12px;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background: linear-gradient(to right, #00bfff, #1e90ff);
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ForgotLink = styled.a`
  color: #888;
  font-size: 12px;
  margin-bottom: 10px;
  text-decoration: none;
`;

const CreateAccountLink = styled.a`
  color: #1e90ff;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default LoginPage;
