import React from 'react';
import styled from 'styled-components';

const MetricCard = ({ title, value, percentageChange, chart, backgroundColor, onClick }) => {
  return (
    <Card backgroundColor={backgroundColor}  onClick={onClick}>
      <CardHeader>
        <Value>{value}</Value>
        <PercentageChange>{percentageChange}</PercentageChange>
      </CardHeader>
      <Title>{title}</Title>
    </Card>
  );
};

// Styled Components
const Card = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  border-radius: 8px;
  padding: 20px;
  color: #fff;
  flex: 1;
  margin-right: 15px;
  min-width: 180px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Value = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const PercentageChange = styled.div`
  font-size: 20px;
  color: #fff;
  opacity: 0.8;
`;

const Title = styled.div`
  font-size: 20px;
  color: #fff;
  opacity: 0.7;
`;

export default MetricCard;
