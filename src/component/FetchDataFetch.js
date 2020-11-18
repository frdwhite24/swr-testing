import React, { useState, useEffect } from "react";
import { token, url } from "../utilities/constants";

const FetchDataFetch = ({ query }) => {
  const [data, setData] = useState("");

  useEffect(async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const dataJSON = await response.json();
    setData(
      `${dataJSON.data.whoAmI.firstName} ${dataJSON.data.whoAmI.lastName}`
    );
  }, []);

  if (!data) {
    return <div>loading...</div>;
  } else {
    return <div>{data}</div>;
  }
};

export default FetchDataFetch;
