import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const didLogout = () => {
    navigate("/");
  }
  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo>ADMIN </Logo>
      </LogoContainer>
      <NavSection>
        {/* <NavItem>
          <NavLink>
            <Icon>🏠</Icon> Dashboard <NewBadge>NEW</NewBadge>
          </NavLink>
        </NavItem> */}
        {/* <SectionTitle>THEME</SectionTitle>
        <NavItem>
          <NavLink>
            <Icon>🎨</Icon> Colors
          </NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink>
            <Icon>✏️</Icon> Đánh giá
          </NavLink>
        </NavItem>
        {/* <SectionTitle>COMPONENTS</SectionTitle>
        <NavItem>
          <NavLink>
            <Icon>🛠️</Icon> Base
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Icon>🚀</Icon> Buttons
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Icon>📊</Icon> Charts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Icon>📝</Icon> Forms
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Icon>⭐</Icon> Icons
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Icon>🔔</Icon> Notifications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Icon>📦</Icon> Widgets <NewBadge>NEW</NewBadge>
          </NavLink>
        </NavItem> */}
        <SectionTitle>EXTRAS</SectionTitle>
        <NavItem onClick={didLogout}>
          <NavLink>
            <Icon>📄</Icon> Đăng xuất
          </NavLink>
        </NavItem>
       
      </NavSection>
      <Footer>
        <FooterLink href="#"></FooterLink>
      </Footer>
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

const NewBadge = styled.span`
  background-color: #00bfff;
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  margin-left: auto;
  border-radius: 12px;
`;

const Footer = styled.div`
  margin-top: 20px;
`;

const FooterLink = styled.a`
  color: #00bfff;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

export default Sidebar;
