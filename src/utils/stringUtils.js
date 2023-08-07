const SEARCH_SPLIT_REGEX = /[ :\-\u2013\u2014]+/;
const SEARCH_TRUNCATE_REGEX = /[',()]+/g;

const splitSearchTerms = (texts) => {
  const terms = [];

  for (const text of texts) {
    const truncatedText = text.toLowerCase().replace(SEARCH_TRUNCATE_REGEX, "");
    const words = truncatedText.split(SEARCH_SPLIT_REGEX);
    terms.push(...words);

    // Add one single word, no spaces. (ex. Game Name -> GameName)
    terms.push(words.join(""));

    // Acronym. (ex. World of Warcraft -> WOW)
    const initialLetters = truncatedText.match(/\b\w/g);
    if (initialLetters) {
      terms.push(initialLetters.join(""));
    }
  }

  return terms;
};

const searchInTexts = (texts, searchPhrase) => {
  const searchTerms = searchPhrase
    .toLowerCase()
    .replace(SEARCH_TRUNCATE_REGEX, "")
    .split(SEARCH_SPLIT_REGEX);
  const textTerms = splitSearchTerms(texts);
  return searchTerms.every((searchTerm) =>
    textTerms.some((textTerm) => textTerm.startsWith(searchTerm))
  );
};

const searchInText = (text, searchPhrase) =>
  searchInTexts([text], searchPhrase);

const joinTexts = (texts) => {
  const { length: textsCount } = texts;
  switch (textsCount) {
    case 0:
      return "";
    case 1:
      return texts[0];
    case 2:
      return `${texts[0]} and ${texts[1]}`;
    default: {
      let result = "";
      texts.forEach((text, index) => {
        if (index > 0) {
          if (index + 1 === textsCount) {
            result += ", and ";
          } else {
            result += ", ";
          }
        }

        result += text;
      });

      return result;
    }
  }
};

export { joinTexts, searchInText, searchInTexts, splitSearchTerms };
