import React, { useState } from "react";
// @ts-ignore
import { ReactComponent as Addition } from "../assets/addition.svg";
// @ts-ignore
import { ReactComponent as Delete } from "../assets/delete.svg";
// @ts-ignore
import { ReactComponent as X2 } from "../assets/X2.svg";
// @ts-ignore
import { ReactComponent as X3 } from "../assets/X3.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const Page1 = () => (
  <>
    <Addition className="h-52 w-20" />
    <div className="pt-8 pl-2.5 text-gray-600 text-xl w-40">
      {"Your score is calculated by adding all your dice together."}
    </div>
  </>
);

const Page2 = () => (
  <>
    <X2 className="h-52 w-20" />
    <div className="pt-2 pl-2.5 text-gray-600 text-xl w-40">
      {
        "When dice of same number are placed in the same column twice, multiply their sum by 2."
      }
    </div>
  </>
);

const Page3 = () => (
  <>
    <X3 className="h-52 w-20" />
    <div className="pt-2 pl-2.5 text-gray-600 text-xl w-40">
      {
        "When dice of same number are placed in the same column thrice, multiply their sum by 3."
      }
    </div>
  </>
);

const Page4 = () => (
  <>
    <Delete className="h-52 w-20" />
    <div className="pt-8 pl-2.5 text-gray-600 text-xl w-40">
      {"Destroy your opponents dice by matching yours to theirs."}
    </div>
  </>
);

const HowToPlay = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  return (
    <div className="h-72 w-72 rounded-2xl border-2 border-gray-200 flex flex-col items-center justify-center p-4 gap-2 bg-white relative">
      <div className="flex flex-col w-full items-center justify-center gap-1 font-body text-xl text-gray-600 ">
        {"Rules"}
      </div>
      <div className="flex flex-row justify-center gap-2">
        {pageNumber === 0 && <Page1 />}
        {pageNumber === 1 && <Page2 />}
        {pageNumber === 2 && <Page3 />}
        {pageNumber === 3 && <Page4 />}
      </div>
      <div className="absolute" style={{ top: "45%", right: "93%" }}>
        {pageNumber !== 0 && (
          <button
            className="h-10 w-10 rounded-full border-2 bg-white"
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            <ChevronLeftIcon className="text-gray-600 hover:text-blue-500" />
          </button>
        )}
      </div>
      <div className="absolute" style={{ top: "45%", left: "93%" }}>
        {pageNumber < 3 && (
          <button
            className="h-10 w-10 rounded-full border-2 bg-white"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <ChevronRightIcon className="text-gray-600 hover:text-blue-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HowToPlay;
