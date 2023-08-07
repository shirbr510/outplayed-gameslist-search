import { memo } from "react";

const Search = ({ ...props }) => {
  return <input {...props} type="search" />;
};

export default memo(Search);
