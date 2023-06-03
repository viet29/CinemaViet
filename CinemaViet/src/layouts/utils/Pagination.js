import { faCaretLeft, faCaretRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import "./paginationcss.css";

export default function PagingList(props) {
  const { handleChangeItemsPerPage, handlePageChange, item, pageCount, pageFocus } = props;

  return (
    <div className={`pageSizePaginateContainer`}>
      <ReactPaginate
        breakLabel={<FontAwesomeIcon icon={faEllipsis} className={`svg`} />}
        nextLabel={<FontAwesomeIcon icon={faCaretRight} className={`svg`} />}
        nextLinkClassName={`paginationNextLink`}
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<FontAwesomeIcon icon={faCaretLeft} className={`svg`} />}
        previousLinkClassName={`paginationPrevLink`}
        renderOnZeroPageCount={null}
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
