import React from "react";
import Dice from "./Dice";
import "./Board.css";
import { isNil, filter, complement } from "ramda";
import { getColumnScore, getRepeatsCount } from "../utils/board";
import { board, useDrawsStore } from "../store";

const Board = ({
  type,
  turn,
  draws,
}: {
  type: string;
  turn: string;
  draws: board;
}) => {
  const canAddToBoard = useDrawsStore((state) => state.canAddToBoard);
  const setCanAddToBoard = useDrawsStore((state) => state.setCanAddToBoard);
  const setTurn = useDrawsStore((state) => state.setTurn);
  const addToBoard = useDrawsStore((state) => state.addToBoard);
  const setCanRoll = useDrawsStore((state) => state.setCanRoll);

  return (
    <div className="flex flex-row h-fit w-fit">
      {draws.map((column, idx) => (
        <div
          key={idx}
          className={`flex items-center ${
            type === "player1" ? "flex-col" : "flex-col-reverse"
          }`}
        >
          <div
            key={idx}
            className={`board-layout ${
              getRepeatsCount(column) === 3
                ? "board-bg-triple"
                : getRepeatsCount(column) === 2
                ? "board-bg-double"
                : ""
            } ${
              type === turn &&
              canAddToBoard &&
              filter(complement(isNil), column).length < 3
                ? "board-add"
                : "board-not-add"
            } ${
              type === "player1"
                ? "board-self-direction"
                : "board-opponent-direction"
            }`}
            onClick={() => {
              addToBoard(idx);
              setCanAddToBoard(false);
              setTurn();
              setCanRoll(true);
            }}
          >
            {column[0] && <Dice face={column[0]} />}
            {column[1] && <Dice face={column[1]} />}
            {column[2] && <Dice face={column[2]} />}
          </div>
          <div className="text-xl font-body text-gray-600">
            {getColumnScore(column)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
