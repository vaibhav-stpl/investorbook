
import { gql } from '@apollo/client';

export const GET_INVESTORS_BY_COMPANY= gql`
query GetInvestorsByCompanyId($company_id: Int!) {
  investment( where: {company_id: {_eq: $company_id}},order_by: {updated_at: desc}){
      id
      investor {
        id
        name
      }
      investor_id
      amount
  }
}
`;
export const ADD_COMPANY = gql`
  mutation AddCompany($name: String) {
    insert_company_one(object: {name: $name}) {
      id
    }
  }
`;
export const GET_COMPANIES = gql`
  query GetCompanies($offset: Int!, $limit: Int!)  {
      company(limit: $limit, offset: $offset, order_by: {created_at: asc}) {
          id
          name
      }
  }
`;
export const GET_FILTERS = gql`
  query GetCompanies($search: String!) {
      company(where: {name: {_like: $search}},limit: 10, order_by: {created_at: asc}) {
          id
          name
      }
  }
`;

export const GET_COMPANY = gql`
  query GetCompany($id: Int!) {
    company_by_pk(id: $id) {
          id
          name
    }
    investor(limit: 500, order_by: {updated_at: desc}){
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
  mutation UpdateInvestment($id: Int!, $amount: numeric) {
    update_investment_by_pk(pk_columns: {id: $id}, _set: {amount: $amount}) {
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

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: Int!, $name: String!) {
    update_company_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
      id
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: Int!) {
    delete_company_by_pk(id: $id) {
      id
    }
  }
`;

