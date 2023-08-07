import { memo } from "react";
import GameIcon from "./GameIcon";

const Game = ({ game }) => {
  const { displayName } = game;
  return (
    <div className="game">
      <span className="label">{displayName}</span>
      <GameIcon game={game} />
    </div>
  );
};

export default memo(Game);
