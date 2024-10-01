import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MetricCard from '../meric-card';

const MericCardList = () => {
  const [reviews, setReviews] = useState([]);
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
    </DashboardContainer>

    <Table>
        <thead>
          <tr>
            <TH>ID</TH>
            <TH>Tên</TH>
            <TH>Đánh giá</TH>
            <TH>Tiêu đề</TH>
            <TH>Nội dung</TH>
            <TH>Ngày</TH>
            <TH>Sentiment</TH>
            <TH>Loại</TH>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            
            <TR key={index}>
              <TD>{review.id}</TD>
              <TD>{review.name}</TD>
              <TD>{review.rating}</TD>
              <TD>{review.title}</TD>
              <TD>{review.content}</TD>
              <TD>{isNewReview(review.createdAt) && <NewIcon>🆕</NewIcon>} {new Date(review.createdAt).toLocaleDateString()}</TD>
              <TD>{review.sentimentAssociated ? (review.sentimentAssociated.sentiment ?? 'Unknown') : 'Unknown'}</TD>
              <TD>{review.sentimentAssociated ? (review.sentimentAssociated.reviewsCategory ?? 'Unknown') : 'Unknown'}</TD>

            </TR>
          ))}
        </tbody>
      </Table>
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

export default MericCardList;
