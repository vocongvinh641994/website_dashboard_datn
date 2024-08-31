import React, { useState } from 'react';
import styled from 'styled-components';

const TrafficStats = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Month');

  const timeframes = ['Day', 'Month', 'Year'];

  const chartData = (
    <svg width="100%" height="100" viewBox="0 0 100 100">
      <polyline
        fill="none"
        stroke="#007bff"
        strokeWidth="2"
        points="0,90 20,70 40,75 60,50 80,60 100,40"
      />
      <polyline
        fill="none"
        stroke="#6c5ce7"
        strokeWidth="2"
        points="0,70 20,50 40,55 60,30 80,40 100,20"
      />
      <polyline
        fill="none"
        stroke="#00b894"
        strokeWidth="2"
        points="0,50 20,30 40,35 60,10 80,20 100,5"
      />
    </svg>
  ); // Replace with an actual chart component

  const stats = [
    { label: 'Visits', value: '29,703 Users', change: 40, color: '#00b894' },
    { label: 'Unique', value: '24,093 Users', change: 20, color: '#6c5ce7' },
    { label: 'Pageviews', value: '78,706 Views', change: 60, color: '#fdcb6e' },
    { label: 'New Users', value: '22,123 Users', change: 80, color: '#d63031' },
    { label: 'Bounce Rate', value: '40.15%', change: -10, color: '#0984e3' },
  ];

  return (
    <Container>
      <Header>
        <Title>Traffic</Title>
        <Subtitle>January - July 2023</Subtitle>
        <TimeFrameSwitch>
          {timeframes.map((frame) => (
            <TimeFrameButton
              key={frame}
              active={selectedTimeframe === frame}
              onClick={() => setSelectedTimeframe(frame)}
            >
              {frame}
            </TimeFrameButton>
          ))}
        </TimeFrameSwitch>
      </Header>
      <ChartSection>
        <ChartArea>
          {chartData}
        </ChartArea>
        <StatsSection>
          {stats.map((stat, index) => (
            <StatItem key={index} color={stat.color}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
              <StatChange positive={stat.change > 0}>
                {stat.change > 0 ? `+${stat.change}%` : `${stat.change}%`}
              </StatChange>
            </StatItem>
          ))}
        </StatsSection>
      </ChartSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 20px;
  color: #ecf0f1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: #bdc3c7;
`;

const TimeFrameSwitch = styled.div`
  display: flex;
  gap: 10px;
`;

const TimeFrameButton = styled.button`
  background-color: ${({ active }) => (active ? '#2980b9' : '#34495e')};
  color: #ecf0f1;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const ChartSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ChartArea = styled.div`
  width: 60%;
  background: #34495e;
  border-radius: 8px;
  padding: 20px;
`;

const StatsSection = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #34495e;
  padding: 15px;
  border-radius: 8px;
  border-left: 5px solid ${({ color }) => color};
`;

const StatValue = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #ecf0f1;
`;

const StatLabel = styled.span`
  font-size: 14px;
  color: #bdc3c7;
`;

const StatChange = styled.span`
  font-size: 12px;
  color: ${({ positive }) => (positive ? '#2ecc71' : '#e74c3c')};
  margin-top: 5px;
`;

export default TrafficStats;
