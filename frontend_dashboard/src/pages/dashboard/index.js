import React from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar';
import TopNav from './topnav';
import MericCardList from './meric-card-list';
import { Outlet } from 'react-router-dom';
const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Dashboard' },
  ];
const Dashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <TopNav />  
        <ContentContainer>
          <Outlet /> {/* This is where the routed content will be displayed */}
        </ContentContainer>
      </MainContent>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
`;

const BreadScumbContainer = styled.div`
    padding-top:12px;
    padding-bottom:12px;
`;

const MainContent = styled.div`
  width: calc(100% - 250px);
  padding: 20px;
  background-color: #f4f7f6;
`;
const ContentContainer = styled.div`
  padding: 20px;
  background-color: #f4f7f6;
  flex: 1;
`;

export default Dashboard;
