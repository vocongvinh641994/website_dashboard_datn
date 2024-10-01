import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MetricCard from '../meric-card';

const MericCardList = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');


  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1); // getMonth() returns 0-11, so add 1
    setYear(currentDate.getFullYear());
  }, []);


  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching for:', { month, year });
  };
  
  return (
    <>
   <FilterContainer>
        <InputField
          type="number"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <InputField
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </FilterContainer>

    <DashboardContainer>
      <MetricsRow>
        <MetricCard
          title="Positive"
          value="6,200"
          percentageChange="40.9% ↑"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#63BC46"
        />
        <MetricCard
          title="Neutral"
          value="1,000"
          percentageChange="84.7% ↑"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#fdcb6e"
        />
        <MetricCard
          title="Negative"
          value="1,400"
          percentageChange="-23.6% ↓"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#d63031"
        />
      </MetricsRow>
    </DashboardContainer>
    </>
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

// Styled Components
const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100px; /* You can adjust this width */
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export default MericCardList;
