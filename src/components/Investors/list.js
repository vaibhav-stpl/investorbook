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
const GET_FILTERS = gql`
  query GetInvestors($search: String!) {
      investor(where: {name: {_eq: $search}}, order_by: {created_at: asc}) {
          id
          name
          photo_large
          photo_thumbnail
      }
  }
`;
const InvestorsList = (props) =>{
  const {offset, limit,searchFilter } = props
  const { loading, error, data } = useQuery(GET_INVESTORS,{ skip: searchFilter!=='' ,variables: {offset: offset, limit: limit}});
  const { loading: sloading, error: serror, data: sdata } = useQuery(GET_FILTERS,{skip: searchFilter==='',variables: {search: searchFilter}});

  const [investors, setInvestors ] = useState([])
  useEffect(() => {
    if (data || sdata) {
      setInvestors(data.investor || sdata.investor)
    }
  },[data, sdata])


  if (loading || sloading) return <p>Loading...</p>;
  if (error || serror) return <p>Error :(</p>;
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
  searchFilter: PropTypes.string

};
export default withRouter(InvestorsList);