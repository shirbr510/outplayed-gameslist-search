import { memo, useCallback, useMemo, useState } from "react";
import { useFetchJson, useSearch } from "../hooks";
import GamesList from "./GamesList";
import Search from "./Search";
import "../css/styles.css";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const onSearchTextChange = useCallback(
    (event) => {
      setSearchText(event.target.value);
    },
    [setSearchText]
  );
  const gameTextProvider = useCallback((game) => {
    const { displayName, tags = [] } = game;
    return [displayName, ...tags];
  }, []);
  const gameslist = useFetchJson(
    "https://cdn.outplayed.tv/config/gameslist.json"
  );
  const filteredGames = useSearch(
    searchText,
    gameslist?.games,
    gameTextProvider
  );
  const sortedGames = useMemo(() => {
    return (
      filteredGames?.sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      ) ?? []
    );
  }, [filteredGames]);
  return (
    <div className="App">
      <h1>Outplayed Gameslist</h1>
      <h2>Please insert your search term below:</h2>
      <Search placeholder="search" onChange={onSearchTextChange} />
      <GamesList games={sortedGames} />
    </div>
  );
};

export default memo(App);
