import { graphql } from "msw";

export const queries = [
  {
    query: "fakeQuery1",
    response: {
      fake: {
        id: "1",
        firstName: "John",
        lastName: "Smith",
      },
    },
  },
  {
    query: "fakeQuery2",
    response: {
      fake: {
        id: "1",
        firstName: "John",
        lastName: "Smith",
      },
    },
  },
  {
    query: "fakeQuery3",
    response: {
      fake: {
        id: "1",
        firstName: "John",
        lastName: "Smith",
      },
    },
  },
  {
    query: "fakeQuery4",
    response: {
      fake: {
        id: "1",
        firstName: "John",
        lastName: "Smith",
      },
    },
  },
  {
    query: "fakeQuery5",
    response: {
      fake: {
        id: "1",
        firstName: "John",
        lastName: "Smith",
      },
    },
  },
  {
    query: "fakeQuery6",
    response: {
      fake: {
        id: "1",
        firstName: "John",
        lastName: "Smith",
      },
    },
  },
  {
    query: "whoAmI",
    response: {
      whoAmI: {
        id: "1",
        firstName: "Fred",
        lastName: "White",
        profileImage: "path/to/image",
        emailAddress: "fred.white@email.com",
      },
    },
  },
];

export const constructQuery = (query) => {
  return graphql.query(query.query, (req, res, ctx) =>
    res(ctx.data(query.response))
  );
};

export const handlers = queries.map((query) => constructQuery(query));
