import React from 'react'
import { useLazyQuery, gql } from '@apollo/client';
import { withRouter } from "react-router";

// Example of a component that uses apollo-client to fetch data.

const GET_INVESTMENTS_BY_INVESTOR = gql`
  query GetInvestmentsByInvestorId($investor_id: Int!) {
    investment( where: {investor_id: {_eq: $investor_id}}){
        id
        amount
        company {
            name
        }
    }
  }
`;

const Investments = (props) =>{
    const { id  } = props
    const { loading, error, data } = useLazyQuery(GET_INVESTMENTS_BY_INVESTOR, {
        variables: { investor_id: id }
      });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data.investment.length === 0) return <p>The database is empty!</p>
  console.log(data)
  const totalAmount =data.investment.reduce(function(tot, arr) { 
    return tot + arr.amount;
  },0);

  

  return(
      <React.Fragment>
           <p>Total amount intersted {totalAmount}</p>
    <table className='investor-table' >
      <tr>
        <th>Name</th>
        <th>Amount</th>
        <th>Action</th>
      </tr>
      {
      data.investment.map((item) => (

        <tr  key={item.id}>
        <td>{item.company.name}</td>
        <td>{item.amount}</td>
        <td>edit delete</td>
      </tr>
      ))
      }
  
    </table></React.Fragment>

  )
  
  
  
}

export default withRouter(Investments);