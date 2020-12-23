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
export const ADD_INVESTOR = gql`
  mutation AddInvestor($name: String, $photo_large: String, $photo_thumbnail: String) {
    insert_investor_one(object: {name: $name,photo_large:  $photo_large, photo_thumbnail: $photo_thumbnail}) {
      id
    }
  }
`;

export const GET_INVESTORS = gql`
  query GetInvestors($offset: Int!, $limit: Int!) {
      investor(limit: $limit, offset: $offset, order_by: {created_at: asc}) {
          id
          name
          photo_large
          photo_thumbnail
      }
  }
`;
export const GET_FILTERS = gql`
  query GetInvestors($search: String!) {
      investor(where: {name: {_like: $search}}, order_by: {created_at: asc}) {
          id
          name
          photo_large
          photo_thumbnail
      }
  }
`;

export const GET_INVESTOR = gql`
  query GetInvestor($id: Int!) {
    investor_by_pk(id: $id) {
          id
          name
          photo_large
          photo_thumbnail
    }
    company(limit: 100){
        id
        name
    }
  }
`;
export const ADD_INVESTMENT = gql`
  mutation AddInvestment($company_id: Int!, $amount: numeric, $investor_id: Int!) {
    insert_investment_one(object: {company_id: $company_id,amount:  $amount, investor_id: $investor_id}) {
      id
      company_id
      amount
    }
  }
`;
export const UPDATE_INVESTMENT = gql`
  mutation UpdateInvestment($id: Int!, $amount: numeric, $company_id: Int!) {
    update_investment_by_pk(pk_columns: {id: $id}, _set: {amount: $amount, company_id: $company_id}) {
      id
    }
  }
`;

export const DELETE_INVESTMENT = gql`
  mutation DeleteInvestment($id: Int!) {
    delete_investment_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_INVESTOR = gql`
  mutation UpdateInvestor($id: Int!, $name: String!) {
    update_investor_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
      id
    }
  }
`;

export const DELETE_INVESTOR = gql`
  mutation DeleteInvestor($id: Int!) {
    delete_investor_by_pk(id: $id) {
      id
    }
  }
`;
