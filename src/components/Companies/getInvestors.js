import React from 'react'
import { useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';

const GET_INVESTORS_BY_COMPANY= gql`
  query GetInvestorsByCompanyId($company_id: Int!) {
    investors(limit: 5, where: {company_id: {_eq: $company_id}}){
        id
        name
    }
  }
`;
const Investors = (props) =>{
    const { id } = props
  const { loading, error, data } = useQuery(GET_INVESTORS_BY_COMPANY, {
    variables: { company_id: id }
  });

  if (loading) return <p>Loading...</p>;
if (error) return <p>error</p>;
  if (data.investor.length === 0) return <p>The database is empty!</p>
  console.log(data)

  return data.investor.map((item) => (
      <span key={ item.id }>
        { item?.name },
      </span>
  ));
}
Investors.propTypes = {
  id:  PropTypes.string,
};
export default Investors;