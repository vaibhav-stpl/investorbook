import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Investments from './getInvestments'
import { withRouter } from "react-router";
// Example of a component that uses apollo-client to fetch data.

const GET_INVESTORS = gql`
  query GetInvestors {
      investor(limit: 10) {
          id
          name
          photo_large
          photo_thumbnail
      }
  }
`;

const Investors = (props) =>{
  const { loading, error, data } = useQuery(GET_INVESTORS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data.investor.length === 0) return <p>The database is empty!</p>
  console.log(data)

  return(
    <table className='investor-table' >
      <tr>
        <th>Name</th>
        <th>Investments</th>
      </tr>
      {
      data.investor.map(({ id, name, photo_thumbnail }) => (

        <tr  key={id} onClick={ () => { props.history.push(`investors/${id}`)}}>
        <td><img src={photo_thumbnail} alt={id} /></td>
        <td>{name}</td>
        <td><Investments id={ id }/></td>
      </tr>
      ))
      }
  
    </table>

  )
  
  
  
}

export default withRouter(Investors);