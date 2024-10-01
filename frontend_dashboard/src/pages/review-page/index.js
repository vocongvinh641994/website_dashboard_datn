import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);

  const limit = 5; // Number of items per page

  // Fetch reviews function
  const fetchReviews = async (isSync = false) => {
    // setLoading(true);
    try {
      console.log('Fetching reviews from: ', process.env.REACT_APP_BACK_END_HOST);
      const response = await axios.get(`/api/reviews-sentiments`, {
        baseURL: process.env.REACT_APP_BACK_END_HOST,
        params: { page: currentPage, limit },
      });
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);
      setTotalReviews(response.data.totalReviews);
      
      if (isSync) {
        setCurrentPage(1); // Reset pagination when sync happens
      }
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reviews');
      setLoading(false);
    }
  };

  // Fetch reviews function
const syncSentimentReviews = async () => {
  // setLoading(true);
  try {
    console.log('Fetching reviews from: ', process.env.REACT_APP_BACK_END_HOST);

    const response = await axios.post(
      `${process.env.REACT_APP_BACK_END_HOST}/api/reviews/sync`, // full URL
      {}, // request body, you can add any data you want to send in the body here
      {
        params: {}, // if there are query parameters, add them here
      }
    );

    fetchReviews(true);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    setLoading(false);
  }
};

  useEffect(() => {
    fetchReviews();
  }, [currentPage, limit]);

  // Reload function keeps the current page
  const handleReload = () => {
    fetchReviews(true);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const maxPageNumbers = 5; // Limit to 5 page numbers at a time
    const halfRange = Math.floor(maxPageNumbers / 2);
    
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);
  
    // Ensure there are always 5 numbers showing when possible
    if (currentPage <= halfRange) {
      endPage = Math.min(totalPages, maxPageNumbers);
    }
    if (currentPage + halfRange >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbers + 1);
    }
  
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          active={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </PageNumber>
      );
    }
    return pageNumbers;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Define a function to check if the review is new
const isNewReview = (createdAt) => {
  const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const currentTime = new Date();
  const reviewTime = new Date(createdAt);
  return currentTime - reviewTime < oneDay;
};

  return (
    <Container>
      <Title>Danh sách đánh giá</Title>
      <Subtitle>Tổng cộng {totalReviews} đánh giá</Subtitle>
      
      {/* New Buttons for Reload and Sync */}
      <ButtonGroup>
        <Button onClick={handleReload}>Reload</Button>
        <Button onClick={syncSentimentReviews}>Sync</Button>
      </ButtonGroup>

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
      <Pagination>
      <ButtonComponent>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button style={{width:80}} onClick={handleFirstPage} disabled={currentPage === 1}>
            First
          </Button>
          <Button style={{width:80, marginRight:36}} onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <PageNumbers>{renderPageNumbers()}</PageNumbers>
          <Button style={{width:80, marginLeft: 36}} onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
          <Button style={{width:80}} onClick={handleLastPage} disabled={currentPage === totalPages}>
            Last
          </Button>
        </div>
    </ButtonComponent>
      </Pagination>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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

const TD = styled.td`
  padding: 12px 15px;
  font-size: 14px;
  color: #333;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center; /* This will center the content horizontally */
  align-items: center;
  gap: 10px; /* Adds space between each button */
  margin-top: 20px;
  width: 100%; /* Make sure the pagination takes the full width of the container */
`;

const ButtonComponent = styled.div`
  display: flex;
  justify-content: center; /* Centers the button group */
  align-items: center;
  gap: 10px; /* Adds space between each button */
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 10px;
`;

const PageNumber = styled.span`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#007bff' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 5px;
  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

// Styled Component for the "New" icon or label
const NewIcon = styled.span`
  margin-left: 8px;
  color: red;
  font-weight: bold;
`;


export default ReviewPage;