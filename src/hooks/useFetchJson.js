import { useEffect, useState } from "react";

const useFetchJson = (url, options) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchResponse = async () => {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      const json = await response.json();
      setResponse(json);
    };
    fetchResponse();
    return () => {
      controller.abort();
    };
  }, [url]);

  return response;
};

export default useFetchJson;
