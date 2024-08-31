import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbWrapper = styled.nav`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const BreadcrumbItem = styled.span`
  &:not(:last-child)::after {
    content: '/';
    margin: 0 8px;
    color: #ccc;
  }
  
  a {
    text-decoration: none;
    color: #007bff;

    &:hover {
      text-decoration: underline;
    }
  }

  &:last-child {
    color: #6c757d; // Inactive breadcrumb
  }
`;

const Breadcrumbs = ({ items }) => {
  return (
    <BreadcrumbWrapper>
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
        </BreadcrumbItem>
      ))}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumbs;
