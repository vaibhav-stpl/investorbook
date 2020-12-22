import React , {useState, useEffect} from 'react'
import { useQuery, gql } from '@apollo/client';
import Investors from './getInvestors'
// Example of a component that uses apollo-client to fetch data.

const GET_INVESTORS = gql`
  query GetCompanies($offset: Int!, $limit: Int!)  {
      company(limit: $limit, offset: $offset, order_by: {created_at: asc}) {
          id
          name
      }
  }
`;

const CompaniesList = (props) =>{
  const { loading, error, data } = useQuery(GET_INVESTORS);
  const [companies, setCompanies ] = useState([])
  useEffect(() => {
    if (data) {
      setCompanies(data.comany)
    }
  },[data])


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (companies.length === 0) return <p>The database is empty!</p>
  console.log(data)

  return(
    <table >
      <tr>
        <th>Name</th>
        <th>Investors</th>
      </tr>
      {
      companies.map(({ id, name, photo_thumbnail }) => (

        <tr  key={id}>
        <td>{name}</td>
        <td><Investors id={ id }/></td>
      </tr>
      ))
      }
  
    </table>

  )
  
  
  
}

export default CompaniesList;