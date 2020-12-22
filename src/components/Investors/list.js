import React , { useEffect , useState}from 'react'
import { useQuery, gql } from '@apollo/client';
import Investments from './getInvestments'
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

// Example of a component that uses apollo-client to fetch data.

const GET_INVESTORS = gql`
  query GetInvestors($offset: Int!, $limit: Int!) {
      investor(limit: $limit, offset: $offset, order_by: {created_at: asc}) {
          id
          name
          photo_large
          photo_thumbnail
      }
  }
`;

const InvestorsList = (props) =>{
  const {offset, limit } = props
  const { loading, error, data } = useQuery(GET_INVESTORS,{variables: {offset: offset, limit: limit}});
  const [investors, setInvestors ] = useState([])
  useEffect(() => {
    if (data) {
      setInvestors(data.investor)
    }
  },[data])


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (investors.length === 0) return <p>The database is empty!</p>
  

  return(
    <table className='investor-table table' >
      <tr>
        <th>Name</th>
        <th>Investments</th>
      </tr>
      {
      investors.map(({ id, name, photo_thumbnail }) => (

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
InvestorsList.propTypes = {
  offset: PropTypes.number,
  limit: PropTypes.number,

};
export default withRouter(InvestorsList);