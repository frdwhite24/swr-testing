import React, { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FetchDataFetch from "./FetchDataFetch";
import FetchDataSWR from "./FetchDataSWR";
import FetchDataApollo from "./FetchDataApollo";
import { WHO_AM_I, WHO_AM_I_GQL } from "../graphql/queries";
import { runtimeReqHandlers } from "../testUtils";
import { fetchData, client } from "../graphql/utilities";
import { ApolloProvider } from "@apollo/client";

// These three tests test a react component which fetches data from within the
// component using a basic fetch command and awaiting the response.
describe("Fetch react component", () => {
  test("before custom req handler", async () => {
    const { findByText } = render(<FetchDataFetch query={WHO_AM_I} />);
    expect(await findByText("Fred White")).toBeInTheDocument();
  });

  test("with custom req handler", async () => {
    runtimeReqHandlers({
      query: "whoAmI",
      response: {
        whoAmI: {
          id: "1",
          firstName: "Barack",
          lastName: "Obama",
        },
      },
    });
    const { findByText } = render(<FetchDataFetch query={WHO_AM_I} />);
    expect(await findByText("Barack Obama")).toBeInTheDocument();
  });

  test("after custom req handler", async () => {
    const { findByText } = render(<FetchDataFetch query={WHO_AM_I} />);
    expect(await findByText("Fred White")).toBeInTheDocument();
  });
});

// These three tests test a react component that has been defined within each
// test, and uses a similar fetch command to the above 3 tests. I did these as
// it more closely replicated where I was experiencing the issue in my code,
// however these also continued to pass, so I proceeded with the tests including
// SWR in the stack (see next set of tests).
describe("Defined-in-test fetch component", () => {
  test("before custom req handler", async () => {
    const TestComponent = () => {
      const [data, setData] = useState("");

      useEffect(() => {
        const getData = async () => {
          const response = await fetchData(WHO_AM_I);
          setData(
            `${response.data.whoAmI.firstName} ${response.data.whoAmI.lastName}`
          );
        };
        getData();
      }, []);

      return <div>{data && <div>{data}</div>}</div>;
    };
    const { findByText } = render(<TestComponent />);
    expect(await findByText("Fred White")).toBeInTheDocument();
  });

  test("with custom req handler", async () => {
    const TestComponent = () => {
      const [data, setData] = useState("");

      useEffect(() => {
        const getData = async () => {
          const response = await fetchData(WHO_AM_I);
          setData(
            `${response.data.whoAmI.firstName} ${response.data.whoAmI.lastName}`
          );
        };
        getData();
      }, []);

      return <div>{data && <div>{data}</div>}</div>;
    };

    runtimeReqHandlers({
      query: "whoAmI",
      response: {
        whoAmI: {
          id: "1",
          firstName: "Barack",
          lastName: "Obama",
        },
      },
    });

    const { findByText } = render(<TestComponent />);
    expect(await findByText("Barack Obama")).toBeInTheDocument();
  });

  test("after custom req handler", async () => {
    const TestComponent = () => {
      const [data, setData] = useState("");

      useEffect(() => {
        const getData = async () => {
          const response = await fetchData(WHO_AM_I);
          setData(
            `${response.data.whoAmI.firstName} ${response.data.whoAmI.lastName}`
          );
        };
        getData();
      }, []);

      return <div>{data && <div>{data}</div>}</div>;
    };
    const { findByText } = render(<TestComponent />);
    expect(await findByText("Fred White")).toBeInTheDocument();
  });
});

// These three tests use a react component that uses the useSWR hook within the
// component definition to fetch the data from the mocked graphql API. The
// rendering of the test component has been wrapped in the SWRConfig as recommended
// here https://github.com/vercel/swr/pull/231
describe("SWR Component", () => {
  test("before custom req handler", async () => {
    const { findByText } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <FetchDataSWR query={WHO_AM_I} />
      </SWRConfig>
    );
    expect(await findByText("Fred White")).toBeInTheDocument();
  });

  test("with custom req handler", async () => {
    runtimeReqHandlers({
      query: "whoAmI",
      response: {
        whoAmI: {
          id: "1",
          firstName: "Barack",
          lastName: "Obama",
        },
      },
    });
    const { findByText } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <FetchDataSWR query={WHO_AM_I} />
      </SWRConfig>
    );
    expect(await findByText("Barack Obama")).toBeInTheDocument();
  });

  test("after custom req handler", async () => {
    const { findByText } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <FetchDataSWR query={WHO_AM_I} />
      </SWRConfig>
    );
    expect(await findByText("Fred White")).toBeInTheDocument();
  });
});

// Testing out if Apollo Client has the same issues with test isolation to
// support the argument of switching graphql client to apollo.
describe("Apollo Client Provider", () => {
  test("before custom req handler", async () => {
    const { findByText } = render(
      <ApolloProvider client={client}>
        <FetchDataApollo query={WHO_AM_I_GQL} />
      </ApolloProvider>
    );
    expect(await findByText("Fred White")).toBeInTheDocument();
  });

  test("with custom req handler", async () => {
    runtimeReqHandlers({
      query: "whoAmI",
      response: {
        whoAmI: {
          id: "1",
          firstName: "Barack",
          lastName: "Obama",
        },
      },
    });
    const { findByText } = render(
      <ApolloProvider client={client}>
        <FetchDataApollo query={WHO_AM_I_GQL} />
      </ApolloProvider>
    );
    expect(await findByText("Barack Obama")).toBeInTheDocument();
  });

  test("after custom req handler", async () => {
    const { findByText } = render(
      <ApolloProvider client={client}>
        <FetchDataApollo query={WHO_AM_I_GQL} />
      </ApolloProvider>
    );
    expect(await findByText("Fred White")).toBeInTheDocument();
  });
});
