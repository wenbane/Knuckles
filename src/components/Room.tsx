import React from "react";

const Room = () => {
  return (
    <div className="h-72 w-72 rounded-2xl border-2 border-gray-200 flex flex-col items-center justify-center p-4 gap-2 bg-white">
      <div className="flex flex-col w-full grow items-center justify-center gap-1 ">
        <div className="font-body text-4xl text-gray-600">{"Knuckles"}</div>
        <div className="text-gray-600 text-justify align-middle text-xl font-bold w-60">
          {"A dice game of risk and reward."}
        </div>
      </div>
      <div className={"w-full grow flex items-center justify-center"} />
      <div className={"w-full grow flex items-center justify-center"} />
    </div>
  );
};

export default Room;
