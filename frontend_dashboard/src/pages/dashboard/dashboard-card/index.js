import React from 'react';
import styled from 'styled-components';

const TopNav = () => {
  return (
    <NavContainer>
      <MenuIcon>☰</MenuIcon>
      <SearchBar placeholder="Search..." />
      <RightNav>
        <LangIcon>🌐</LangIcon>
        <NotificationIcon>🔔import React from 'react';
import styled from 'styled-components';

const OverviewCards = () => {
  const cards = [
    { title: 'Invoices Awaiting Payment', value: '45/76', description: 'Invoices Awaiting', amount: '$5,569 (65%)' },
    { title: 'Converted Leads', value: '48/86', description: 'Converted Leads', amount: '52 Completed (63%)' },
    { title: 'Projects in Progress', value: '16/20', description: 'Projects in Progress', amount: '16 Completed' },
    // Add more cards as necessary
  ];

  return (
    <CardsContainer>
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader>{card.value}</CardHeader>
          <CardBody>
            <h4>{card.title}</h4>
            <p>{card.description}</p>
            <span>{card.amount}</span>
          </CardBody>
        </Card>
      ))}
    </CardsContainer>
  );
};

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Card = styled.div`
  width: 30%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const CardBody = styled.div`
  margin-top: 10px;
  h4 {
    margin-bottom: 5px;
  }
  p {
    color: #888;
  }
  span {
    font-weight: bold;
    color: #007bff;
  }
`;

export default OverviewCards;
</NotificationIcon>
        <ProfileIcon>👤</ProfileIcon>
      </RightNav>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e7e7e7;
`;

const MenuIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const SearchBar = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
`;

const RightNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LangIcon = styled.div``;

const NotificationIcon = styled.div``;

const ProfileIcon = styled.div``;

export default TopNav;
