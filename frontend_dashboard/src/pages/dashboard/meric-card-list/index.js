import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MetricCard from '../meric-card';
import axios from 'axios';
import { REVIEW_TYPE } from '../../../utils/review-utils';

const MericCardList = () => {
  const [error, setError] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [columnData, setColumnData] = useState([]) 
  // Initialize four lists
  const totalReviews = [];
  const sentimentUnknown = [];
  const sentimentPositive = [];
  const sentimentNeutral = [];
  const sentimentNegative = [];

  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1); // getMonth() returns 0-11, so add 1
    setYear(currentDate.getFullYear());
  }, []);

  const divideReviews = (reviews)=>{
// Divide the reviews into four categories
  reviews.forEach(review => {
  const sentiment = review.sentimentAssociated;
  
  if (!sentiment) {
    sentimentUnknown.push(review);
  } else {
    const sentimentType = sentiment.sentiment;
    if (sentimentType === REVIEW_TYPE.POSITIVE) {
      sentimentPositive.push(review);
    } else if (sentimentType === REVIEW_TYPE.NEUTRAL) {
      sentimentNeutral.push(review);
    } else if (sentimentType === REVIEW_TYPE.NEGATIVE) {
      sentimentNegative.push(review);
    }
  }

  // Output the four lists
console.log("Sentiment Null Reviews:", sentimentUnknown);
console.log("Positive Sentiment Reviews:", sentimentPositive);
console.log("Neutral Sentiment Reviews:", sentimentNeutral);
console.log("Negative Sentiment Reviews:", sentimentNegative);


})};

  const handleSearch = () => {
    fetchReviews(month, year)
  };

  const getDetailByType = (reviews, year, month) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(reviews);
    // Function to get the total days in the given month
    const getDaysInMonth = (year, month) => {
      return new Date(year, month, 0).getDate(); // month is 1-based, so month 0 is the previous month
    };
    
    // Get the total number of days in the target month
    const daysInMonth = getDaysInMonth(year, month);
    
    // Initialize an array to store the counts for each day of the month
    const reviewCountsByDay = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,  // day starts from 1
      count: 0     // initialize all counts to 0
    }));
    
    // Loop over each review and count reviews by day
    reviews.forEach(review => {
      // Parse the 'createdAt' date
      const createdAtDate = new Date(review.createdAt);
      // Check if the review is in the target month and year
      const day = createdAtDate.getUTCDate();  // Get the day from the date
      // Increment the count for this day
      reviewCountsByDay[day - 1].count++;  // Subtract 1 to match array index
    });
    
    // Output the result
    console.log(reviewCountsByDay);
    setColumnData(reviewCountsByDay);
  }

    if (error) return <p>{error}</p>;

    const DynamicColumns = ({ columns }) => {
      return (
        <ColumnsContainer>
          {columns.map((column, index) => (
            <Column key={index} height={column.count}>
              {column.day}
            </Column>
          ))}
        </ColumnsContainer>
      );
    };

    const fetchReviews = async (month, year) => {
      try {
        const response = await axios.get(`/api/reviews-sentiments`, {
          baseURL: process.env.REACT_APP_BACK_END_HOST,
          params: { month: month, year: year },
        });
        divideReviews(response.data.reviews);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch reviews');
      }
    };

    const didSelectCard = (type) => {
      switch (type) {
        case REVIEW_TYPE.POSITIVE:
          getDetailByType(sentimentPositive, year, month);
          console.log('Positive card selected');
          break;
        
        case REVIEW_TYPE.NEGATIVE:
          getDetailByType(sentimentNegative, year, month);
          console.log('Negative card selected');
          break;
    
        case REVIEW_TYPE.NEUTRAL:
          getDetailByType(sentimentNeutral, year, month);
          console.log('Neutral card selected');
          break;
    
        case REVIEW_TYPE.UNKNOWN:
          getDetailByType(sentimentUnknown, year, month);
          console.log('Unknown card selected');
          break;
    
        default:
          console.log('Invalid type');
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
          onClick={() => didSelectCard(REVIEW_TYPE.POSITIVE)}
          percentageChange="40.9% ↑"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#63BC46"
        />
        <MetricCard
          title="Neutral"
          value="1,000"
          onClick={() => didSelectCard(REVIEW_TYPE.NEUTRAL)}
          percentageChange="84.7% ↑"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#f0de89"
        />
        <MetricCard
          title="Negative"
          value="1,400"
          onClick={() => didSelectCard(REVIEW_TYPE.NEGATIVE)}
          percentageChange="-23.6% ↓"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#ffaaa5"
        />

      <MetricCard
          title="Unknown"
          value="1,400"
          onClick={() => didSelectCard(REVIEW_TYPE.UNKNOWN)}
          percentageChange="-23.6% ↓"
          chart={<div> {/* Replace with actual chart component or SVG */} </div>}
          backgroundColor="#D2C0B0"
        />
      </MetricsRow>

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
  background-color: #2986cc;
  color: black;
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
