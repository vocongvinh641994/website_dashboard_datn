import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MetricCard from '../meric-card';
import axios from 'axios';

const MericCardList = () => {
  const [error, setError] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [totalReviews, setTotalReviews] = useState([]);
  const [detailReviews, setdetailReviews] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1); // getMonth() returns 0-11, so add 1
    setYear(currentDate.getFullYear());
  }, []);

  useEffect(()=>{

  }, totalReviews);

  useEffect(()=>{

  }, detailReviews);


  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching for:', { month, year });
    fetchReviews(month, year)
  };

    // Simulating a list of heights for columns
    const columnData = [
      { label: 'Day 1', height: 300 },
      { label: 'Day 2', height: 200 },
      { label: 'Day 3', height: 400 },
      { label: 'Day 4', height: 150 },
      { label: 'Day 5', height: 350 },
      { label: 'Day 1', height: 300 },
      { label: 'Day 2', height: 200 },
      { label: 'Day 3', height: 400 },
      { label: 'Day 4', height: 150 },
      { label: 'Day 5', height: 350 },
      { label: 'Day 1', height: 300 },
      { label: 'Day 2', height: 200 },
      { label: 'Day 3', height: 400 },
      { label: 'Day 4', height: 150 },
      { label: 'Day 5', height: 350 },
      { label: 'Day 1', height: 300 },
      { label: 'Day 2', height: 200 },
      { label: 'Day 3', height: 400 },
      { label: 'Day 4', height: 150 },
      { label: 'Day 5', height: 350 },
      { label: 'Day 1', height: 300 },
      { label: 'Day 2', height: 200 },
      { label: 'Day 3', height: 400 },
      { label: 'Day 4', height: 150 },
      { label: 'Day 5', height: 350 },
      { label: 'Day 1', height: 300 },
      { label: 'Day 2', height: 200 },
      { label: 'Day 3', height: 400 },
      { label: 'Day 4', height: 150 },
      { label: 'Day 5', height: 350 },
    ];

    if (error) return <p>{error}</p>;

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

    const fetchReviews = async (month, year) => {
      try {
        console.log('Fetching reviews from: ', process.env.REACT_APP_BACK_END_HOST);
        const response = await axios.get(`/api/reviews-sentiments`, {
          baseURL: process.env.REACT_APP_BACK_END_HOST,
          params: { month: month, year: year },
        });
        setTotalReviews(response.data.reviews); 
      } catch (err) {
        // setError("1111"+ err);
        setError(err.response?.data?.message || 'Failed to fetch reviews');
      }
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
  align-items: flex-end; /* Align columns from the bottom */
  margin-top: 20px;
`;

const Column = styled.div`
  background-color: #007bff;
  color: white;
  flex: 1;
  width:8px;
  padding: 2px;
  margin-right: 4px;
  text-align: center;
  border-radius: 4px;
  height: ${({ height }) => `${height}px`}; // Dynamic height based on prop

  &:last-child {
    margin-right: 0;
  }
`;

export default MericCardList;
