import ReactPaginate from "react-paginate";

export default function PagingList(props: any) {
  const { handleChangeItemsPerPage, handlePageChange, item, pageCount, pageFocus } = props;

  return (
    <div className={`pageSizePaginateContainer`}>
      <ReactPaginate
        breakLabel={<i className="fa-solid fa-ellipsis svg"></i>}
        nextLabel={<i className="fa-solid fa-caret-right svg"></i>}
        nextLinkClassName={`paginationNextLink`}
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<i className="fa-solid fa-caret-left svg"></i>}
        previousLinkClassName={`paginationPrevLink`}
        // renderOnZeroPageCount={null}
        forcePage={pageFocus}
        containerClassName={`paginationContainer`}
        pageClassName={`paginationPage`}
        pageLinkClassName={`paginationPageLink`}
        previousClassName={`paginationPrevious`}
        nextClassName={`paginationNext`}
        activeClassName={`paginationActive`}
        activeLinkClassName={`paginationActiveLink`}
        breakClassName={`paginationBreak`}
        disabledClassName={`paginationDisableButton`}
      />
      <div className={`pageSizeContainer`}>
        <span className={`paginationInfo text-sm`}>Display</span>
        <select className={`pageSizeDropdown`} onChange={handleChangeItemsPerPage}>
          <option>5</option>
          <option>15</option>
          <option>30</option>
        </select>
        <span className={`paginationInfo text-sm`}>of {item.length} Records</span>
      </div>
    </div>
  );
}
