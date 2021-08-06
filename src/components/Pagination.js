import React, { useMemo } from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.nav`
  font-size: 20px;
  border-bottom: 2px solid #c8c8c8;
`;

const PageNumbers = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding-left: 0;
`;

const Page = styled.a`
  color: ${({ currentPage, num }) =>
    currentPage === num ? '#5f9ea0' : '#8c8c8c'};
  text-decoration: none;
  margin: 0 10px;
`;

const Pagination = ({
  currentPage,
  handleChangeCurrentPage,
  todosPerPage,
  totalTodos,
  paginate,
}) => {
  const handleClickVisited = (num) => {
    handleChangeCurrentPage(num);
  };

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
      pages.push(i);
    }
    return pages;
  }, [todosPerPage, totalTodos]);
  return (
    <PaginationWrapper>
      <PageNumbers>
        {pageNumbers.map((num) => (
          <li key={num}>
            <Page
              num={num}
              currentPage={currentPage}
              onClick={() => {
                paginate(num);
                handleClickVisited(num);
              }}
              href="!#"
            >
              {num}
            </Page>
          </li>
        ))}
      </PageNumbers>
    </PaginationWrapper>
  );
};

export default Pagination;
