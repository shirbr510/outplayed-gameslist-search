import { useMemo } from "react";
import { searchInTexts } from "../utils";

const useSearch = (searchText, items = [], textsProvider = (item) => item) =>
  useMemo(
    () =>
      items.filter((item) => {
        const texts = textsProvider(item);
        return searchInTexts(texts, searchText);
      }),
    [items, textsProvider, searchText]
  );

export default useSearch;
