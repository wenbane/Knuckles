import create from "zustand";
import { update } from "ramda";

export type board = (number | null)[][];

interface DrawsStore {
  player1Board: board;
  player2Board: board;
  turn: "player1" | "player2";
  currentDraw: null | number;
  canAddToBoard: boolean;
  canRoll: boolean;
  addToBoard: (colIdx: number) => void;
  setCanRoll: (canRoll: boolean) => void;
  setTurn: () => void;
  setCurrentDraw: (draw: number | null) => void;
  setCanAddToBoard: (canAddToBoard: boolean) => void;
}

const empty: board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const useDrawsStore = create<DrawsStore>((set) => ({
  player1Board: empty,
  player2Board: empty,
  turn: "player1",
  canRoll: true,
  currentDraw: null,
  canAddToBoard: false,
  addToBoard: (colIdx) => {
    set((state) => {
      const board = state.turn === "player1" ? "player1Board" : "player2Board";
      const opponentBoard =
        state.turn === "player1" ? "player2Board" : "player1Board";
      const updatedBoard = state[board].map(
        (col: (number | null)[], idx: number) => {
          const nullIdx = col.indexOf(null);
          return idx === colIdx ? update(nullIdx, state.currentDraw, col) : col;
        }
      );
      const updatedOpponentBoardCol = state[opponentBoard][colIdx]
        .map((draw) => (draw === state.currentDraw ? null : draw))
        .sort((a, b) => {
          if (a !== null && b !== null) return 0;
          else if (a !== null && b === null) return -1;
          else return 1;
        });
      const updatedOpponentBoard = update(
        colIdx,
        updatedOpponentBoardCol,
        state[opponentBoard]
      );
      return {
        [board]: updatedBoard,
        [opponentBoard]: updatedOpponentBoard,
        currentDraw: null,
      };
    });
  },
  setTurn: () =>
    set((state) => ({
      turn: state.turn === "player1" ? "player2" : "player1",
    })),
  setCurrentDraw: (draw) => set(() => ({ currentDraw: draw })),
  setCanAddToBoard: (canAddToBoard: boolean) => set(() => ({ canAddToBoard })),
  setCanRoll: (canRoll: boolean) => set(() => ({ canRoll })),
}));
