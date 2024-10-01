import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      {/* <LogoContainer>
        <Logo on>ADMIN</Logo>
      </LogoContainer> */}
      <NavSection>
             <NavItem onClick={() => navigate('/')}>
          <NavLink>
            <Icon>🏠︎</Icon> Home
          </NavLink>
        </NavItem>
        <NavItem onClick={() => navigate('/reviews')}>
          <NavLink>
            <Icon>✏️</Icon> Review
          </NavLink>
        </NavItem>
        <SectionTitle>EXTRAS</SectionTitle>
        <NavItem onClick={() => navigate('/login')}>
          <NavLink>
            <Icon>📄</Icon> Logout
          </NavLink>
        </NavItem>
      </NavSection>
    </SidebarContainer>
  );
};

// Styled Components

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2a2f37;
  color: #c2c7d0;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
`;

const NavSection = styled.div`
  flex-grow: 1;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  color: #8e94a1;
  margin-top: 20px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const NavItem = styled.div`
  margin-bottom: 10px;
`;

const NavLink = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  color: #c2c7d0;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #1e2229;
    color: #fff;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
  font-size: 18px;
`;

export default Sidebar;
