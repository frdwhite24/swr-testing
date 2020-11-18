import { token, url } from "../utilities/constants";

export const fetchData = async (query) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });
  return response.json();
};

export const fetcher = (query) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
};
