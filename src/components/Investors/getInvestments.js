import React from 'react'
import { useQuery, gql } from '@apollo/client';

const GET_INVESTMENTS_BY_INVESTOR = gql`
  query GetInvestmentsByInvestorId($investor_id: Int!) {
    investment(limit: 5, where: {investor_id: {_eq: $investor_id}}){
        id
        company {
            name
        }
    }
  }
`;
const Investments = (props) =>{
    const { id } = props
  const { loading, error, data } = useQuery(GET_INVESTMENTS_BY_INVESTOR, {
    variables: { investor_id: id }
  });

  if (loading) return <p>Loading...</p>;
if (error) return <p>error</p>;
  if (data.investment.length === 0) return <p>The database is empty!</p>
  console.log(data)

  return data.investment.map((item) => (
      <span key={ item.id }>
        { item?.company?.name },
      </span>
  ));
}

export default Investments;