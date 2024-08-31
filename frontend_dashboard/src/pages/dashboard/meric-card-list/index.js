import React from 'react';
import styled from 'styled-components';
import MetricCard from '../meric-card';

const MericCardList = () => {
  return (
    <DashboardContainer>
      <MetricsRow>
        <MetricCard
          title="Users"
          value="26K"
          percentageChange="-12.4% ↓"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#6c5ce7"
        />
        <MetricCard
          title="Income"
          value="$6,200"
          percentageChange="40.9% ↑"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#0984e3"
        />
        <MetricCard
          title="Conversion Rate"
          value="2.49%"
          percentageChange="84.7% ↑"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#fdcb6e"
        />
        <MetricCard
          title="Sessions"
          value="44K"
          percentageChange="-23.6% ↓"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#d63031"
        />
      </MetricsRow>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const MetricsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default MericCardList;
