import React from 'react';
import styled from 'styled-components';

const ReviewPage = () => {
  const stockData = [
    {
      item: 'Macbook Air M1',
      productId: '#XGY-356',
      dateAdded: '02 Apr, 2024',
      price: '$1,230',
      status: 'In Stock',
      quantity: '58 PCS',
      statusColor: '#e0f3ff',
      textColor: '#007bff',
    },
    {
      item: 'Surface Laptop 4',
      productId: '#YHD-047',
      dateAdded: '01 Apr, 2024',
      price: '$1,060',
      status: 'Out of Stock',
      quantity: '0 PCS',
      statusColor: '#ffe0e0',
      textColor: '#ff4d4d',
    },
    {
      item: 'Logitech MX 250',
      productId: '#SRR-678',
      dateAdded: '24 Mar, 2024',
      price: '$64',
      status: 'In Stock',
      quantity: '290 PCS',
      statusColor: '#e0f3ff',
      textColor: '#007bff',
    },
    // More items...
  ];
  return (
    <Container>
      <Title>Stock Report</Title>
      <Subtitle>Total {data.length} Items in the Stock</Subtitle>
      <Table>
        <thead>
          <tr>
            <TH>ITEM</TH>
            <TH>PRODUCT ID</TH>
            <TH>DATE ADDED</TH>
            <TH>PRICE</TH>
            <TH>STATUS</TH>
            <TH>QTY</TH>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TR key={index}>
              <TD>{item.item}</TD>
              <TD>{item.productId}</TD>
              <TD>{item.dateAdded}</TD>
              <TD>{item.price}</TD>
              <TD>
                <StatusBadge statusColor={item.statusColor} textColor={item.textColor}>
                  {item.status}
                </StatusBadge>
              </TD>
              <TD>{item.quantity}</TD>
            </TR>
          ))}
        </tbody>
      </Table>
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

const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 12px;
  background-color: ${({ statusColor }) => statusColor};
  color: ${({ textColor }) => textColor};
  font-size: 12px;
`;

export default ReviewPage;
