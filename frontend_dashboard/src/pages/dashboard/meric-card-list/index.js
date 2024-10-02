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

    // Simulating a list of heights for columns
    const columnData = [
      { label: 'Column 1', height: 300 },
      { label: 'Column 2', height: 200 },
      { label: 'Column 3', height: 400 },
      { label: 'Column 4', height: 150 },
      { label: 'Column 5', height: 350 },
    ];

    const DynamicColumns = ({ columns }) => {
      return (
        <ColumnsContainer>
          {columns.map((column, index) => (
            <Column key={index} height={column.height}>
              {column.label}
            </Column>
          ))}
        </ColumnsContainer>
      );
    };
  
  return (
    <>
   <FilterContainer>
    <div style={{marginRight:8}}>Month:</div> 
        <InputField
          type="number"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <div style={{marginRight:8}}>Year:</div> 
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
          backgroundColor="#f0de89"
        />
        <MetricCard
          title="Negative"
          value="1,400"
          percentageChange="-23.6% ↓"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#ffaaa5"
        />

      <MetricCard
          title="Unknown"
          value="1,400"
          percentageChange="-23.6% ↓"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#D2C0B0"
        />
      </MetricsRow>

        {/* 5 Columns Section with Dynamic Heights */}
        <DynamicColumns columns={columnData} />

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
  justify-content: center; // Centers content horizontally
  align-items: center; // Optional: centers content vertically within the container (if needed)
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


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TH = styled.th`
  text-align: left;
  padding: 12px 15px;
  font-size: 14px;
  color: #555;
`;

const TR = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;
// New Styled Components for 5 Columns
const ColumnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Column = styled.div`
  background-color: #007bff;
  color: white;
  flex: 1;
  padding: 20px;
  margin-right: 10px;
  text-align: center;
  border-radius: 4px;
  height: ${({ height }) => `${height}px`}; // Dynamic height based on prop

  &:last-child {
    margin-right: 0;
  }
`;

export default MericCardList;
