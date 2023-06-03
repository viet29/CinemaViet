import React, { useEffect, useState } from "react";
import { getUserInfoById, handleLogout } from "../API/authentication/authUtil";
import { IClient, IHistoryBooking, ITokenObject } from "../Util/FormInit";
import jwt_decode from "jwt-decode";
import { getBookingByUserId } from "../API/movies/moviesUtil";
import PagingList from "../Util/Pagination";

export default function TableHistoryOrder(props: any) {
  const { userId } = props;
  const [isHidden, setIsHidden] = useState<Boolean>(true);
  const [lstHistoryOrder, setLstHistoryOrder] = useState<IHistoryBooking[]>([]);
  const [userInfo, setUserInfo] = useState<IClient>();
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [paginatedItems, setPaginatedItems] = useState<IHistoryBooking[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [pageFocus, setPageFocus] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    if (token) {
      var decoded: ITokenObject = jwt_decode(token);
      const user: IClient = await getUserInfoById(decoded.sub);

      if (user) {
        const history: IHistoryBooking[] = await getBookingByUserId(user.userId);
        console.log(history);

        if (history) {
          setLstHistoryOrder(history);
        }
        setUserInfo(user);
      }else{
        await handleLogout();
      }
    }
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(lstHistoryOrder.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(lstHistoryOrder.length / itemsPerPage));
  }, [lstHistoryOrder]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPaginatedItems(lstHistoryOrder.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(lstHistoryOrder.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, pageFocus]);

  const handleChangeItemsPerPage = (e: any) => {
    setItemsPerPage(parseInt(e.target.value));
    setItemOffset(0);
    setPageFocus(0);
  };

  const handlePageChange = (event: any) => {
    let newOffset = (event.selected * itemsPerPage) % lstHistoryOrder.length;

    setItemOffset(newOffset);
    setPageFocus(event.selected);
  };

  const handleClickShow = () => {
    setIsHidden(!isHidden);
  };

  const checkDateExecuteBooking = (currentDate: string) => {
    const toDay = new Date().valueOf();
    const ex = new Date(Date.parse(currentDate)).valueOf();
    const diffInMs = Math.ceil(ex - toDay);

    if (diffInMs / (1000 * 60 * 60 * 24) >= 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="pt-4">
      {isHidden ? (
        <button className="py-1" onClick={() => handleClickShow()}>
          <span className="text-sky-500">Show History Order</span>
        </button>
      ) : (
        <div>
          <button className="py-1" onClick={() => handleClickShow()}>
            <span className="text-sky-500">Hidden History Order</span>
          </button>
          <div className="relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-900 text-gray-400">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order By
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Movie Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Room
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Seat Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Show Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Show Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.length > 0 &&
                  paginatedItems.map((c, index) => (
                    <tr
                      key={index}
                      className=" border-b hover:bg-gray-500 bg-gray-800 border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                        {c.email}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                        {c.movieName}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                        {c.roomName}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                        {c.seatName}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                        {c.orderDate}
                      </td>
                      <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                        {c.showDate}
                      </td>
                      <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                        {c.showTime}
                      </td>
                      <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                        {checkDateExecuteBooking(c.showDate + " " + c.showTime + ":00") ? (
                          <span className="text-green-500">Using</span>
                        ) : (
                          <span className="text-red-300">Expired</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {lstHistoryOrder.length > 0 && (
              <PagingList
                handleChangeItemsPerPage={handleChangeItemsPerPage}
                handlePageChange={handlePageChange}
                item={lstHistoryOrder}
                pageCount={pageCount}
                pageFocus={pageFocus}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
