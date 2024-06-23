import React from "react";

function CheckoutHeader() {
  return (
    <>
      <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
        <div className="relative">
          <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full  text-xs font-semibold "
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </a>
              <span className="font-semibold ">تسوق</span>
            </li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400  -scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4  gap-2">
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold  ring ring-offset-2"
                href="#"
              >
                2
              </a>
              <span className="font-semibold t">دفع</span>
            </li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4  -scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4 gap-2">
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold  ring ring-offset-2"
                href="#"
              >
                3
              </a>
              <span className="font-semibold ">إرسال</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default CheckoutHeader;
