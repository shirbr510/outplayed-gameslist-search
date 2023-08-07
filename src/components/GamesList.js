import { memo } from "react";
import Game from "./Game";

const Gameslist = ({ games }) => {
  if (!games?.length) {
    return null;
  }

  return (
    <div className="games-list">
      {games.map((game) => (
        <Game key={game.id} game={game} />
      ))}
    </div>
  );
};

export default memo(Gameslist);
