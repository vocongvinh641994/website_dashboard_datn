import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { getSentimentName, getCategoryName } from '../../utils/review-utils';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  // const [searchName, setSearchName] = useState(''); // New state for search by name
  const [inputName, setInputName] = useState(''); // State to hold input value
  const [isOpenAI, setOpenAI] = useState(false);
  const [groupSelected, setGroupSelected] = useState("");

  const limit = 5; // Number of items per page

  // Fetch reviews function
const fetchReviews = async (isSync = false) => {
    setLoading(isSync);
    try {
      console.log('Fetching reviews from: ', process.env.REACT_APP_BACK_END_HOST);
      const response = await axios.get(`/api/reviews-sentiments`, {
        baseURL: process.env.REACT_APP_BACK_END_HOST,
        params: { page: currentPage, limit, keyword: inputName , reviewsCategory: groupSelected },
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
const syncSentimentReviews = async (isOpenAI,limit) => {
  setLoading(true);
  try {
    console.log('Fetching reviews from: ', process.env.REACT_APP_BACK_END_HOST);

    const response = await axios.post(
      `${process.env.REACT_APP_BACK_END_HOST}/api/reviews/sync`, // full URL
      {"limit":limit,
        'isOpenAI': isOpenAI
      }, // request body, you can add any data you want to send in the body here
      {
        params: {}, // if there are query parameters, add them here
      }
    );

    fetchReviews(false);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    setLoading(false);
  }
};


  // Fetch reviews function
  const syncSentimentReviewsById = async (isOpenAI,reviewId) => {
    setLoading(true);
    try {
      console.log('Fetching reviews from: ', process.env.REACT_APP_BACK_END_HOST);
  
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_END_HOST}/api/reviews/sync/`+reviewId, // full URL
        {"reviewId":reviewId,
          'isOpenAI': isOpenAI
        }, // request body, you can add any data you want to send in the body here
        {
          params: {}, // if there are query parameters, add them here
        }
      );
  
      fetchReviews(false);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setLoading(false);
    }
  };

const handleReload = () => {
  fetchReviews(true);
}

  useEffect(() => {
    fetchReviews();
  }, [currentPage, limit]);

  // Reload function keeps the current page
  const removeTagged = async (reviewId) => {
    const isConfirmed = window.confirm("Bạn có muốn xoá gán nhãn cho phản hồi này không?");
    if (isConfirmed) {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BACK_END_HOST}/api/delete_sentiment/`+reviewId, // full URL
        {"reviewId":reviewId,
        }, // request body, you can add any data you want to send in the body here
        {
          params: {}, // if there are query parameters, add them here
        }
      );
      fetchReviews(false);
      setLoading(false);
      console.log("User clicked Yes");
      // Proceed with the removal
    } else {
      
      console.log("User clicked No");
      // Cancel the operation
    }
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

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;
  // if (reviews.length === 0) return <p>No reviews available.</p>;

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

  // Handle search by name
  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when searching
    fetchReviews()
  };

    // Full-screen loader component
    const FullScreenLoader = () => (
      <LoaderOverlay>
        <Loader />
      </LoaderOverlay>
    );

    const handleCheckboxChange = (event) => {
      var isCheck = event.target.checked;
      setOpenAI(isCheck);
    };

  return (
    <Container>
      {loading && <FullScreenLoader />}  {/* Conditionally render loading overlay */}
      <Title>Danh sách đánh giá</Title>
      <Subtitle>Tổng cộng {totalReviews} đánh giá</Subtitle>
      
      {/* New Buttons for Reload and Sync */}
      <ButtonGroup>
        <Button onClick={handleReload}>Tải lại</Button>
    
        <Input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Nhập tên hay nội dung để tìm kiếm"
        />

      <TH>Nhóm</TH>
      <select value={groupSelected} onChange={(e) => setGroupSelected(e.target.value)}>
        <option value="">Tất cả</option>
        <option value="0">Ứng dụng</option>
        <option value="1">Tài xế</option>
        <option value="2">Nhân viên hỗ trợ</option>
        <option value="3">Ứng dụng và tài xế</option>
        <option value="4">ứng dụng và nhân viên hỗ trợ</option>
        <option value="5">Tài xế và nhân viên hỗ trợ</option>
        <option value="6">Thuộc 3 nhóm</option>
        <option value="7">Không phân nhóm được</option>
        <option value="100">Chưa phân nhóm</option>
      </select>

        <Button onClick={handleSearch}>Tìm kiếm</Button>

        <CheckBoxContainer>
          <input type="checkbox" onChange={handleCheckboxChange} />
          <span>OpenAI</span>
      </CheckBoxContainer>

      <Button onClick={()=>syncSentimentReviews(isOpenAI,1)}>Sync</Button>
     
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
            <TH>Nhóm</TH>
            <TH> Application sentiment</TH>
            <TH>Driver sentiment</TH>
            <TH>Attendant sentiment</TH>
            <TH>Chức năng</TH>
           
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
              <TD>{isNewReview(review.createdAt) && <NewIcon>🆕</NewIcon>} {new Date(review.createdAt).toLocaleString('en-GB', { 
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour12: false 
}).replace(',', '')}</TD>
            <TD>{review.sentimentAssociated ? (getCategoryName(review.sentimentAssociated.reviewsCategory)) : 'Unknown'}</TD>
            <TD>{review.sentimentAssociated ? getSentimentName(review.sentimentAssociated.application_sentiment) : "Unknown"}</TD>
            <TD>{review.sentimentAssociated ? getSentimentName(review.sentimentAssociated.driver_sentiment): "Unknown"}</TD>
            <TD>{review.sentimentAssociated ? getSentimentName(review.sentimentAssociated.operator_sentiment): "Unknown"}</TD>
            <TD>
            <ButtonAdd onClick={() => syncSentimentReviewsById(isOpenAI,review.id)}>Gán nhãn</ButtonAdd>
            </TD>

            <TD>
            <ButtonRemove onClick={() => removeTagged(review.id)}>Xoá gán nhãn</ButtonRemove>
            </TD>
            </TR>
          ))}_
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

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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

const ButtonRemove = styled.button`
  padding: 10px 20px;
  background-color: #ea9999;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonAdd = styled.button`
  padding: 10px 20px;
  background-color: #93c47d;
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

const Input = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;


const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const spin =  `
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 1px solid #f3f3f3;
  border-radius: 50%;
  border-top: 0px solid #3498db;
  width: 30px;
  height: 30px;
  animation: ${spin} 2s linear infinite;
`;


export default ReviewPage;