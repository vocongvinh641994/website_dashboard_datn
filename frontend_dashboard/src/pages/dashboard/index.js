import React from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar';
import TopNav from './topnav';
import MericCardList from './meric-card-list';
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
        <MericCardList />
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

export default Dashboard;
