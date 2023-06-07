import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCoordinadorSelector,
  setDeleteId,
  setEditedId,
} from "../../store/coordinadorSlice";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import {
  defaultTdStyle,
  defaultTdActionStyle,
  defaultTdWrapperStyle,
  defaultTdContent,
  defaultTdContentTitleStyle,
  defaultSearchStyle,
} from "../../constants/defaultStyles";
import ReactPaginate from "react-paginate";
import { useAppContext } from "../../context/AppContext";
import EmptyBar from "../Common/EmptyBar";

// Example items, to simulate fetching from another resources.
const itemsPerPage = 10;
const emptySearchForm = {
  name: "",
  email: "",
  mobileNo: "",
};

function CoordinadorTable({ showAdvanceSearch = false }) {
  const { initLoading } = useAppContext();
  const dispatch = useDispatch();
  const allCoordinador = useSelector(getAllCoordinadorSelector);

  const [searchForm, setSearchForm] = useState(emptySearchForm);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const coordinador = useMemo(() => {
    let filterData = allCoordinador.length > 0 ? [...allCoordinador].reverse() : [];
    if (searchForm.name?.trim()) {
      filterData = filterData.filter((coordinador) =>
        coordinador.name.includes(searchForm.name)
      );
    }

    if (searchForm.email?.trim()) {
      filterData = filterData.filter((coordinador) =>
        coordinador.email.includes(searchForm.email)
      );
    }

    if (searchForm.mobileNo?.trim()) {
      filterData = filterData.filter((coordinador) =>
        coordinador.mobileNo.includes(searchForm.mobileNo)
      );
    }

    return filterData;
  }, [allCoordinador, searchForm]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % coordinador.length;
    setItemOffset(newOffset);
  };

  const handleDelete = useCallback(
    (item) => {
      dispatch(setDeleteId(item.id));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (item) => {
      dispatch(setEditedId(item.id));
    },
    [dispatch]
  );

  const handlerSearchValue = useCallback((event, keyName) => {
    const value = event.target.value;

    setSearchForm((prev) => {
      return { ...prev, [keyName]: value };
    });

    setItemOffset(0);
  }, []);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(coordinador.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(coordinador.length / itemsPerPage));
  }, [coordinador, itemOffset]);

  return (
    <>
      {showAdvanceSearch === true && (
        <div className="bg-white rounded-xl px-3 py-3 mb-3">
          <div className="font-title mb-2">Búsqueda Avanzada</div>
          <div className="flex w-full flex-col sm:flex-row">
            <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row font-title flex-1 px-2">
              <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                autoComplete="nope"
                value={searchForm.name}
                placeholder="User Name"
                className={defaultSearchStyle}
                onChange={(e) => handlerSearchValue(e, "name")}
              />
            </div>
            <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row  font-title flex-1 px-2">
              <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                autoComplete="nope"
                value={searchForm.email}
                placeholder="User Email"
                className={defaultSearchStyle}
                onChange={(e) => handlerSearchValue(e, "email")}
              />
            </div>
            <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row  font-title flex-1 px-2">
              <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                autoComplete="nope"
                value={searchForm.mobileNo}
                placeholder="Mobile Number"
                className={defaultSearchStyle}
                onChange={(e) => handlerSearchValue(e, "mobileNo")}
              />
            </div>
          </div>
        </div>
      )}

      <div className="sm:bg-white rounded-xl sm:px-3 sm:py-3">
        <div className="hidden sm:flex invisible sm:visible w-full flex-col sm:flex-row">
          <div className="sm:text-left text-default-color font-title flex-1">
            Name
          </div>
          <div className="sm:text-left text-default-color font-title flex-1">
            Mobile
          </div>
          <div className="sm:text-left text-default-color font-title flex-1">
            Email
          </div>
          <div className="sm:text-left text-default-color font-title sm:w-11">
            Action
          </div>
        </div>

        <div>
          {currentItems &&
            currentItems.map((coordinador) => (
              <div className={defaultTdWrapperStyle} key={coordinador.id}>
                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Name</div>
                  <div className={defaultTdContent}>
                    {coordinador.image ? (
                      <img
                        className="object-cover h-10 w-10 rounded-2xl"
                        src={coordinador.image}
                        alt={coordinador.name}
                      />
                    ) : (
                      <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}

                    <span className="whitespace-nowrap text-ellipsis overflow-hidden pl-1">
                      {coordinador.name}
                    </span>
                  </div>
                </div>
                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Mobile</div>
                  <div className={defaultTdContent}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {coordinador.mobileNo}
                    </span>
                  </div>
                </div>
                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Email</div>
                  <div className={defaultTdContent}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {coordinador.email}{" "}
                    </span>
                  </div>
                </div>
                <div className={defaultTdActionStyle}>
                  <div className={defaultTdContentTitleStyle}>Action</div>
                  <div className={defaultTdContent}>
                    <Menu
                      menuButton={
                        <MenuButton>
                          <div className="bg-gray-50 px-2 rounded-xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </div>
                        </MenuButton>
                      }
                      transition
                    >
                      <MenuItem onClick={() => handleEdit(coordinador)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(coordinador)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            ))}

          {coordinador.length <= 0 && !initLoading && (
            <EmptyBar title="Coordinador Data" />
          )}

          {coordinador.length > 0 && (
            <ReactPaginate
              className="inline-flex items-center -space-x-px mt-2"
              previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              nextLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              pageLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              breakLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              activeLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              breakLabel="..."
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="<"
              nextLabel={">"}
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CoordinadorTable;
