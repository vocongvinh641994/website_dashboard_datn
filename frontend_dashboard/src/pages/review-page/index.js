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

  useEffect(() => {
    // Fetch reviews from API
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_END_HOST}/api/reviews`, {
          params: { page: currentPage, limit },
        });
        setReviews(response.data.reviews);
        setTotalPages(response.data.totalPages);
        setTotalReviews(response.data.totalReviews);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Title>Danh sách đánh giá</Title>
      <Subtitle>Tổng cộng {reviews.length} đánh giá</Subtitle>
      <Table>
        <thead>
          <tr>
            <TH>ID</TH>
            <TH>Tên</TH>
            <TH>Đánh giá</TH>
            <TH>Tiêu đề</TH>
            <TH>Nội dung</TH>
            <TH>Ngày</TH>
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
              <TD>{new Date(review.createdAt).toLocaleDateString()}</TD>
            </TR>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <PageInfo>
          Page {currentPage} of {totalPages}
        </PageInfo>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
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
  justify-content: space-between;
  margin-top: 20px;
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

const PageInfo = styled.span`
  font-size: 14px;
`;

export default ReviewPage;
