import React from "react";
import useSWR from "swr";
import { fetcher } from "../graphql/utilities";

const FetchDataSWR = ({ query }) => {
  const { data, error } = useSWR(query, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div>{`${data.data.whoAmI.firstName} ${data.data.whoAmI.lastName}`}</div>
  );
};

export default FetchDataSWR;
