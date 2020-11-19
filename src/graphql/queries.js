import { gql } from "@apollo/client";

export const WHO_AM_I = `
  query whoAmI {
    whoAmI {
      id
      firstName
      lastName
      emailAddress
      profileImage
    }
  }
`;

export const WHO_AM_I_GQL = gql`
  query whoAmI {
    whoAmI {
      id
      firstName
      lastName
      emailAddress
      profileImage
    }
  }
`;
