import React from 'react';
import styled from 'styled-components';

const MetricCard = ({ title, value, percentageChange, chart, backgroundColor }) => {
  return (
    <Card backgroundColor={backgroundColor}>
      <CardHeader>
        <Value>{value}</Value>
        <PercentageChange>{percentageChange}</PercentageChange>
      </CardHeader>
      <Title>{title}</Title>
      <Chart>{chart}</Chart>
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
  font-size: 24px;
  font-weight: bold;
`;

const PercentageChange = styled.div`
  font-size: 14px;
  color: #fff;
  opacity: 0.8;
`;

const Title = styled.div`
  font-size: 14px;
  color: #fff;
  opacity: 0.7;
  margin-bottom: 10px;
`;

const Chart = styled.div`
  height: 50px;
`;

export default MetricCard;
