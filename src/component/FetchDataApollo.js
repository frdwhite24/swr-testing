import React from "react";
import { useQuery } from "@apollo/client";

const FetchDataApollo = ({ query }) => {
  const result = useQuery(query);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>{`${result.data.whoAmI.firstName} ${result.data.whoAmI.lastName}`}</div>
  );
};

export default FetchDataApollo;
