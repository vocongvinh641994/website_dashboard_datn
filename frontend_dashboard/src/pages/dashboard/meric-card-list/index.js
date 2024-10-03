import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MetricCard from '../meric-card';
import axios from 'axios';
import { REVIEW_TYPE } from '../../../utils/review-utils';

const MericCardList = () => {
  const [error, setError] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [sentimentUnknown, setSentimentUnknown] = useState([]);
  const [sentimentPositive, setSentimentPositive] = useState([]);
  const [sentimentNeutral, setSentimentNeutral] = useState([]);
  const [sentimentNegative, setSentimentNegative] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [currentType, setCurrentType] = useState(REVIEW_TYPE.POSITIVE);
  const [columnDescription, setColumnDescription] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1); // getMonth() returns 0-11, so add 1
    setYear(currentDate.getFullYear());
  }, []);

  const divideReviews = (reviews) => {
    // Temporary arrays to hold sentiment groups
    const tempUnknown = [];
    const tempPositive = [];
    const tempNeutral = [];
    const tempNegative = [];

    // Divide the reviews into four categories
    reviews.forEach((review) => {
      const sentiment = review.sentimentAssociated;

      if (!sentiment) {
        tempUnknown.push(review);
      } else {
        const sentimentType = sentiment.sentiment;
        if (sentimentType === REVIEW_TYPE.POSITIVE) {
          tempPositive.push(review);
        } else if (sentimentType === REVIEW_TYPE.NEUTRAL) {
          tempNeutral.push(review);
        } else if (sentimentType === REVIEW_TYPE.NEGATIVE) {
          tempNegative.push(review);
        }
      }
    });

    // Update the state for sentiment lists
    setSentimentUnknown(tempUnknown);
    setSentimentPositive(tempPositive);
    setSentimentNeutral(tempNeutral);
    setSentimentNegative(tempNegative);

    // Output the four lists for debugging
    console.log("Sentiment Unknown Reviews:", tempUnknown);
    console.log("Positive Sentiment Reviews:", tempPositive);
    console.log("Neutral Sentiment Reviews:", tempNeutral);
    console.log("Negative Sentiment Reviews:", tempNegative);
    getDetailByType(tempPositive, year, month);
  };

  const handleSearch = () => {
    fetchReviews(month, year);
  };

  const getDetailByType = (reviews, yearSelect, monthSelect) => {
    console.log("Fetching details for selected sentiment type...");
    console.log(reviews);

    // Function to get the total days in the given month
    const getDaysInMonth = (year, month) => {
      return new Date(year, month, 0).getDate(); // month is 1-based, so month 0 is the previous month
    };

    // Get the total number of days in the target month
    const daysInMonth = getDaysInMonth(yearSelect, monthSelect);

    // Initialize an array to store the counts for each day of the month
    const reviewCountsByDay = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1, // day starts from 1
      count: 0, // initialize all counts to 0
    }));

    // Loop over each review and count reviews by day
    reviews.forEach((review) => {
      // Parse the 'createdAt' date
      const createdAtDate = new Date(review.createdAt);
      // Check if the review is in the target month and year
      const day = createdAtDate.getUTCDate(); // Get the day from the date
      // Increment the count for this day
      reviewCountsByDay[day - 1].count++; // Subtract 1 to match array index
    });

    // Output the result
    console.log(reviewCountsByDay);
    setColumnData(reviewCountsByDay);
    setColumnDescription( String(currentType)+ " column chart "+ String(month) +"/"+ String(year));
  };

  if (error) return <p>{error}</p>;

  const DynamicColumns = ({ columns }) => {
    // Find the maximum count in the columns for scaling purposes
    const maxCount = Math.max(...columns.map((column) => column.count));
  
    return (
      <ColumnsContainer>
        {columns.map((column, index) => (
          <ColumnWrapper key={index}>
            <TopLabel>{column.count}</TopLabel> {/* Top label for count */}
            <Column
              height={maxCount ? (column.count / maxCount) * 120 : 0} // Scale height dynamically
            />
            <BottomLabel>{column.day}</BottomLabel> {/* Bottom label for day */}
          </ColumnWrapper>
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
    setCurrentType(type);
    switch (type) {
      case REVIEW_TYPE.POSITIVE:
        getDetailByType(sentimentPositive, year, month);
        break;

      case REVIEW_TYPE.NEGATIVE:
        getDetailByType(sentimentNegative, year, month);
        break;

      case REVIEW_TYPE.NEUTRAL:
        getDetailByType(sentimentNeutral, year, month);
        break;

      case REVIEW_TYPE.UNKNOWN:
        getDetailByType(sentimentUnknown, year, month);
        break;

      default:
        console.log('Invalid type');
    }
  };

  return (
    <>
      <FilterContainer>
        <div style={{ marginRight: 8 }}>Month:</div>
        <InputField
          type="number"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <div style={{ marginRight: 8 }}>Year:</div>
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
            value={sentimentPositive.length}
            onClick={() => didSelectCard(REVIEW_TYPE.POSITIVE)}
            // percentageChange="40.9% ↑"
            percentageChange=""
            chart={<div> {/* Replace with actual chart component or SVG */} </div>}
            backgroundColor="#63BC46"
          />
          <MetricCard
            title="Neutral"
            value={sentimentNeutral.length}
            onClick={() => didSelectCard(REVIEW_TYPE.NEUTRAL)}
            // percentageChange="84.7% ↑"
            percentageChange=""
            chart={<div> {/* Replace with actual chart component or SVG */} </div>}
            backgroundColor="#f0de89"
          />
          <MetricCard
            title="Negative"
            value={sentimentNegative.length}
            onClick={() => didSelectCard(REVIEW_TYPE.NEGATIVE)}
            // percentageChange="-23.6% ↓"
            percentageChange=""
            chart={<div> {/* Replace with actual chart component or SVG */} </div>}
            backgroundColor="#ffaaa5"
          />
          <MetricCard
            title="Unknown"
            value={sentimentUnknown.length}
            onClick={() => didSelectCard(REVIEW_TYPE.UNKNOWN)}
            // percentageChange="-23.6% ↓"
            percentageChange=""
            chart={<div> {/* Replace with actual chart component or SVG */} </div>}
            backgroundColor="#D2C0B0"
          />
        </MetricsRow>

        <DynamicColumns columns={columnData} />
        <CenteredText>{columnDescription}</CenteredText>
  
      </DashboardContainer>
    </>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
    flex-direction: column;
    align-items: center; /* Centers horizontally */

`;

const MetricsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100px;
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

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
`;

const Column = styled.div`
  background-color: #2986cc;
  color: black;
  flex: 1;
  width: 8px;
  padding: 2px;
  margin-right: 4px;
  text-align: center;
  border-radius: 4px;
  height: ${({ height }) => `${Math.max(10, height > 120 ? 120 : height)}px`}; // Ensure minimum height of 10px

  &:last-child {
    margin-right: 0;
  }
`;

// Styled Components for Labels and Wrapping
const ColumnWrapper = styled.div`

`;

const TopLabel = styled.div`
  margin-bottom: 4px;
  font-size: 12px;
  color: #333;
`;

const BottomLabel = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #333;
`;

const CenteredText = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export default MericCardList;