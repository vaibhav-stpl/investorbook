import { gql } from '@apollo/client';

export const GET_INVESTMENTS_BY_INVESTOR = gql`
query GetInvestmentsByInvestorId($investor_id: Int!) {
  investment( where: {investor_id: {_eq: $investor_id}}){
      id
      amount
      company_id
      company {
          name
      }
  }
}
`;