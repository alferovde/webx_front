import React from "react";

const Pagination = ({ visiblePage, totalPage, changePage, currentPage }) => {
  const pageNumber = [];

  //Определяем общее количество страниц

  for (let i = 1; i <= Math.ceil(totalPage / visiblePage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="pagination">
      <ul>
        {pageNumber.map((item) => {
          if (currentPage == item) {
            return (
              <li className="active">
                <a href="#" onClick={() => changePage(item)}>
                  {item}
                </a>
              </li>
            );
          } else {
            return (
              <li className="">
                <a href="#" onClick={() => changePage(item)}>
                  {item}
                </a>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Pagination;
