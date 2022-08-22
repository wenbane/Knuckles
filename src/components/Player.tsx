import React from "react";
import Dice from "./Dice";
import { roll } from "../utils/dice";
import { useDrawsStore } from "../store";
import { setIntervalX } from "../utils/player";

const Player = ({
  name,
  score,
  currentDraw,
  type,
  turn,
  canRoll,
  isGameOver,
}: {
  name: string;
  score: number;
  currentDraw: number | null;
  type: "player1" | "player2";
  turn: string;
  canRoll: boolean;
  isGameOver: boolean;
}) => {
  const setCurrentDraw = useDrawsStore((state) => state.setCurrentDraw);
  const setCanAddToBoard = useDrawsStore((state) => state.setCanAddToBoard);
  const setCanRoll = useDrawsStore((state) => state.setCanRoll);
  return (
    <div
      className={`h-72 w-72 rounded-2xl flex flex-col items-center justify-center p-4 gap-2 bg-white shadow-sm ${
        turn === type && !isGameOver
          ? "border-4 border-blue-500"
          : "border-2 border-gray-200"
      }`}
    >
      <div className="h-20 w-full flex flex-col items-center justify-center gap-1">
        <div className="w-full text-2xl text-gray-600 rounded-xl flex flex-row items-center justify-center font-body">
          {name}
        </div>
        <div className="w-full text-2xl flex flex-row items-center justify-center font-body text-gray-600">
          {score}
        </div>
      </div>
      <div className="w-full grow flex items-center justify-center">
        {currentDraw && turn === type && <Dice face={currentDraw} />}
      </div>
      {type === "player1" && type === turn && !isGameOver && (
        <button
          type="button"
          className="bg-blue-500 w-full h-10 text-white font-body rounded-xl shadow-md shadow-blue-500 hover:shadow-sm hover:bg-blue-600 hover:shadow-inner disabled:bg-blue-300 disabled:cursor-not-allowed disabled:shadow-blue-300 disabled:shadow-none"
          onClick={() => {
            setIntervalX(() => setCurrentDraw(roll()), 100, 6);
            setCanRoll(false);
            setCanAddToBoard(true);
          }}
          disabled={!canRoll}
        >
          Roll
        </button>
      )}
    </div>
  );
};

export default Player;
