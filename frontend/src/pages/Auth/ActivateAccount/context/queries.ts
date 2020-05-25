import { gql } from "apollo-boost";

export const ACTIVATE_USER = gql`
mutation activateUser($email: String!, $code: String!) {
  activateUser(email: $email, activationCode: $code)
}
`