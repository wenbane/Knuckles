import Board from "./components/Board";
import { useDrawsStore } from "./store";
import Player from "./components/Player";
import Room from "./components/Room";
import { getScore } from "./utils/board";
import { flatten } from "ramda";
import HowToPlay from "./components/HowToPlay";
import { useEffect } from "react";
import { roll } from "./utils/dice";
import { setIntervalX } from "./utils/player";

function App() {
  const player1Board = useDrawsStore((state) => state.player1Board);
  const player2Board = useDrawsStore((state) => state.player2Board);
  const turn = useDrawsStore((state) => state.turn);
  const currentDraw = useDrawsStore((state) => state.currentDraw);
  const canRoll = useDrawsStore((state) => state.canRoll);
  const setCanAddToBoard = useDrawsStore((state) => state.setCanAddToBoard);
  const setTurn = useDrawsStore((state) => state.setTurn);
  const addToBoard = useDrawsStore((state) => state.addToBoard);
  const setCurrentDraw = useDrawsStore((state) => state.setCurrentDraw);

  const player1TotalDraws = flatten(player1Board).filter(
    (draw) => draw !== null
  ).length;

  const player2TotalDraws = flatten(player2Board).filter(
    (draw) => draw !== null
  ).length;

  const isGameOver = player1TotalDraws === 9 || player2TotalDraws === 9;

  useEffect(() => {
    if (turn === "player2" && !isGameOver) {
      const acc: number[] = [];
      const nonEmptyColIdxes = player2Board.reduce((acc, column, idx) => {
        const empty = column.includes(null);
        return empty ? [...acc, idx] : acc;
      }, acc);
      if (nonEmptyColIdxes.length) {
        const randomColIdx =
          nonEmptyColIdxes[Math.floor(Math.random() * nonEmptyColIdxes.length)];
        setIntervalX(() => setCurrentDraw(roll()), 100, 6);
        setTimeout(() => {
          if (randomColIdx != null) {
            addToBoard(randomColIdx);
          }
          setCanAddToBoard(false);
          setTurn();
        }, 1500);
      }
    }
  }, [turn]);

  return (
    <div className="h-screen w-screen bg-stone-100 flex justify-center items-center">
      <div className="grid grid-cols-3 grid-rows-2 gap-8 h-fit w-fit justify-items-center items-center">
        <div className="w-fit">
          <Room />
        </div>
        <div className="w-fit">
          <Board type={"player2"} turn={turn} draws={player2Board} />
        </div>
        <div className="w-fit">
          <Player
            name={"Shrumy"}
            score={getScore(player2Board)}
            currentDraw={currentDraw}
            type={"player2"}
            turn={turn}
            canRoll={canRoll}
            isGameOver={isGameOver}
          />
        </div>
        <div className="w-fit">
          <Player
            name={"Lamb"}
            score={getScore(player1Board)}
            currentDraw={currentDraw}
            type={"player1"}
            turn={turn}
            canRoll={canRoll}
            isGameOver={isGameOver}
          />
        </div>
        <div className="w-fit">
          <Board type={"player1"} turn={turn} draws={player1Board} />
        </div>
        <div className="w-fit">
          <HowToPlay />
        </div>
      </div>
    </div>
  );
}

export default App;
